// Comparables Weekly sign-up: posts any form[data-subscribe] to /api/subscribe (Netlify function).
(function () {
  var OK = "You're in. First email arrives next Tuesday.";
  var ERR = "Something didn't work. Try again or email research@harborridgecap.com directly.";

  document.querySelectorAll("form[data-subscribe]").forEach(function (form) {
    var input = form.querySelector('input[name="email"]');
    var trap = form.querySelector('input[name="website"]');
    var btn = form.querySelector('button[type="submit"]');
    var msg = form.querySelector("[data-subscribe-msg]");

    function show(text, ok) {
      msg.textContent = text;
      msg.classList.remove("is-ok", "is-err");
      msg.classList.add(ok ? "is-ok" : "is-err");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!email || !input.checkValidity()) {
        show("Please enter a valid email address.", false);
        input.focus();
        return;
      }
      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Subscribing…";
      fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, website: trap ? trap.value : "" })
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (d) {
            if (!r.ok || !d.ok) throw new Error("subscribe failed");
          });
        })
        .then(function () {
          show(OK, true);
          form.reset();
          if (typeof window.gtag === "function") window.gtag("event", "sign_up", { method: "comparables_weekly" });
        })
        .catch(function () { show(ERR, false); })
        .then(function () { btn.disabled = false; btn.textContent = label; });
    });
  });
})();
