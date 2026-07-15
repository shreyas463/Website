"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import {
  matchIntent,
  answerByIntent,
  SUGGESTIONS,
  INITIAL_MESSAGE,
  type ChatAnswer,
} from "@/lib/chatbot";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  from: "bot" | "user";
  text?: string;
  answer?: ChatAnswer;
}

function AnswerBody({ answer, onNavigate }: { answer: ChatAnswer; onNavigate: () => void }) {
  return (
    <div className="space-y-2">
      {answer.paragraphs.map((p, i) => (
        <p key={i} className="text-sm leading-relaxed">
          {p}
        </p>
      ))}
      {answer.bullets ? (
        <ul className="space-y-1">
          {answer.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm leading-relaxed">
              <span className="mt-px shrink-0 text-accent" aria-hidden>
                ▹
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {answer.links ? (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {answer.links.map((l) => {
            const internal = l.href.startsWith("#");
            const common =
              "inline-flex items-center rounded-md border border-line-bright px-2.5 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-background";
            return internal ? (
              <button
                key={l.href}
                type="button"
                className={common}
                onClick={() => {
                  document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
                  onNavigate();
                }}
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={common}
                download={l.href === profile.resumeUrl ? true : undefined}
              >
                {l.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", answer: INITIAL_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function respond(result: ReturnType<typeof matchIntent>) {
    setTyping(true);
    const delay = reduceMotion ? 0 : 450;
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: "bot", answer: result.answer }]);
      setTyping(false);
    }, delay);
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: trimmed }]);
    setInput("");
    respond(matchIntent(trimmed));
  }

  function askSuggestion(s: { label: string; intentId: string }) {
    if (typing) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: s.label }]);
    respond(answerByIntent(s.intentId));
  }

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open ? (
          <motion.button
            type="button"
            initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduceMotion ? undefined : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={() => setOpen(true)}
            aria-label="Open chat — ask about Shreyas"
            className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-line-bright bg-raised px-4 py-3 shadow-xl shadow-black/40 transition-colors hover:border-accent"
          >
            <MessageSquare size={18} className="text-accent" aria-hidden />
            <span className="text-sm font-medium">Ask about me</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-40 flex h-[min(560px,80vh)] w-[min(384px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-line-bright bg-surface shadow-2xl shadow-black/50"
            role="dialog"
            aria-modal="false"
            aria-label="Chat with Shreyas's resume assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line bg-raised px-4 py-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 font-mono text-sm font-semibold text-accent">
                {profile.monogram}
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-raised bg-emerald-400"
                  aria-hidden
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  Resume assistant
                  <Sparkles size={12} className="text-accent" aria-hidden />
                </p>
                <p className="truncate text-xs text-muted">Ask about {profile.name.split(" ")[0]}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <X size={17} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="thin-scroll flex-1 space-y-3 overflow-y-auto p-4"
              aria-live="polite"
            >
              {messages.map((msg) =>
                msg.from === "user" ? (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3.5 py-2 text-sm text-background">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex justify-start">
                    <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-line bg-raised px-3.5 py-2.5 text-foreground">
                      <AnswerBody answer={msg.answer!} onNavigate={() => setOpen(false)} />
                    </div>
                  </div>
                ),
              )}

              {typing ? (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-line bg-raised px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Suggestions */}
            <div className="thin-scroll flex gap-1.5 overflow-x-auto border-t border-line px-3 py-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.intentId}
                  type="button"
                  onClick={() => askSuggestion(s)}
                  className="shrink-0 rounded-full border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Type your question"
                className="h-10 flex-1 rounded-lg border border-line bg-raised px-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-background transition-opacity",
                  (!input.trim() || typing) && "opacity-40",
                )}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
