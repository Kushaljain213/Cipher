import * as motion from "motion/react-client";
import { Link } from "react-router-dom";

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
} as any;

const tasks = [
  { title: "Implement HTTP request parser", priority: "P0", done: false },
  { title: "Solve binary search problems", priority: "P1", done: true },
  { title: "Read Go scheduler article", priority: "P2", done: false },
];

const priorityColor: Record<string, string> = {
  P0: "#f87171",
  P1: "#fbbf24",
  P2: "#60a5fa",
  P3: "#6e6e90",
};

const weekActivity = [3, 5, 2, 6, 4, 1, 3]; // sessions per day, Sun–Sat
const days = ["S", "M", "T", "W", "T", "F", "S"];

export default function Dashboard() {
  return (
    <div className="h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="max-w-[860px] mx-auto py-10 px-2 space-y-8">
        {/* ── Header ── */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex items-end justify-between"
        >
          <div>
            <p className="font-mono text-[9px] tracking-[4px] text-[#6e6e90] uppercase mb-2">
              Overview
            </p>
            <h1
              className="italic leading-none text-[#e2e2ee]"
              style={{
                fontFamily: "Instrument Serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                letterSpacing: "-1.5px",
              }}
            >
              Good morning, Woolf
            </h1>
          </div>
          <Link
            to="/planner"
            className="font-mono text-[9px] tracking-[4px] uppercase text-[#a78bfa] border border-[#a78bfa33] bg-[#a78bfa0f] px-4 py-2.5 rounded-md hover:border-[#a78bfa66] hover:bg-[#a78bfa1a] transition-all duration-150"
          >
            Plan today →
          </Link>
        </motion.div>

        {/* ── Stat row ── */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Sessions today", value: "3", color: "#a78bfa" },
            { label: "Focus time", value: "1h 40m", color: "#34d399" },
            { label: "Streak", value: "14d", color: "#fbbf24" },
            { label: "Tasks done", value: "1 / 3", color: "#e2e2ee" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              custom={i + 1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="bg-[#0d0d12] border border-[#1a1a26] rounded-lg p-4"
            >
              <p className="font-mono text-[9px] tracking-[3px] text-[#6e6e90] uppercase mb-2">
                {s.label}
              </p>
              <p
                className="italic leading-none"
                style={{
                  fontFamily: "Instrument Serif",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: s.color,
                  letterSpacing: "-0.5px",
                }}
              >
                {s.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-[1fr_280px] gap-4">
          {/* Left: Focus tasks */}
          <motion.div
            custom={5}
            variants={fade}
            initial="hidden"
            animate="show"
            className="bg-[#0d0d12] border border-[#1a1a26] rounded-lg p-5 space-y-3"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="font-mono text-[9px] tracking-[4px] text-[#6e6e90] uppercase">
                Today's focus
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                <span className="font-mono text-[9px] tracking-[2px] text-[#6e6e90] uppercase">
                  Active
                </span>
              </div>
            </div>

            {tasks.map((task, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-md border px-4 py-3 transition-all duration-150 group
                  ${
                    task.done
                      ? "border-[#1a1a26] bg-[#0a0a0f] opacity-50"
                      : "border-[#1a1a26] bg-[#0d0d12] hover:border-[#242438]"
                  }`}
                style={{
                  borderLeftWidth: "2px",
                  borderLeftColor: task.done
                    ? "#2a2a3a"
                    : priorityColor[task.priority],
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: task.done
                      ? "#2a2a3a"
                      : priorityColor[task.priority],
                  }}
                />
                <span
                  className={`flex-1 text-[13px] font-light ${task.done ? "line-through text-[#3a3a52]" : "text-[#c0c0d8]"}`}
                >
                  {task.title}
                </span>
                <span
                  className="font-mono text-[9px] tracking-[2px]"
                  style={{
                    color: task.done ? "#2a2a3a" : priorityColor[task.priority],
                  }}
                >
                  {task.priority}
                </span>
                {!task.done && (
                  <Link
                    to="/focus"
                    className="ml-1 font-mono text-[9px] tracking-[3px] uppercase text-[#a78bfa] border border-[#a78bfa33] px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-150 hover:border-[#a78bfa66]"
                  >
                    Start
                  </Link>
                )}
              </div>
            ))}
          </motion.div>

          {/* Right col */}
          <div className="space-y-4">
            {/* Weekly activity */}
            <motion.div
              custom={6}
              variants={fade}
              initial="hidden"
              animate="show"
              className="bg-[#0d0d12] border border-[#1a1a26] rounded-lg p-5"
            >
              <p className="font-mono text-[9px] tracking-[4px] text-[#6e6e90] uppercase mb-4">
                This week
              </p>
              <div className="flex items-end gap-1.5 h-16">
                {weekActivity.map((v, i) => {
                  const today = new Date().getDay();
                  const isToday = i === today;
                  const h = Math.round((v / 6) * 100);
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1.5 flex-1"
                    >
                      <div
                        className="w-full rounded-sm transition-all duration-300"
                        style={{
                          height: `${h}%`,
                          backgroundColor: isToday ? "#a78bfa" : "#1a1a26",
                          minHeight: "4px",
                        }}
                      />
                      <span
                        className="font-mono text-[8px]"
                        style={{ color: isToday ? "#a78bfa" : "#3a3a52" }}
                      >
                        {days[i]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Next up */}
            <motion.div
              custom={7}
              variants={fade}
              initial="hidden"
              animate="show"
              className="bg-[#0d0d12] border border-[#1a1a26] rounded-lg p-5"
            >
              <p className="font-mono text-[9px] tracking-[4px] text-[#6e6e90] uppercase mb-3">
                Next in pool
              </p>
              <div className="space-y-2">
                {[
                  { title: "Fix portfolio website", priority: "P2" },
                  { title: "Explore Rust async", priority: "P3" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-1.5">
                    <div
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: priorityColor[t.priority] }}
                    />
                    <span className="text-[12px] font-light text-[#5a5a78] flex-1 truncate">
                      {t.title}
                    </span>
                    <span
                      className="font-mono text-[8px] tracking-[2px]"
                      style={{ color: priorityColor[t.priority] }}
                    >
                      {t.priority}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Recent sessions ── */}
        <motion.div
          custom={8}
          variants={fade}
          initial="hidden"
          animate="show"
          className="bg-[#0d0d12] border border-[#1a1a26] rounded-lg p-5"
        >
          <p className="font-mono text-[9px] tracking-[4px] text-[#6e6e90] uppercase mb-4">
            Recent sessions
          </p>
          <div className="space-y-0 divide-y divide-[#13131a]">
            {[
              {
                task: "Solve binary search problems",
                duration: "45m",
                time: "09:12",
                status: "done",
              },
              {
                task: "Implement HTTP request parser",
                duration: "30m",
                time: "08:20",
                status: "quit",
              },
              {
                task: "Read Go scheduler article",
                duration: "25m",
                time: "Yesterday",
                status: "done",
              },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      s.status === "done" ? "#34d399" : "#f87171",
                  }}
                />
                <span className="flex-1 text-[12px] font-light text-[#c0c0d8] truncate">
                  {s.task}
                </span>
                <span className="font-mono text-[9px] tracking-[2px] text-[#3a3a52]">
                  {s.duration}
                </span>
                <span className="font-mono text-[9px] tracking-[2px] text-[#3a3a52] w-16 text-right">
                  {s.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
