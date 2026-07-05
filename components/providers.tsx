"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "./ui/toast";
import { TerminalProvider } from "./ui/terminal";
import { CommandPaletteProvider } from "./ui/command-palette";
import { ScrollProgress } from "./ui/scroll-progress";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <TerminalProvider>
        <CommandPaletteProvider>
          <ScrollProgress />
          {children}
        </CommandPaletteProvider>
      </TerminalProvider>
    </ToastProvider>
  );
}
