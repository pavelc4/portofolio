import dinoRunSrc from "../assets/dino/dino-run.png";
import birdImgSrc from "../assets/dino/enemy-bird.png";
import groundImgSrc from "../assets/dino/ground.png";
import cloudImgSrc from "../assets/dino/cloud.png";
import moonImgSrc from "../assets/dino/moon.png";
import starsImgSrc from "../assets/dino/stars.png";
import cSmall1 from "../assets/dino/cactuses_small_1.png";
import cSmall2 from "../assets/dino/cactuses_small_2.png";
import cSmall3 from "../assets/dino/cactuses_small_3.png";
import cBig1 from "../assets/dino/cactuses_big_1.png";
import cBig2 from "../assets/dino/cactuses_big_2.png";
import cBig3 from "../assets/dino/cactuses_big_3.png";

interface Obstacle {
  x: number;
  w: number;
  h: number;
  type: "cactus" | "bird";
  y: number;
  sprite: number;
  frame: number;
}

export function initDinoRunner(): void {
  const canvasEl = document.getElementById("dinoCanvas") as HTMLCanvasElement | null;
  const wrapperEl = document.getElementById("dino-canvas-wrapper") as HTMLElement | null;
  const themeBadge = document.getElementById("dino-theme-badge") as HTMLElement | null;

  if (!canvasEl || !wrapperEl) return;
  const canvas: HTMLCanvasElement = canvasEl;
  const wrapper: HTMLElement = wrapperEl;
  const ctxEl = canvas.getContext("2d");
  if (!ctxEl) return;
  const ctx: CanvasRenderingContext2D = ctxEl;

  const S = 0.5;
  const GH = 26 * S;
  const DW = 88 * S;
  const DH = 94 * S;

  const img = (src: string): HTMLImageElement => {
    const i = new Image();
    i.src = src;
    return i;
  };
  const dinoRun = img(dinoRunSrc.src);
  const birdImg = img(birdImgSrc.src);
  const groundImg = img(groundImgSrc.src);
  const cloudImg = img(cloudImgSrc.src);
  const moonImg = img(moonImgSrc.src);
  const starsImg = img(starsImgSrc.src);
  const cacti = [
    img(cSmall1.src),
    img(cSmall2.src),
    img(cSmall3.src),
    img(cBig1.src),
    img(cBig2.src),
    img(cBig3.src),
  ];
  const CACTUS_W = [34, 68, 102, 50, 100, 150];
  const CACTUS_H = [70, 70, 70, 96, 96, 98];

  const all = [dinoRun, birdImg, groundImg, cloudImg, moonImg, starsImg, ...cacti];
  let loaded = 0;
  for (const i of all) i.onload = () => { if (++loaded === all.length) draw(); };

  let width = (canvas.width = wrapper.clientWidth);
  let height = (canvas.height = wrapper.clientHeight);

  let isDark = false;
  let score = 0;
  let highScore = 420;
  let gameSpeed = 4.5;
  let scroll = 0;
  let groundY = height - GH;
  const gravity = 0.65;

  const dino = {
    x: 35,
    y: groundY - DH,
    dy: 0,
    jumpForce: -10.5,
    isGrounded: true,
    legState: 0,
    timer: 0,
  };

  let obstacles: Obstacle[] = [];
  let spawnTimer = 0;
  let cloudX = [width * 0.2, width * 0.55, width * 0.85];

  window.addEventListener("resize", () => {
    width = canvas.width = wrapper.clientWidth;
    height = canvas.height = wrapper.clientHeight;
    groundY = height - GH;
  });

  function jump(): void {
    if (dino.isGrounded) {
      dino.dy = dino.jumpForce;
      dino.isGrounded = false;
    }
  }

  canvas.addEventListener("click", jump);
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") jump();
  });

  function update(): void {
    score++;
    if (score > highScore) highScore = score;

    const cycle = Math.floor(score / 350) % 2;
    if (cycle === 1 && !isDark) {
      isDark = true;
      wrapper.classList.remove("bg-white");
      wrapper.classList.add("bg-[#111111]");
      if (themeBadge) {
        themeBadge.textContent = "NIGHT_MODE";
        themeBadge.className = "bg-emerald-500 text-black px-2 py-0.5 text-[8.5px] font-bold tracking-wider";
      }
      if (statusText)
        statusText.className = "absolute bottom-2 left-2 text-gray-300 font-mono text-[8px] font-bold uppercase tracking-widest pointer-events-none";
    } else if (cycle === 0 && isDark) {
      isDark = false;
      wrapper.classList.remove("bg-[#111111]");
      wrapper.classList.add("bg-white");
      if (themeBadge) {
        themeBadge.textContent = "DAY_MODE";
        themeBadge.className = "bg-gray-950 text-white px-2 py-0.5 text-[8.5px] tracking-wider";
      }
      if (statusText)
        statusText.className = "absolute bottom-2 left-2 text-gray-700 font-mono text-[8px] font-bold uppercase tracking-widest pointer-events-none";
    }

    dino.y += dino.dy;
    dino.dy += gravity;

    if (dino.y >= groundY - DH) {
      dino.y = groundY - DH;
      dino.dy = 0;
      dino.isGrounded = true;
    }

    dino.timer++;
    if (dino.timer % 6 === 0) dino.legState = dino.legState === 0 ? 1 : 0;

    spawnTimer++;
    if (spawnTimer > Math.max(50, 110 - gameSpeed * 5)) {
      if (Math.random() > 0.75) {
        const bw = 92 * S;
        const bh = 77 * S;
        const bottom = groundY - (6 + Math.random() * 8);
        obstacles.push({ x: width + 20, w: bw, h: bh, y: bottom - bh, type: "bird", sprite: 0, frame: 0 });
      } else {
        const ci = Math.floor(Math.random() * cacti.length);
        const w = CACTUS_W[ci] * S;
        const h = CACTUS_H[ci] * S;
        obstacles.push({ x: width + 20, w, h, y: groundY - h, type: "cactus", sprite: ci, frame: 0 });
      }
      spawnTimer = 0;
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.x -= gameSpeed;

      const distance = obs.x - dino.x;
      if (distance > 0 && distance < 75 && dino.isGrounded) jump();

      if (obs.x + obs.w < 0) obstacles.splice(i, 1);
    }

    gameSpeed = 4.5 + Math.min(score / 500, 3);
    scroll += gameSpeed;
    for (let i = 0; i < cloudX.length; i++) {
      cloudX[i] -= 0.3;
      if (cloudX[i] < -50) cloudX[i] = width + 50;
    }
  }

  function draw(): void {
    ctx.clearRect(0, 0, width, height);

    if (isDark) {
      ctx.drawImage(moonImg, 0, 0, 20, 40, width - 92, 14, 20 * S, 40 * S);
      const spots: Array<[number, number, number]> = [
        [0.12, 0.18, 0],
        [0.3, 0.1, 1],
        [0.55, 0.22, 2],
        [0.78, 0.12, 0],
        [0.88, 0.3, 1],
      ];
      for (const [fx, fy, f] of spots) {
        ctx.drawImage(starsImg, f * 9, 0, 9, 9, width * fx, height * fy, 9 * S, 9 * S);
      }
    }

    for (let i = 0; i < cloudX.length; i++) {
      ctx.drawImage(cloudImg, cloudX[i], 14 + i * 16, 92 * S, 27 * S);
    }

    const srcX = (scroll * 2) % 88;
    for (let x = -44; x < width; x += 44) {
      ctx.drawImage(groundImg, srcX, 0, 88, 26, x, groundY, 44, GH);
    }

    const dframe = dino.isGrounded ? (dino.legState === 0 ? 2 : 3) : 0;
    ctx.drawImage(dinoRun, dframe * 88, 0, 88, 94, dino.x, dino.y, DW, DH);

    for (const obs of obstacles) {
      if (obs.type === "cactus") {
        ctx.drawImage(cacti[obs.sprite], obs.x, obs.y, obs.w, obs.h);
      } else {
        ctx.drawImage(birdImg, obs.frame * 92, 0, 92, 77, obs.x, obs.y, obs.w, obs.h);
        obs.frame = obs.frame === 0 ? 1 : 0;
      }
    }

    ctx.font = 'bold 13px "Space Mono", monospace';
    ctx.fillStyle = isDark ? "#FFFFFF" : "#111111";
    ctx.textAlign = "right";
    ctx.fillText(`HI ${String(highScore).padStart(5, "0")}  ${String(score).padStart(5, "0")}`, width - 16, 22);

    update();
    requestAnimationFrame(draw);
  }
}
