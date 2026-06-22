import { useState } from "react";
import * as motion from "motion/react-client";

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
} as any;

const priorityColor: Record<string, string> = {
  P0: "#f87171",
  P1: "#fbbf24",
  P2: "#60a5fa",
  P3: "#6e6e90",
};

type Task = {
  id: number;
  title: string;
  priority: "P0" | "P1" | "P2" | "P3";
  estimatedMinutes: number;
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Implement HTTP request parser",
    priority: "P0",
    estimatedMinutes: 60,
    completed: false,
  },
  {
    id: 2,
    title: "Solve binary search problems",
    priority: "P1",
    estimatedMinutes: 45,
    completed: true,
  },
  {
    id: 3,
    title: "Read Go scheduler article",
    priority: "P1",
    estimatedMinutes: 30,
    completed: false,
  },
  {
    id: 4,
    title: "Fix portfolio website",
    priority: "P2",
    estimatedMinutes: 45,
    completed: false,
  },
  {
    id: 5,
    title: "Explore Rust async runtime",
    priority: "P3",
    estimatedMinutes: 60,
    completed: false,
  },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<"P0" | "P1" | "P2" | "P3">(
    "P1",
  );
  const [newMinutes, setNewMinutes] = useState(30);
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");

  const filtered = tasks
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "done") return t.completed;
      return true;
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return a.priority.localeCompare(b.priority);
    });

  const addTask = () => {
    if (!newTitle.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTitle.trim(),
        priority: newPriority,
        estimatedMinutes: newMinutes,
        completed: false,
      },
    ]);
    setNewTitle("");
    setNewPriority("P1");
    setNewMinutes(30);
    setShowAdd(false);
  };

  const toggleDone = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="max-w-[720px] mx-auto py-10 px-2 space-y-8">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex items-end justify-between"
        >
          <div>
            <p className="font-mono text-[9px] tracking-[4px] text-[#6e6e90] uppercase mb-2">
              Task pool
            </p>
            <h1
              className="italic leading-none text-[#e2e2ee]"
              style={{
                fontFamily: "Instrument Serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                letterSpacing: "-1.5px",
              }}
            >
              All tasks
            </h1>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className={`font-mono text-[9px] tracking-[4px] uppercase px-4 py-2.5 rounded-md border transition-all duration-150
              ${
                showAdd
                  ? "text-[#f87171] border-[#f8717133] bg-[#f871710f] hover:border-[#f8717166]"
                  : "text-[#a78bfa] border-[#a78bfa33] bg-[#a78bfa0f] hover:border-[#a78bfa66] hover:bg-[#a78bfa1a]"
              }`}
          >
            {showAdd ? "Cancel" : "+ Add task"}
          </button>
        </motion.div>

        {/* Add task form */}
        {showAdd && (
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="bg-[#0d0d12] border border-[#a78bfa33] rounded-lg p-5 space-y-4"
          >
            <p className="font-mono text-[9px] tracking-[4px] text-[#a78bfa] uppercase">
              New task
            </p>

            <input
              type="text"
              placeholder="Task title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="w-full bg-[#0a0a0f] border border-[#1a1a26] rounded-md px-4 py-2.5 text-[13px] font-light text-[#e2e2ee] placeholder-[#3a3a52] outline-none focus:border-[#a78bfa44] transition-colors duration-150"
            />

            <div className="flex gap-3">
              {/* Priority */}
              <div className="flex-1">
                <p className="font-mono text-[8px] tracking-[3px] text-[#6e6e90] uppercase mb-2">
                  Priority
                </p>
                <div className="flex gap-2">
                  {(["P0", "P1", "P2", "P3"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setNewPriority(p)}
                      className={`flex-1 py-2 rounded-md border font-mono text-[9px] tracking-[2px] transition-all duration-150
                        ${
                          newPriority === p
                            ? "border-current bg-[#ffffff08]"
                            : "border-[#1a1a26] text-[#3a3a52] hover:border-[#2a2a3a]"
                        }`}
                      style={{
                        color: newPriority === p ? priorityColor[p] : undefined,
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Est. time */}
              <div>
                <p className="font-mono text-[8px] tracking-[3px] text-[#6e6e90] uppercase mb-2">
                  Est. time
                </p>
                <div className="flex gap-2">
                  {[20, 30, 45, 60].map((m) => (
                    <button
                      key={m}
                      onClick={() => setNewMinutes(m)}
                      className={`px-3 py-2 rounded-md border font-mono text-[9px] tracking-[1px] transition-all duration-150
                        ${
                          newMinutes === m
                            ? "border-[#a78bfa44] text-[#a78bfa] bg-[#a78bfa0d]"
                            : "border-[#1a1a26] text-[#3a3a52] hover:border-[#2a2a3a]"
                        }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={addTask}
              disabled={!newTitle.trim()}
              className={`w-full py-2.5 rounded-md border font-mono text-[9px] tracking-[4px] uppercase transition-all duration-150
                ${
                  newTitle.trim()
                    ? "text-[#a78bfa] border-[#a78bfa44] bg-[#a78bfa0f] hover:border-[#a78bfa88]"
                    : "text-[#3a3a52] border-[#1a1a26] cursor-not-allowed"
                }`}
            >
              Add task
            </button>
          </motion.div>
        )}

        {/* Filter tabs */}
        <motion.div
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex items-center gap-1"
        >
          {(["all", "active", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-[9px] tracking-[3px] uppercase px-3 py-1.5 rounded-md transition-all duration-150
                ${
                  filter === f
                    ? "text-[#a78bfa] bg-[#a78bfa14] border border-[#a78bfa33]"
                    : "text-[#3a3a52] border border-transparent hover:text-[#6e6e90]"
                }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono text-[9px] tracking-[2px] text-[#3a3a52]">
            {filtered.length} tasks
          </span>
        </motion.div>

        {/* Task list */}
        <motion.div
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="bg-[#0d0d12] border border-[#1a1a26] rounded-lg overflow-hidden"
        >
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="font-mono text-[9px] tracking-[3px] text-[#3a3a52] uppercase">
                No tasks
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#13131a]">
              {filtered.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-4 px-5 py-3.5 group transition-all duration-150 hover:bg-[#13131a]
                    ${task.completed ? "opacity-40" : ""}`}
                >
                  {/* Done toggle */}
                  <button
                    onClick={() => toggleDone(task.id)}
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-150
                      ${
                        task.completed
                          ? "border-[#34d399] bg-[#34d3991a]"
                          : "border-[#2a2a3a] hover:border-[#3a3a52]"
                      }`}
                  >
                    {task.completed && (
                      <div className="w-1.5 h-1.5 rounded-sm bg-[#34d399]" />
                    )}
                  </button>

                  {/* Priority dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: priorityColor[task.priority] }}
                  />

                  {/* Title */}
                  <span
                    className={`flex-1 text-[13px] font-light transition-colors duration-150
                      ${task.completed ? "line-through text-[#3a3a52]" : "text-[#c0c0d8]"}`}
                  >
                    {task.title}
                  </span>

                  {/* Est time */}
                  <span className="font-mono text-[9px] tracking-[1px] text-[#3a3a52] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {task.estimatedMinutes}m
                  </span>

                  {/* Priority */}
                  <span
                    className="font-mono text-[9px] tracking-[2px] w-6 text-right"
                    style={{ color: priorityColor[task.priority] }}
                  >
                    {task.priority}
                  </span>

                  {/* Delete */}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="w-5 h-5 flex items-center justify-center text-[#3a3a52] hover:text-[#f87171] transition-colors duration-150 opacity-0 group-hover:opacity-100 font-mono text-[14px]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Summary */}
        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex gap-6"
        >
          {[
            { label: "Total", value: tasks.length, color: "#e2e2ee" },
            {
              label: "Active",
              value: tasks.filter((t) => !t.completed).length,
              color: "#a78bfa",
            },
            {
              label: "Done",
              value: tasks.filter((t) => t.completed).length,
              color: "#34d399",
            },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-mono text-[8px] tracking-[3px] text-[#3a3a52] uppercase mb-1">
                {s.label}
              </p>
              <p
                className="italic"
                style={{
                  fontFamily: "Instrument Serif",
                  fontSize: "1.6rem",
                  color: s.color,
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
