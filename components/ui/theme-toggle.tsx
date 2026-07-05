"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  // Theme lives on <html> so it can apply before hydration; read it as external state
  const isLight = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("light"),
    () => false,
  );

  const toggle = useCallback(() => {
    const next = document.documentElement.classList.toggle("light");
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      // storage unavailable (private mode) — theme still applies for the session
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-line-bright hover:text-foreground"
    >
      {isLight ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
