// lib/useIsMobile.ts
import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // SSR 안전: 클라이언트에서만 동작
    if (typeof window === "undefined") return;

    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();                         // 최초 1회
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
