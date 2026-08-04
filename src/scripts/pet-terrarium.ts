interface PetState {
  el: HTMLElement;
  img: HTMLImageElement;
  x: number;
  speed: number;
  dir: number;
  isDragging: boolean;
  isYapping: boolean;
}

class PetTerrariumComponent extends HTMLElement {
  private state: Array<PetState | undefined> = [];
  private rafId: number | null = null;
  private terrariumElement: HTMLElement | null = null;
  private lastTime = 0;

  private containerWidth = 0;

  connectedCallback(): void {
    this.terrariumElement = this.querySelector<HTMLElement>("#pet-terrarium-container");
    if (!this.terrariumElement) return;

    this.containerWidth = this.terrariumElement.clientWidth || window.innerWidth;
    const updateWidth = (): void => {
      if (this.terrariumElement) {
        this.containerWidth = this.terrariumElement.clientWidth || window.innerWidth;
      }
    };
    window.addEventListener("resize", updateWidth, { passive: true });

    const pets = this.querySelectorAll<HTMLElement>(".pet-container");

    pets.forEach((pet, index) => {
      const speed = parseFloat(pet.getAttribute("data-speed") || "25");
      let dir = parseInt(pet.getAttribute("data-direction") || "1");

      let x = Math.random() * (this.containerWidth - 60);

      const img = pet.querySelector<HTMLImageElement>("img");
      if (!img) return;

      this.state[index] = {
        el: pet,
        img,
        x,
        speed,
        dir,
        isDragging: false,
        isYapping: false,
      };

      pet.style.left = `${x}px`;

      let startDragX = 0;
      let wasDragged = false;

      pet.addEventListener("pointerdown", (e: PointerEvent) => {
        const s = this.state[index];
        if (!s) return;
        s.isDragging = true;
        wasDragged = false;
        startDragX = e.clientX;
        pet.classList.add("dragging");
        pet.setPointerCapture(e.pointerId);
      });

      pet.addEventListener("pointermove", (e: PointerEvent) => {
        const s = this.state[index];
        if (!s || !s.isDragging) return;

        if (Math.abs(e.clientX - startDragX) > 3) wasDragged = true;

        const rect = this.terrariumElement!.getBoundingClientRect();
        let newX = e.clientX - rect.left - pet.clientWidth / 2;
        let newY = rect.bottom - e.clientY - pet.clientHeight / 2;
        newX = Math.max(-50, Math.min(newX, rect.width + 50));

        s.x = newX;
        pet.style.left = `${newX}px`;
        pet.style.bottom = `${newY}px`;

        if (e.movementX > 0) s.dir = 1;
        else if (e.movementX < 0) s.dir = -1;

        this.updateFace(s);
      });

      pet.addEventListener("pointerup", (e: PointerEvent) => {
        const s = this.state[index];
        if (!s) return;
        s.isDragging = false;
        pet.classList.remove("dragging");
        pet.releasePointerCapture(e.pointerId);
        pet.style.bottom = "12%";
        if (!wasDragged) this.yap(index);
      });
    });

    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  disconnectedCallback(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  private updateFace(s: PetState): void {
    if (s.dir === 1 && !s.img.classList.contains("face-right")) {
      s.img.className = "pixelated face-right";
    } else if (s.dir === -1 && !s.img.classList.contains("face-left")) {
      s.img.className = "pixelated face-left";
    }
  }

  private yap(index: number): void {
    const s = this.state[index];
    if (!s || s.isYapping) return;

    s.isYapping = true;
    s.el.classList.add("yapping");
    setTimeout(() => {
      s.el.classList.remove("yapping");
      s.isYapping = false;
    }, 2500);
  }

  private tick = (time: number): void => {
    if (!this.terrariumElement) return;

    const dt = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;

    const width = this.containerWidth || window.innerWidth;

    this.state.forEach((s) => {
      if (!s || s.isDragging) return;

      s.x += s.speed * s.dir * dt;

      if (s.x > width + 60) s.x = -60;
      else if (s.x < -100) s.x = width + 50;

      s.el.style.left = `${s.x}px`;
      this.updateFace(s);
    });

    this.rafId = requestAnimationFrame(this.tick);
  };
}

if (!customElements.get("pet-terrarium")) {
  customElements.define("pet-terrarium", PetTerrariumComponent);
}
