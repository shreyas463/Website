"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

interface TerminalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TerminalContext = createContext<TerminalContextValue>({ open: false, setOpen: () => {} });

export function useTerminal() {
  return useContext(TerminalContext);
}

interface Line {
  kind: "input" | "output";
  text: string;
}

const HELP = `available commands:
  help          show this help
  about         who I am
  experience    where I've worked
  projects      what I've built
  skills        what I work with
  contact       how to reach me
  resume        download my resume
  sudo hire-me  ???
  clear         clear the terminal`;

function runCommand(raw: string): { output: string; action?: "resume" | "contact" | "clear" } {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return { output: "" };
    case "help":
      return { output: HELP };
    case "about":
      return {
        output: `${profile.name} — ${profile.headline}\n${profile.location}\n\n${profile.about.intro}`,
      };
    case "experience":
      return {
        output: experience
          .slice(0, 5)
          .map((e) => `${e.start.padEnd(10)} ${e.role} @ ${e.company}${e.client ? ` (${e.client})` : ""}`)
          .join("\n"),
      };
    case "projects":
      return {
        output: projects
          .slice(0, 6)
          .map((p) => `${p.title.padEnd(28)} ${p.stack.slice(0, 3).join(", ")}`)
          .join("\n"),
      };
    case "skills":
      return {
        output: skillCategories.map((c) => `${c.title.padEnd(24)} ${c.skills.join(", ")}`).join("\n"),
      };
    case "contact":
      return {
        output: `email:    ${profile.email}\nlinkedin: ${profile.social.linkedin}\ngithub:   ${profile.social.github}`,
        action: "contact",
      };
    case "resume":
      return { output: "downloading resume.pdf…", action: "resume" };
    case "clear":
      return { output: "", action: "clear" };
    case "sudo hire-me":
    case "sudo hire me":
      return {
        output: `[sudo] password for recruiter: ********\naccess granted ✓\nscheduling interview with ${profile.name}…\n→ ${profile.email}`,
      };
    case "whoami":
      return { output: "recruiter (probably) — welcome!" };
    case "ls":
      return { output: "about/  experience/  projects/  skills/  publications/  contact/" };
    case "pwd":
      return { output: `/home/${profile.githubUsername}/portfolio` };
    case "exit":
      return { output: "logout — click the × to close" };
    default:
      return { output: `command not found: ${cmd}\ntype 'help' for available commands` };
  }
}

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { kind: "output", text: `welcome to ${profile.monogram.toLowerCase()}-shell v1.0.0` },
    { kind: "output", text: "type 'help' to get started" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function submit() {
    const raw = input;
    setInput("");
    setHistoryIndex(-1);
    if (raw.trim()) setHistory((h) => [raw, ...h].slice(0, 50));

    const { output, action } = runCommand(raw);
    if (action === "clear") {
      setLines([]);
      return;
    }
    setLines((l) => [
      ...l,
      { kind: "input", text: raw },
      ...(output ? [{ kind: "output" as const, text: output }] : []),
    ]);
    if (action === "resume") window.location.href = profile.resumeUrl;
    if (action === "contact") {
      setOpen(false);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next]) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(next >= 0 ? history[next] : "");
    }
  }

  return (
    <TerminalContext.Provider value={{ open, setOpen }}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Interactive terminal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.18 }}
              className="flex h-[420px] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-line-bright bg-[#060a10] shadow-2xl shadow-black/50"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.focus();
              }}
            >
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" aria-hidden />
                <span className="ml-2 font-mono text-xs text-muted">
                  {profile.monogram.toLowerCase()}@portfolio: ~
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  className="ml-auto text-muted transition-colors hover:text-foreground"
                >
                  <X size={15} />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="thin-scroll flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
              >
                {lines.map((line, i) =>
                  line.kind === "input" ? (
                    <p key={i} className="text-foreground">
                      <span className="text-emerald-400">➜</span>{" "}
                      <span className="text-accent">~</span> {line.text}
                    </p>
                  ) : (
                    <pre key={i} className="whitespace-pre-wrap text-muted">
                      {line.text}
                    </pre>
                  ),
                )}
                <p className="flex text-foreground">
                  <span className="text-emerald-400">➜</span>
                  <span className="mx-1.5 text-accent">~</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 bg-transparent outline-none"
                    aria-label="Terminal input"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </TerminalContext.Provider>
  );
}
