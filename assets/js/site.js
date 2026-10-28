/* Excel Guarding Services — progressive enhancement only. Every page works without this file. */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Header: solid after the hero, hides on scroll down ---------- */
  const header = document.querySelector("[data-header]");
  if (header) {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-solid", y > 24);
      const menuOpen = document.body.classList.contains("menu-open");
      const hide = !menuOpen && y > 480 && y > lastY + 4 && !header.contains(document.activeElement);
      if (hide) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y < 480) header.classList.remove("is-hidden");
      lastY = y;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
    update();
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (toggle && menu) {
    const label = toggle.querySelector("[data-menu-label]");
    const focusables = () => [toggle, ...menu.querySelectorAll("a, button")];
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      if (label) label.textContent = open ? "Close" : "Menu";
      if (open) {
        header && header.classList.add("is-solid");
        menu.querySelector("a")?.focus();
      }
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (!menu.classList.contains("is-open")) return;
      if (e.key === "Escape") { setOpen(false); toggle.focus(); }
      if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Section reveals ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- People / Process / Oversight: active row drives the sticky image ---------- */
  const principles = document.querySelector("[data-principles]");
  if (principles) {
    const rows = [...principles.querySelectorAll("[data-principle]")];
    const images = [...principles.querySelectorAll(".principles__sticky img")];
    const activate = (i) => {
      rows.forEach((r, n) => r.classList.toggle("is-active", n === i));
      images.forEach((img, n) => img.classList.toggle("is-active", n === i));
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activate(rows.indexOf(entry.target));
        });
      }, { rootMargin: "-45% 0px -45% 0px" });
      rows.forEach((r) => io.observe(r));
    }
    rows.forEach((r, i) => r.addEventListener("pointerenter", () => activate(i)));
  }

  /* ---------- Service explorer: ARIA tabs with arrow-key support ---------- */
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
      tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion.matches ? "auto" : "smooth" });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab, false));
      tab.addEventListener("keydown", (e) => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (e.key in keys) { e.preventDefault(); select(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true); }
        if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
        if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
  });

  /* ---------- Training steps: rule draws in when each step is reached ---------- */
  const steps = document.querySelectorAll("[data-steps] .step");
  if (steps.length) {
    if ("IntersectionObserver" in window && !reduceMotion.matches) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
        });
      }, { rootMargin: "0px 0px -15% 0px", threshold: 0.4 });
      steps.forEach((s) => io.observe(s));
    } else {
      steps.forEach((s) => s.classList.add("is-in"));
    }
  }

  /* ---------- Workflow diagram ---------- */
  const flow = document.querySelector("[data-flow]");
  if (flow) {
    const stages = [
      ["Assess", "We walk your site with you to look at entrances, blind spots, peak times, existing systems and what has gone wrong before.", "A written summary of risks and recommended posts"],
      ["Plan", "We turn the assessment into posts, hours and instructions. You review the post instructions before any officer is deployed.", "Post instructions, staffing schedule and escalation list"],
      ["Deploy", "Officers are inducted on site and shadow before working alone. The first shifts are handed over in person.", "Named officers and a start-date handover"],
      ["Supervise", "Supervisors visit, including unannounced. They check logs, patrol records and officer conduct against the post instructions.", "Supervisor visit records"],
      ["Report", "Incidents are written up in the shift they happen and escalated to your named contacts. Routine activity goes into regular reports.", "Incident reports and periodic activity reports"],
      ["Review", "We meet with you to go through incidents, findings and changes on your site, and adjust posts and instructions to match.", "Agreed changes, fed into the next plan"],
    ];
    const nodes = [...flow.querySelectorAll("[data-stage]")];
    const idx = flow.querySelector("[data-flow-index]");
    const title = flow.querySelector("[data-flow-title]");
    const text = flow.querySelector("[data-flow-text]");
    const out = flow.querySelector("[data-flow-out]");
    nodes.forEach((node) => {
      node.addEventListener("click", () => {
        const i = Number(node.dataset.stage);
        nodes.forEach((n) => n.setAttribute("aria-pressed", String(n === node)));
        idx.textContent = `Stage ${String(i + 1).padStart(2, "0")} of 06`;
        title.textContent = stages[i][0];
        text.textContent = stages[i][1];
        out.textContent = stages[i][2];
      });
    });
  }

  /* ---------- Contact form validation ---------- */
  const form = document.querySelector("[data-form]");
  if (form) {
    const status = form.querySelector("[data-form-status]");
    const messages = {
      valueMissing: "This field is required.",
      typeMismatch: "Enter a valid email address.",
      patternMismatch: "Enter a valid phone number.",
      tooShort: "Please add a little more detail.",
    };
    const errorFor = (field) => {
      for (const key of Object.keys(messages)) if (field.validity[key]) return field.dataset[key] || messages[key];
      // Browsers only flag minlength after user edits, so check it directly (covers autofill and paste).
      if (field.minLength > 0 && field.value && field.value.trim().length < field.minLength) return field.dataset.tooShort || messages.tooShort;
      return "";
    };
    const showError = (field) => {
      const err = document.getElementById(field.getAttribute("aria-describedby")?.split(" ").find((id) => id.endsWith("-error")));
      const msg = errorFor(field);
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg;
      return !msg;
    };
    const fields = [...form.querySelectorAll("input:not([type=radio]):not([type=checkbox]), select, textarea")];
    fields.forEach((f) => {
      f.addEventListener("blur", () => { if (f.value || f.getAttribute("aria-invalid") === "true") showError(f); });
      f.addEventListener("input", () => { if (f.getAttribute("aria-invalid") === "true") showError(f); });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const invalid = fields.filter((f) => !showError(f));
      if (invalid.length) {
        invalid[0].focus();
        status.hidden = false;
        status.classList.add("form__status--error");
        status.textContent = `Please check ${invalid.length === 1 ? "1 field" : invalid.length + " fields"} before sending.`;
        return;
      }
      status.classList.remove("form__status--error");
      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        status.hidden = false;
        status.textContent = "This form isn't connected to an inbox yet, so nothing was sent. It will be connected before launch.";
        return;
      }
      const button = form.querySelector("[type=submit]");
      button.disabled = true;
      try {
        const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        status.hidden = false;
        status.textContent = "Thank you. Your request has been sent and we'll be in touch to arrange the next step.";
      } catch {
        status.hidden = false;
        status.classList.add("form__status--error");
        status.textContent = "Something went wrong and your request wasn't sent. Please try again, or contact us directly.";
      } finally {
        button.disabled = false;
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
