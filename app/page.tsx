"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Atom,
  Blocks,
  BookOpenText,
  ChevronDown,
  Compass,
  HeartPulse,
  Landmark,
  Languages,
  Laptop,
  Lightbulb,
  Palette,
  Search,
  Sigma,
  SlidersHorizontal,
  Sparkles,
  Target,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import curriculumData from "./curriculum-data.json";

type AreaName = (typeof curriculumData.areas)[number]["name"];
type RecordItem = (typeof curriculumData.records)[number];

const iconMap = {
  Palette,
  HeartPulse,
  Landmark,
  Languages,
  Sigma,
  Atom,
};

const stepDetails = {
  1: { label: "Step 1", ages: "Ages 5–8", device: "iPad-led" },
  2: { label: "Step 2", ages: "Ages 8–11", device: "Mixed devices" },
  3: { label: "Step 3", ages: "Ages 11+", device: "Chromebook-led" },
} as const;

export default function Home() {
  const [area, setArea] = useState<AreaName>(curriculumData.areas[0].name);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [statement, setStatement] = useState("all");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const selectedArea = curriculumData.areas.find((item) => item.name === area)!;

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return curriculumData.records.filter((record) => {
      if (record.area !== area || record.step !== step) return false;
      if (statement !== "all" && record.statementOrder !== Number(statement)) return false;
      if (!normalizedQuery) return true;
      return [
        record.descriptor,
        record.statement,
        ...record.ideas.flatMap((idea) => [
          idea.title,
          idea.learningGoal,
          idea.description,
          idea.example,
          idea.resources,
        ]),
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
    });
  }, [area, step, statement, query]);

  useEffect(() => {
    setExpandedId(null);
    setVisibleCount(8);
  }, [area, step, statement, query]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    const observeGlidingElements = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-glide]").forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        observer.observe(element);
      });
    };

    document.documentElement.classList.add("motion-ready");
    observeGlidingElements(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches("[data-glide]") && !observed.has(node)) {
              observed.add(node);
              observer.observe(node);
            }
            observeGlidingElements(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  function chooseArea(nextArea: AreaName) {
    setArea(nextArea);
    setStatement("all");
    setQuery("");
  }

  return (
    <main className="min-h-screen bg-[var(--canvas)] text-slate-950">
      <header className="topographic relative overflow-hidden bg-[var(--ink)] text-white">
        <div className="relative mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white text-[var(--ink)] shadow-lg shadow-black/15">
              <Compass className="size-5" strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">Curriculum for Wales</p>
              <p className="text-base font-bold tracking-tight sm:text-lg">Curriculum Ideas Cymru</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur-sm sm:flex">
            <Sparkles className="size-4 text-amber-300" />
            {curriculumData.totals.ideas} practical lesson ideas
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <section className="mb-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[var(--teal)]">Teaching idea finder</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">What do you want to teach?</h1>
            </div>
            <p className="text-sm text-slate-500">Choose two options to see matching ideas.</p>
          </div>

          <Card data-glide="up" className="overflow-hidden rounded-[1.4rem] border-slate-200/90 bg-white py-0 shadow-sm">
            <CardContent className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-[var(--ink)] text-sm font-black text-white">1</span>
                <h2 className="text-base font-bold text-slate-900">Choose an area of learning</h2>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
                {curriculumData.areas.map((item) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  const active = item.name === area;
                  return (
                    <Button
                      key={item.name}
                      type="button"
                      variant="ghost"
                      onClick={() => chooseArea(item.name)}
                      aria-pressed={active}
                      className="h-auto min-h-[4.5rem] justify-start gap-2.5 whitespace-normal rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-all"
                      style={{
                        borderColor: active ? item.color : "transparent",
                        backgroundColor: active ? `${item.color}12` : "transparent",
                        color: active ? item.color : "#334155",
                      }}
                    >
                      <span
                        className="grid size-9 shrink-0 place-items-center rounded-lg text-white shadow-sm"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon className="size-[1.15rem]" />
                      </span>
                      <span>{item.short}</span>
                    </Button>
                  );
                })}
              </div>

              <div className="my-5 border-t border-slate-100" />

              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-[var(--ink)] text-sm font-black text-white">2</span>
                <h2 className="text-base font-bold text-slate-900">Choose the learners</h2>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {([1, 2, 3] as const).map((item) => {
                  const active = item === step;
                  const detail = stepDetails[item];
                  return (
                    <Button
                      key={item}
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(item)}
                      aria-pressed={active}
                      className="h-auto justify-start gap-3 rounded-xl border px-3 py-3.5 text-left transition-all"
                      style={{
                        borderColor: active ? selectedArea.color : "#e2e8f0",
                        backgroundColor: active ? `${selectedArea.color}0D` : "white",
                      }}
                    >
                      <span
                        className="grid size-9 shrink-0 place-items-center rounded-full text-sm font-black"
                        style={{
                          backgroundColor: active ? selectedArea.color : "#f1f5f9",
                          color: active ? "white" : "#475569",
                        }}
                      >
                        {item}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-slate-800">{detail.label}</span>
                        <span className="block text-sm font-medium text-slate-500">{detail.ages} · {detail.device}</span>
                      </span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="min-w-0" aria-label="Matching teaching ideas">
          <div data-glide="up" className="rounded-[1.6rem] border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge className="border-0 text-white" style={{ backgroundColor: selectedArea.color }}>
                    {selectedArea.short}
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600">{stepDetails[step].label} · {stepDetails[step].ages}</Badge>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-950">Teaching ideas for {selectedArea.short}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Pick a learning goal to see two practical lesson options.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:w-[720px]">
                <label className="block min-w-0 flex-1">
                  <span className="mb-1.5 block text-sm font-semibold text-slate-700">Search ideas</span>
                  <span className="relative block">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Topic, tool or resource"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-9 pr-9 text-base shadow-none sm:text-sm"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </span>
                </label>

                <label className="block min-w-0">
                  <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <SlidersHorizontal className="size-4 text-[var(--teal)]" />
                    Filter by curriculum statement
                  </span>
                  <Select value={statement} onValueChange={setStatement}>
                    <SelectTrigger className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 text-left text-sm shadow-none">
                      <SelectValue placeholder="All curriculum statements" />
                    </SelectTrigger>
                    <SelectContent align="start" className="max-w-[min(650px,calc(100vw-32px))]">
                      <SelectItem value="all">All curriculum statements</SelectItem>
                      {selectedArea.statements.map((item) => (
                        <SelectItem key={item.order} value={String(item.order)}>
                          Statement {item.order}: {item.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3 mt-6 flex items-center justify-between gap-3 px-1">
            <p className="text-sm font-semibold text-slate-600">
              <span className="text-slate-950">{filteredRecords.length}</span> {filteredRecords.length === 1 ? "learning goal" : "learning goals"}
            </p>
            <p className="hidden text-sm text-slate-500 sm:block">Open one to see two lesson ideas</p>
          </div>

          {filteredRecords.length ? (
            <div className="space-y-3">
              {filteredRecords.slice(0, visibleCount).map((record, index) => (
                <DescriptorCard
                  key={record.id}
                  record={record}
                  expanded={expandedId === record.id}
                  onToggle={() => setExpandedId(expandedId === record.id ? null : record.id)}
                  glideDirection={index % 2 === 0 ? "left" : "right"}
                  glideDelay={Math.min(index * 45, 225)}
                />
              ))}
              {visibleCount < filteredRecords.length && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setVisibleCount((count) => count + 8)}
                  className="mx-auto mt-5 flex h-11 rounded-xl px-6"
                >
                  Show 8 more
                </Button>
              )}
            </div>
          ) : (
            <Card className="rounded-[1.6rem] border-dashed border-slate-300 bg-white py-14 text-center shadow-none">
              <CardContent>
                <Search className="mx-auto size-8 text-slate-300" />
                <h3 className="mt-4 text-lg font-bold">No matching learning goals</h3>
                <p className="mt-1 text-sm text-slate-500">Try a broader search or choose all statements.</p>
                <Button type="button" variant="outline" onClick={() => { setQuery(""); setStatement("all"); }} className="mt-5 rounded-xl">
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  );
}

function DescriptorCard({
  record,
  expanded,
  onToggle,
  glideDirection,
  glideDelay,
}: {
  record: RecordItem;
  expanded: boolean;
  onToggle: () => void;
  glideDirection: "left" | "right";
  glideDelay: number;
}) {
  return (
    <Card
      data-glide={glideDirection}
      className="overflow-hidden rounded-[1.4rem] border-slate-200/90 bg-white py-0 shadow-sm transition-shadow hover:shadow-md"
      style={{ borderLeft: `5px solid ${record.color}`, transitionDelay: `${glideDelay}ms` }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-start gap-4 px-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 sm:px-5"
      >
        <span
          className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl text-sm font-black"
          style={{ backgroundColor: `${record.color}12`, color: record.color }}
        >
          {record.descriptorOrder}
        </span>
        <span className="min-w-0 flex-1">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
            Official descriptor · Statement {record.statementOrder}
          </span>
          <span className="block text-base font-semibold leading-7 text-slate-900 sm:text-[1.05rem]">{record.descriptor}</span>
        </span>
        <span className="mt-1 flex shrink-0 items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600">
              <span className="hidden sm:inline">{expanded ? "Hide ideas" : "See 2 ideas"}</span>
          <ChevronDown className={`size-5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </span>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/75 px-4 py-4 sm:px-5 sm:py-5">
          <div className="grid gap-4 xl:grid-cols-2">
            {record.ideas.map((idea, index) => {
              const technology = idea.mode === "Technology";
              const Icon = technology ? Laptop : Blocks;
              return (
                <article
                  key={`${record.id}-${index}`}
                  data-glide="up"
                  style={{ transitionDelay: `${index * 80}ms` }}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgb(15_23_42/4%)] sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${technology ? "bg-sky-50 text-sky-700" : "bg-amber-50 text-amber-800"}`}>
                      <Icon className="size-3.5" />
                      {idea.mode}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">Idea {index + 1}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-6 text-slate-950">{idea.title.split(" - ")[0]}</h3>
                  <div className="mt-3 rounded-xl bg-slate-100 px-3 py-2.5 text-sm leading-5 text-slate-600">
                    <span className="font-bold text-slate-800">You’ll need: </span>{idea.resources}
                  </div>
                  <div
                    className="mt-3 flex items-start gap-2.5 rounded-xl border px-3 py-3"
                    style={{ backgroundColor: `${record.color}0a`, borderColor: `${record.color}2e` }}
                  >
                    <Target className="mt-0.5 size-4 shrink-0" style={{ color: record.color }} />
                    <div>
                      <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-slate-500">Learning goal</p>
                      <p className="mt-1 text-sm font-medium leading-6 text-slate-700">{idea.learningGoal}</p>
                    </div>
                  </div>
                  <details className="mt-3 rounded-xl border border-slate-200 bg-white">
                    <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-950">
                      View lesson steps
                    </summary>
                    <div className="border-t border-slate-100 px-3 py-3">
                      <p className="text-[0.95rem] leading-7 text-slate-600">{idea.description}</p>
                      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
                        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-amber-800">
                          <Lightbulb className="size-4 shrink-0" />
                          Example
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">{idea.example}</p>
                      </div>
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
          <details className="mt-4 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-600">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-bold text-slate-700">
              <BookOpenText className="size-4 shrink-0" style={{ color: record.color }} />
              View the curriculum statement
            </summary>
            <p className="mt-3 border-t border-slate-100 pt-3 leading-6"><strong className="text-slate-800">Statement {record.statementOrder}:</strong> {record.statement}</p>
          </details>
        </div>
      )}
    </Card>
  );
}
