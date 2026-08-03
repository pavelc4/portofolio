interface BabelPhrase {
  label: string;
  text: string;
}

const phrases: BabelPhrase[] = [
  { label: "RUS", text: "Привет, мир!" },
  { label: "JPN", text: "こんにちは、世界！" },
  { label: "KOR", text: "안녕하세요, 세계!" },
  { label: "IDN", text: "Halo dunia! 🚀" },
  { label: "JPN", text: "学生です • バンドン" },
  { label: "C", text: 'printf("Hello, World!");' },
  { label: "CPP", text: 'std::cout << "pavelc4";' },
  { label: "RS", text: 'println!("Hello Rust!");' },
  { label: "GO", text: 'fmt.Println("Go 1.24")' },
  { label: "PY", text: 'print(f"eval({code})")' },
  { label: "TS", text: 'const dev: Dev = "pavel";' },
  { label: "ZIG", text: 'std.debug.print("Zig",.{})' },
  { label: "ASM", text: "MOV EAX, 0x41414141" },
  { label: "SH", text: "$ chmod +x ./hack.sh" },
  { label: "GIT", text: '$ git commit -m "ship it"' },
  { label: "NPM", text: "$ bun run dev --turbo" },
  { label: "SQL", text: "SELECT * FROM magic;" },
  { label: "PHP", text: '<?php echo "still alive";' },
  { label: "CSS", text: "box-shadow: 4px 4px 0;" },
  { label: "SYS", text: "exit code 0 (success)" },
  { label: "INF", text: "while(alive) { code(); }" },
  { label: "MEM", text: "malloc(sizeof(brain));" },
  { label: "PING", text: "404: sleep not found" },
  { label: "KAOM", text: "(づ｡◕‿‿◕｡)づ" },
  { label: "HOT", text: "> coffee // hot reload" },
  { label: "BUG", text: "// works on my machine" },
  { label: "NEO", text: "Follow the white rabbit..." },
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
