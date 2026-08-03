interface Obstacle {
  x: number;
  kind: "box" | "goomba";
  passed: boolean;
}

const GRAV = 0.9;
const SPEED = 1.4;
const SCALE = 2;

const SPRITES = {
  mario: [
    "/portofolio/mario/mario_run_1.png",
    "/portofolio/mario/mario_run_2.png",
    "/portofolio/mario/mario_run_3.png",
  ],
  goomba: [
    "/portofolio/mario/goomba_1.png",
    "/portofolio/mario/goomba_2.png",
  ],
};

function load(urls: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        })
    )
  );
}

export async function initMarioGame(canvasId: string): Promise<void> {
  const canvas = document.getElementById(canvasId);
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = canvas.clientWidth || 280;
  canvas.height = 90;
  const W = canvas.width;
  const H = canvas.height;
  const groundY = H - 14;

  const mh = 15 * SCALE;
  const mw = 13 * SCALE;
  const gh = 17 * SCALE;
  const gw = 17 * SCALE;

  const [marioFrames, goombaFrames] = await Promise.all([
    load(SPRITES.mario),
    load(SPRITES.goomba),
  ]);

  let offset = 0;
  let nextSpawn = 220;
  let obstacles: Obstacle[] = [];
  let py = 0;
  let vy = 0;
  let grounded = true;
  let score = 0;
  let t = 0;

  const rect = (x: number, y: number, w: number, h: number, c: string): void => {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
  };

  const drawBox = (x: number, y: number): void => {
    const s = 2;
    rect(x, y, 14 * s, 14 * s, "#FFD800");
    rect(x + s, y + s, 12 * s, 12 * s, "#FFE94D");
    ctx.fillStyle = "#5A3A00";
    ctx.font = `bold ${10 * s}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("?", x + 14 * s / 2, y + 11 * s);
  };

  const frame = (): void => {
    t++;

    if (offset >= nextSpawn) {
      obstacles.push({
        x: offset + W + 40,
        kind: t % 3 === 0 ? "box" : "goomba",
        passed: false,
      });
      nextSpawn = offset + W + 40 + 150 + Math.random() * 120;
    }

    const next = obstacles.find((o) => o.x - offset - 60 > 0);
    if (next && next.x - offset - 60 < 46 && grounded) {
      vy = -8;
      grounded = false;
    }
    if (!grounded) {
      vy += GRAV;
      py += vy;
      if (py <= 0) {
        py = 0;
        vy = 0;
        grounded = true;
      }
    }

    offset += SPEED;

    for (const o of obstacles) {
      const sx = o.x - offset;
      if (!o.passed && sx < 50) {
        o.passed = true;
        score++;
      }
    }
    obstacles = obstacles.filter((o) => o.x - offset > -60);

    rect(0, 0, W, H, "#6EC1FF");
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < 3; i++) {
      const cx = ((i * 170 + W / 2 - (offset * 0.3) % (W + 100)) % (W + 100)) - 50;
      const cy = 14 + (i % 2) * 10;
      rect(cx, cy, 34, 8, "#FFFFFF");
      rect(cx + 6, cy - 5, 22, 6, "#FFFFFF");
    }
    rect(0, groundY, W, H - groundY, "#B5651D");
    rect(0, groundY, W, 3, "#3FA535");

    for (const o of obstacles) {
      const sx = o.x - offset;
      if (sx > W) continue;
      if (o.kind === "goomba") {
        ctx.drawImage(goombaFrames[Math.floor(t / 6) % 2], sx, groundY - gh, gw, gh);
      } else {
        drawBox(sx, groundY - 28);
      }
    }

    ctx.drawImage(marioFrames[Math.floor(t / 6) % 3], 60, groundY - mh - py, mw, mh);

    ctx.fillStyle = "#FFF";
    rect(5, 5, 42, 13, "#FFF");
    ctx.fillStyle = "#000";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "left";
    ctx.fillText("SCORE", 7, 12);
    ctx.fillText(String(score).padStart(3, "0"), 7, 21);
    ctx.textAlign = "right";
    ctx.fillStyle = "#FFF";
    ctx.fillText("1UP", W - 6, 12);
  };

  const loop = (): void => {
    frame();
    requestAnimationFrame(loop);
  };
  loop();
}
