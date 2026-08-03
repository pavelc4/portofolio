const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initScrollReveal(): void {
  if (prefersReduced) return;

  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!els.length) return;

  const reveal = (): void => {
    const vh = window.innerHeight - 32;
    els.forEach((el) => {
      if (!el.classList.contains("is-revealed") && el.getBoundingClientRect().top < vh) {
        el.classList.add("is-revealed");
      }
    });
  };

  reveal();
  addEventListener("scroll", reveal, { passive: true });
  addEventListener("resize", reveal);
}

export function initNeoBrutalistInteractions(): void {
  const cards = document.querySelectorAll<HTMLElement>(".neo-parallax-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const shadowX = Math.round(12 + x * 10);
      const shadowY = Math.round(12 + y * 10);
      card.style.boxShadow = `${shadowX}px ${shadowY}px 0px 0px rgba(0,0,0,0.95)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "12px 12px 0px 0px rgba(0,0,0,0.95)";
    });
  });
}

export function initDynamicScrollbar(): void {
  const sectionColors: Record<string, string> = {
    hero: "#FACC15",     // Yellow
    about: "#FF4D8D",    // Hot Pink
    projects: "#0038FF", // Electric Blue
    skills: "#22C55E",   // Emerald Green
    lifelogs: "#FF5500", // Electric Orange
    footer: "#FF5500"    // Electric Orange
  };

  const sections = Object.keys(sectionColors)
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const color = sectionColors[entry.target.id];
          if (color) {
            document.documentElement.style.setProperty("--scrollbar-thumb-color", color);
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((sec) => observer.observe(sec));
}
