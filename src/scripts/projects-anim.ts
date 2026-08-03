import { animate, inView } from "motion";

export function initProjectsAnimation(): void {
  inView("#projects", () => {
    const cards = document.querySelectorAll<HTMLElement>("#projects .rigid-reveal");
    cards.forEach((card, index) => {
      animate(
        card,
        { opacity: 1, y: [30, 0], scale: [0.96, 1] },
        { delay: index * 0.12, duration: 0.4, ease: "easeOut" },
      );
    });
  });
}
