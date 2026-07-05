"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  BookOpen,
  Mail,
  FileDown,
  Moon,
  TerminalSquare,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useTerminal } from "./terminal";

interface PaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PaletteContext = createContext<PaletteContextValue>({ open: false, setOpen: () => {} });

export function useCommandPalette() {
  return useContext(PaletteContext);
}

interface Command {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  run: () => void;
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setOpen: setTerminalOpen } = useTerminal();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const goTo = (id: string) => () => {
      close();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    const openUrl = (url: string) => () => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    };
    return [
      { id: "about", label: "Go to About", icon: User, run: goTo("about") },
      { id: "experience", label: "Go to Experience", icon: Briefcase, run: goTo("experience") },
      { id: "projects", label: "Go to Projects", icon: FolderGit2, run: goTo("projects") },
      { id: "skills", label: "Go to Skills", icon: Cpu, run: goTo("skills") },
      { id: "publications", label: "Go to Research", icon: BookOpen, run: goTo("publications") },
      { id: "contact", label: "Go to Contact", icon: Mail, run: goTo("contact") },
      {
        id: "resume",
        label: "Download Resume",
        hint: "PDF",
        icon: FileDown,
        run: () => {
          close();
          window.location.href = profile.resumeUrl;
        },
      },
      {
        id: "terminal",
        label: "Open Terminal",
        hint: "interactive",
        icon: TerminalSquare,
        run: () => {
          close();
          setTerminalOpen(true);
        },
      },
      {
        id: "theme",
        label: "Toggle Theme",
        icon: Moon,
        run: () => {
          close();
          const isLight = document.documentElement.classList.toggle("light");
          try {
            localStorage.setItem("theme", isLight ? "light" : "dark");
          } catch {}
        },
      },
      { id: "github", label: "Open GitHub Profile", icon: GithubIcon, run: openUrl(profile.social.github) },
      { id: "linkedin", label: "Open LinkedIn", icon: LinkedinIcon, run: openUrl(profile.social.linkedin) },
      ...projects.map((p) => ({
        id: `project-${p.id}`,
        label: `Project: ${p.title}`,
        hint: p.stack[0],
        icon: FolderGit2,
        run: openUrl(p.github),
      })),
    ];
  }, [close, setTerminalOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
        setQuery("");
        setSelected(0);
      } else if (e.key === "Escape" && open) {
        close();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function onQueryChange(value: string) {
    setQuery(value);
    setSelected(0);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[selected]) {
      e.preventDefault();
      filtered[selected].run();
    }
  }

  return (
    <PaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg overflow-hidden rounded-xl border border-line-bright bg-raised shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search size={15} className="text-muted" aria-hidden />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="Type a command or search…"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted"
                  aria-label="Search commands"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">
                  esc
                </kbd>
              </div>
              <ul className="thin-scroll max-h-72 overflow-y-auto p-2" role="listbox">
                {filtered.length === 0 ? (
                  <li className="px-3 py-6 text-center font-mono text-xs text-muted">
                    command not found: {query}
                  </li>
                ) : (
                  filtered.map((cmd, i) => {
                    const Icon = cmd.icon;
                    return (
                      <li key={cmd.id} role="option" aria-selected={i === selected}>
                        <button
                          type="button"
                          onClick={cmd.run}
                          onMouseEnter={() => setSelected(i)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                            i === selected ? "bg-accent/10 text-accent" : "text-muted",
                          )}
                        >
                          <Icon size={15} aria-hidden />
                          <span className="flex-1 truncate">{cmd.label}</span>
                          {cmd.hint ? (
                            <span className="font-mono text-[10px] opacity-70">{cmd.hint}</span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PaletteContext.Provider>
  );
}
