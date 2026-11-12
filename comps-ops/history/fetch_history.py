"""Pull quarterly EV / LTM EBITDA inputs for public comps from SEC XBRL + Yahoo prices.
Runs in GitHub Actions (open network). Writes comps-ops/history/raw.json."""
import json, time, urllib.request, datetime as dt, sys

UA = {"User-Agent": "Harbor Ridge Capital research cyrus@hrc.partners"}
TICKERS = ["ULS","LDOS","CACI","PSN","SAIC","KTOS","ACN","CTSH","G","EPAM","GLOB","GDYN"]
QENDS = ["2024-12-31","2025-03-31","2025-06-30","2025-09-30","2025-12-31","2026-03-31","2026-06-30","2026-09-30"]

def get(url, tries=3):
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
                return json.loads(r.read())
        except Exception as e:
            err = e; time.sleep(2 + i * 3)
    raise err

D = lambda s: dt.date.fromisoformat(s)

def facts_for(gaap, names):
    out = []
    for n in names:
        f = gaap.get(n)
        if not f: continue
        for unit, arr in f["units"].items():
            for x in arr:
                if x.get("form") not in ("10-Q","10-K","10-Q/A","10-K/A","20-F","6-K","40-F"): continue
                out.append({"c": n, "start": x.get("start"), "end": x["end"], "val": x["val"], "filed": x.get("filed",""), "unit": unit})
        if out: return out
    return out

def dedupe(fs):
    best = {}
    for x in fs:
        k = (x["start"], x["end"])
        if k not in best or x["filed"] > best[k]["filed"]: best[k] = x
    return list(best.values())

def days(x): return (D(x["end"]) - D(x["start"])).days

def ltm(fs, end):
    """LTM flow value for the period ending `end` (fiscal period end date)."""
    fs = dedupe([x for x in fs if x["start"]])
    E = D(end)
    # direct annual
    for x in fs:
        if D(x["end"]) == E and 350 <= days(x) <= 380: return x["val"], "FY"
    # YTD at E
    ytd = [x for x in fs if D(x["end"]) == E and 80 <= days(x) <= 290]
    if not ytd: return None, "no ytd"
    y = max(ytd, key=days)  # longest = YTD from fiscal year start
    S = D(y["start"])
    fy_prev = [x for x in fs if abs((D(x["end"]) - (S - dt.timedelta(days=1))).days) <= 4 and 350 <= days(x) <= 380]
    ytd_prev = [x for x in fs if abs((D(x["end"]) - (E - dt.timedelta(days=364))).days) <= 8 and abs(days(x) - days(y)) <= 8]
    if not fy_prev or not ytd_prev: return None, "no prior"
    fp = max(fy_prev, key=lambda x: x["filed"]); yp = max(ytd_prev, key=lambda x: x["filed"])
    return y["val"] + fp["val"] - yp["val"], "ytd+fy-ytd"

def instant(fs, end):
    E = D(end)
    c = [x for x in fs if not x["start"] and D(x["end"]) == E]
    return max(c, key=lambda x: x["filed"])["val"] if c else None

def fiscal_end_for(fs_ref, qend):
    """Latest reported period end on or before calendar quarter end, within 100 days."""
    Q = D(qend)
    ends = sorted({D(x["end"]) for x in fs_ref if D(x["end"]) <= Q and (Q - D(x["end"])).days <= 100})
    return ends[-1].isoformat() if ends else None

def shares_q(fs, end):
    E = D(end)
    c = [x for x in dedupe([y for y in fs if y["start"]]) if D(x["end"]) == E and 80 <= days(x) <= 100]
    return max(c, key=lambda x: x["filed"])["val"] if c else None

