interface BabelPhrase {
  label: string;
  text: string;
}

const phrases: BabelPhrase[] = [
  { label: "RUS", text: "Привет, мир!" },
  { label: "JPN", text: "こんにちは、世界！" },
  { label: "KOR", text: "안녕하세요, 세계!" },
  { label: "RUS", text: "я просто учусь" },
  { label: "JPN", text: "学生です • バンドン" },
  { label: "KOR", text: "저는 학생입니다" },
  { label: "GO", text: "> go build ./..." },
  { label: "RS", text: "> cargo run --release" },
  { label: "SYS", text: "(づ｡◕‿‿◕｡)づ" },
  { label: "INF", text: "while(alive) { code(); }" },
  { label: "PING", text: "404: sleep not found" },
  { label: "♨", text: "> coffee // hot reload" },
];

export function initHeroRotator(): void {
  const el = document.getElementById("babel-phrase");
  const tag = document.getElementById("babel-tag");
  if (!el || !tag) return;

  let i = 0;
  const show = (n: number): void => {
    const p = phrases[n % phrases.length];
    el.textContent = p.text;
    tag.textContent = p.label;
  };

  show(0);
  setInterval(() => {
    el.classList.add("opacity-0");
    setTimeout(() => {
      show((i = (i + 1) % phrases.length));
      el.classList.remove("opacity-0");
    }, 250);
  }, 2000);
}
