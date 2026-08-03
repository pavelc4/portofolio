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
