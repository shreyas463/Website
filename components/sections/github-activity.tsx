import { Star, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { profile } from "@/data/profile";
import { fallbackRepos, type Repo } from "@/data/github";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

interface GitHubRepoResponse {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
}

async function getRepos(): Promise<{ repos: Repo[]; live: boolean }> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUsername}/repos?sort=pushed&per_page=30`,
      { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = (await res.json()) as GitHubRepoResponse[];
    const repos = data
      .filter((r) => !r.fork && r.description)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description ?? "",
        url: r.html_url,
        language: r.language ?? "—",
        stars: r.stargazers_count,
      }));
    return repos.length > 0 ? { repos, live: true } : { repos: fallbackRepos, live: false };
  } catch {
    return { repos: fallbackRepos, live: false };
  }
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  Python: "bg-emerald-400",
  Java: "bg-orange-400",
  HTML: "bg-rose-400",
  CSS: "bg-purple-400",
};

export async function GitHubActivity() {
  const { repos, live } = await getRepos();

  return (
    <section id="github" className="scroll-mt-20 bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="07"
          title="Open Source & Activity"
          subtitle={
            live
              ? "Recently active repositories, straight from the GitHub API."
              : "Featured repositories from my GitHub."
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <Reveal key={repo.name} delay={Math.min(i * 0.04, 0.15)}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-bright"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon size={15} className="text-muted" aria-hidden />
                  <span className="truncate font-mono text-sm font-medium group-hover:text-accent">
                    {repo.name}
                  </span>
                  <ExternalLink
                    size={12}
                    className="ml-auto shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted [overflow-wrap:anywhere]">
                  {repo.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${languageColors[repo.language] ?? "bg-slate-400"}`}
                      aria-hidden
                    />
                    {repo.language}
                  </span>
                  {repo.stars > 0 ? (
                    <span className="flex items-center gap-1">
                      <Star size={12} aria-hidden />
                      {repo.stars}
                    </span>
                  ) : null}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-center">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-foreground"
            >
              <GithubIcon size={15} aria-hidden />
              github.com/{profile.githubUsername} →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
