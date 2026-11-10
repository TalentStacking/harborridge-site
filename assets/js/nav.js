// Mobile menu: adds a ☰ button to the site nav. Below 900px the nav links are hidden
// (see styles.css); the button opens them as a drop-down panel under the nav bar.
(function () {
  var nav = document.querySelector(".nav");
  var links = nav && nav.querySelector(".nav-links");
  if (!nav || !links || nav.querySelector(".nav-toggle")) return;

  if (!links.id) links.id = "site-nav-links";
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "nav-toggle";
  btn.setAttribute("aria-label", "Open menu");
  btn.setAttribute("aria-controls", links.id);
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = '<span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span>';
  nav.appendChild(btn);

  function setOpen(open) {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  btn.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
  links.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  document.addEventListener("click", function (e) { if (!nav.contains(e.target)) setOpen(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 900) setOpen(false); });
})();
