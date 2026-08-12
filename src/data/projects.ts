export interface ProjectItem {
  id: string;
  name: string;
  phonetic: string;
  slug: string;
  badge: string;
  repoOwner: string;
  repoName: string;
  fallbackStars: number;
  stars?: number;
  swatches: string[];
  description: string;
  tags: string[];
  github: string;
  bgAccent: string;
  borderTop: string;
  span: string;
  tilt: string;
}

export const rawProjects: ProjectItem[] = [
  {
    id: "01",
    name: "Auriya",
    phonetic: "(au-ri-ya)",
    slug: "auriya",
    badge: "Magisk / KernelSU",
    repoOwner: "pavelc4",
    repoName: "auriya",
    fallbackStars: 23,
    swatches: ["rust", "kernel", "perf", "core"],
    description:
      "An open-source Android performance optimization module built in Rust, designed for Magisk and KernelSU. Provides adaptive frame-aware scheduling, per-app refresh rate control, and system-level CPU and memory tuning to improve gaming and overall performance.",
    tags: ["RUST", "ANDROID OS", "PERFORMANCE"],
    github: "https://github.com/pavelc4/auriya",
    bgAccent: "bg-[#FF4D8D]",
    borderTop: "border-t-4 border-t-[#FF4D8D]",
    span: "lg:col-span-8",
    tilt: "-rotate-1",
  },
  {
    id: "02",
    name: "Rin",
    phonetic: "(rin-term-dev)",
    slug: "Rin",
    badge: "Apps / Terminal",
    repoOwner: "pavelc4",
    repoName: "Rin",
    fallbackStars: 20,
    swatches: ["kotlin", "pacman", "terminal"],
    description:
      "A modern Android terminal emulator built with Kotlin and Jetpack Compose, featuring a native pacman-style package manager written in Rust. Enables seamless terminal access and package management on Android 10+.",
    tags: ["KOTLIN", "ANDROID", "RUST"],
    github: "https://github.com/pavelc4/Rin",
    bgAccent: "bg-[#0038FF]",
    borderTop: "border-t-4 border-t-[#0038FF]",
    span: "lg:col-span-4",
    tilt: "rotate-1",
  },
  {
    id: "03",
    name: "Oxide",
    phonetic: "(ox-ide-adb)",
    slug: "oxide",
    badge: "Tauri / Desktop App",
    repoOwner: "pavelc4",
    repoName: "Oxide",
    fallbackStars: 0,
    swatches: ["rust", "tauri", "svelte", "adb"],
    description:
      "A reliable cross-platform desktop ADB client app built with Rust, Tauri, and Svelte. Provides Android device management, package manager, file explorer, fastboot flashing, and real-time performance monitoring.",
    tags: ["RUST", "TAURI", "SVELTE", "LINUX", "MACOS", "WINDOWS"],
    github: "https://github.com/pavelc4/Oxide",
    bgAccent: "bg-[#22C55E]",
    borderTop: "border-t-4 border-t-[#22C55E]",
    span: "lg:col-span-5",
    tilt: "rotate-1",
  },
  {
    id: "04",
    name: "Xtra Kernel Manager",
    phonetic: "(xtra-ker-nel)",
    slug: "xtra-kernel-manager",
    badge: "Android App",
    repoOwner: "Gustyx-Power",
    repoName: "Xtra-Kernel-Manager",
    fallbackStars: 57,
    swatches: ["kotlin", "governor", "tune"],
    description:
      "A modern Android app for monitoring and tuning kernel performance on rooted devices. Built with Kotlin and Jetpack Compose, it provides real-time CPU metrics, thermal insights, and dynamic governor control.",
    tags: ["KOTLIN", "ANDROID", "PERFORMANCE"],
    github: "https://github.com/Gustyx-Power/Xtra-Kernel-Manager.git",
    bgAccent: "bg-[#FF5500]",
    borderTop: "border-t-4 border-t-[#FF5500]",
    span: "lg:col-span-7",
    tilt: "-rotate-1",
  },
  {
    id: "05",
    name: "RvSystem Monitor",
    phonetic: "(rv-sys-tem)",
    slug: "rv-system-monitor",
    badge: "Android App",
    repoOwner: "Rve27",
    repoName: "RvSystem-Monitor",
    fallbackStars: 131,
    swatches: ["kotlin", "rust", "compose", "monitor"],
    description:
      "A modern Android system monitoring app built with Jetpack Compose and Rust. Provides real-time device metrics, Material 3 expressive UI, and low-level performance data collection. Open source — built collaboratively.",
    tags: ["KOTLIN", "RUST", "JETPACK COMPOSE", "ANDROID"],
    github: "https://github.com/Rve27/RvSystem-Monitor",
    bgAccent: "bg-[#7C3AED]",
    borderTop: "border-t-4 border-t-[#7C3AED]",
    span: "lg:col-span-12",
    tilt: "rotate-1",
  },
];
