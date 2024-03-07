"use client";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

function SmoothScrolling({ children }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.4, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
