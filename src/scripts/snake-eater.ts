const ROWS = 7;
const GAP = 2;
const COLORS = [
  "#D1D5DB", // 0 eaten / empty tile
  "#86EFAC", // 1
  "#4ADE80", // 2
  "#22C55E", // 3
  "#15803D", // 4
  "#FF4D8D", // 5 pink streak
];
const HEAD = "#FACC15";
const BODY = "#15803D";
const DIRS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

type Pt = { x: number; y: number };

export function initGitHubSnakeEater(): void {
  const gridEl = document.getElementById("github-matrix-grid") as HTMLElement | null;
  const wrapperEl = document.getElementById("matrix-wrapper") as HTMLElement | null;
  const counterEl = document.getElementById("eaten-counter") as HTMLElement | null;
  if (!gridEl || !wrapperEl || !counterEl) return;
  const grid: HTMLElement = gridEl;
  const wrapper: HTMLElement = wrapperEl;
  const eatenCounter: HTMLElement = counterEl;

  let cols = 0;
  let tile = 0;
  let cells: HTMLDivElement[] = [];
  let base: string[] = [];
  let snake: Pt[] = [];
  let prev: number[] = [];
  let eaten = 0;
  let iv: ReturnType<typeof setInterval> | undefined;

  const at = (x: number, y: number): number => y * cols + x;

  // Tile size dihitung dari lebar container supaya grid selalu pas (resize-friendly)
  function layout(): void {
    const avail = wrapper.clientWidth - 24 * 2;
    cols = Math.max(14, Math.floor(avail / 15));
    tile = Math.floor((avail - (cols - 1) * GAP) / cols);
    grid.style.gridTemplateColumns = `repeat(${cols}, ${tile}px)`;
    grid.style.gap = `${GAP}px`;
  }

  function randLevel(): number {
    const r = Math.random();
    if (r > 0.92) return 5;
    if (r > 0.78) return 4;
    if (r > 0.55) return 3;
    if (r > 0.25) return 2;
    return 1;
  }

  function populate(): void {
    grid.innerHTML = "";
    cells = [];
    base = [];
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < cols; x++) {
        const d = document.createElement("div");
        d.className = "matrix-tile";
        d.style.width = `${tile}px`;
        d.style.height = `${tile}px`;
        const color = COLORS[randLevel()];
        base.push(color);
        d.style.background = color;
        grid.appendChild(d);
        cells.push(d);
      }
    }
    snake = Array.from({ length: 6 }, (_, i) => ({ x: Math.floor(cols / 4) - i, y: Math.floor(ROWS / 2) }));
    prev = [];
    eaten = 0;
    eatenCounter.textContent = "000 DOTS";
  }

  function paint(): void {
    prev.forEach((i) => {
      const c = cells[i];
      c.style.background = c.dataset.eaten === "1" ? COLORS[0] : base[i];
      c.style.opacity = c.dataset.eaten === "1" ? "0.45" : "1";
      c.style.transform = "";
    });
    prev = [];
    snake.forEach((p, i) => {
      const c = cells[at(p.x, p.y)];
      c.style.background = i === 0 ? HEAD : BODY;
      c.style.opacity = "1";
      c.style.transform = i === 0 ? "scale(1.15)" : "";
      prev.push(at(p.x, p.y));
    });
  }

  // Arah acak tiap langkah: hindari dinding, body, dan berbalik arah (no U-turn).
  function step(): void {
    const head = snake[0];
    const neck = snake[1];
    const tail = snake[snake.length - 1];
    const tailIdx = at(tail.x, tail.y);

    const options = DIRS.filter(([dx, dy]) => {
      const nx = head.x + dx;
      const ny = head.y + dy;
      if (neck && nx === neck.x && ny === neck.y) return false;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= ROWS) return false;
      const i = at(nx, ny);
      return snake.every((p) => at(p.x, p.y) !== i) || i === tailIdx;
    });

    if (!options.length) {
      populate();
      paint();
      return;
    }

    const [dx, dy] = options[(Math.random() * options.length) | 0];
    const nx = head.x + dx;
    const ny = head.y + dy;
    const headIdx = at(nx, ny);
    if (cells[headIdx].dataset.eaten !== "1") {
      cells[headIdx].dataset.eaten = "1";
      eaten++;
      eatenCounter.textContent = `${String(eaten).padStart(3, "0")} DOTS`;
    }
    snake.unshift({ x: nx, y: ny });
    snake.pop();
    paint();
  }

  function start(): void {
    clearInterval(iv);
    layout();
    populate();
    paint();
    iv = setInterval(step, 110);
  }

  start();
  window.addEventListener("resize", start);
  document.addEventListener("astro:unmount", () => clearInterval(iv), { once: true });
}