def price_on(tk, qend):
    Q = D(qend); p1 = int(dt.datetime(Q.year, Q.month, Q.day).timestamp()) - 10*86400; p2 = p1 + 12*86400
    sym = {"G": "G"}.get(tk, tk)
    j = get(f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}?period1={p1}&period2={p2}&interval=1d")
    r = j["chart"]["result"][0]; ts = r["timestamp"]; cl = r["indicators"]["quote"][0]["close"]
    best = None
    for t, c in zip(ts, cl):
        d = dt.datetime.utcfromtimestamp(t).date()
        if d <= Q and c is not None: best = (d.isoformat(), c)
    return best

def main():
    cik = {v["ticker"]: str(v["cik_str"]).zfill(10) for v in get("https://www.sec.gov/files/company_tickers.json").values()}
    out = {"generated": dt.datetime.utcnow().isoformat() + "Z", "companies": {}}
    for tk in TICKERS:
        rec = {"cik": cik.get(tk), "quarters": {}, "log": []}
        out["companies"][tk] = rec
        try:
            gaap = get(f"https://data.sec.gov/api/xbrl/companyfacts/CIK{cik[tk]}.json")["facts"].get("us-gaap", {})
            time.sleep(0.3)
        except Exception as e:
            rec["log"].append(f"facts error {e}"); continue
        op = facts_for(gaap, ["OperatingIncomeLoss"])
        da = facts_for(gaap, ["DepreciationDepletionAndAmortization","DepreciationAmortizationAndAccretionNet","DepreciationAndAmortization","DepreciationAmortizationAndOther","CostOfGoodsAndServicesSoldDepreciationAndAmortization"])
        rev = facts_for(gaap, ["Revenues","RevenueFromContractWithCustomerExcludingAssessedTax","RevenueFromContractWithCustomerIncludingAssessedTax","SalesRevenueNet"])
        ltd = facts_for(gaap, ["LongTermDebt","LongTermDebtAndCapitalLeaseObligations"])
        ltdn = facts_for(gaap, ["LongTermDebtNoncurrent","LongTermDebtAndCapitalLeaseObligationsNoncurrent"])
        ltdc = facts_for(gaap, ["LongTermDebtCurrent","LongTermDebtAndCapitalLeaseObligationsCurrent","DebtCurrent"])
        stb = facts_for(gaap, ["ShortTermBorrowings","CommercialPaper"])
        cash = facts_for(gaap, ["CashAndCashEquivalentsAtCarryingValue","CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents"])
        sti = facts_for(gaap, ["ShortTermInvestments","MarketableSecuritiesCurrent","AvailableForSaleSecuritiesDebtSecuritiesCurrent"])
        sh = facts_for(gaap, ["WeightedAverageNumberOfDilutedSharesOutstanding","WeightedAverageNumberOfSharesOutstandingBasic"])
        rec["concepts"] = {k: (v[0]["c"] if v else None) for k, v in dict(op=op, da=da, rev=rev, ltd=ltd, ltdn=ltdn, ltdc=ltdc, stb=stb, cash=cash, sti=sti, sh=sh).items()}
        for q in QENDS:
            fe = fiscal_end_for(op, q)
            row = {"fiscal_end": fe}
            if fe:
                o, om = ltm(op, fe); a, am = ltm(da, fe); r, rm = ltm(rev, fe)
                debt = instant(ltd, fe)
                if debt is None:
                    debt = (instant(ltdn, fe) or 0) + (instant(ltdc, fe) or 0)
                debt += instant(stb, fe) or 0
                c = (instant(cash, fe) or 0) + (instant(sti, fe) or 0)
                row.update(op_ltm=o, op_m=om, da_ltm=a, da_m=am, rev_ltm=r, debt=debt, cash=c, shares=shares_q(sh, fe))
            try:
                row["price"] = price_on(tk, q)
            except Exception as e:
                row["price"] = None; rec["log"].append(f"price {q}: {e}")
            rec["quarters"][q] = row
            time.sleep(0.2)
    json.dump(out, open("comps-ops/history/raw.json", "w"), indent=1)
    print("done")

main()
