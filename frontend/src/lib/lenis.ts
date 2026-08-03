import Lenis from "lenis";

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    wheelMultiplier: 1,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
}