import { useState } from "react";
import * as motion from "motion/react-client";
import { useNavigate } from "react-router-dom";

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

const allTasks = [
  { id: 1, title: "Implement HTTP request parser", priority: "P0" },
  { id: 2, title: "Solve binary search problems", priority: "P1" },
  { id: 3, title: "Read Go scheduler article", priority: "P1" },
  { id: 4, title: "Fix portfolio website", priority: "P2" },
  { id: 5, title: "Explore Rust async runtime", priority: "P3" },
];

export default function Planner() {
  const [selected, setSelected] = useState<number[]>([1, 2, 3]);
  const navigate = useNavigate();

  const toggle = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="max-w-[640px] mx-auto py-10 px-2 space-y-8">
        {/* Header */}
        <motion.div custom={0} variants={fade} initial="hidden" animate="show">
          <p className="font-mono text-[9px] tracking-[4px] text-[#6e6e90] uppercase mb-2">
            Morning planning
          </p>
          <h1
            className="italic leading-none text-[#e2e2ee]"
            style={{
              fontFamily: "Instrument Serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              letterSpacing: "-1.5px",
            }}
          >
            Plan today
          </h1>
        </motion.div>

        {/* Rule callout */}
        <motion.div
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="border-l-2 border-[#a78bfa] bg-[#a78bfa0a] px-4 py-3 rounded-r-md"
        >
          <p className="font-mono text-[9px] tracking-[3px] text-[#a78bfa] uppercase mb-1">
            Rule
          </p>
          <p className="text-[12px] font-light text-[#8080a8]">
            Select exactly 3 tasks. These will be locked for the day. Additional
            tasks cannot be added until one is completed.
          </p>
        </motion.div>

        {/* Task list */}
        <motion.div
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="bg-[#0d0d12] border border-[#1a1a26] rounded-lg overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-[#1a1a26] flex items-center justify-between">
            <p className="font-mono text-[9px] tracking-[4px] text-[#6e6e90] uppercase">
              Suggested tasks
            </p>
            <span className="font-mono text-[9px] tracking-[2px] text-[#a78bfa]">
              {selected.length} / 3 selected
            </span>
          </div>

          <div className="divide-y divide-[#13131a]">
            {allTasks.map((task) => {
              const isSelected = selected.includes(task.id);
              const isDisabled = !isSelected && selected.length >= 3;

              return (
                <button
                  key={task.id}
                  onClick={() => toggle(task.id)}
                  disabled={isDisabled}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 transition-all duration-150 text-left
                    ${isSelected ? "bg-[#a78bfa0d]" : ""}
                    ${isDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-[#13131a] cursor-pointer"}
                  `}
                >
                  {/* Checkbox */}
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-150
                      ${
                        isSelected
                          ? "border-[#a78bfa] bg-[#a78bfa1a]"
                          : "border-[#2a2a3a] bg-transparent"
                      }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-sm bg-[#a78bfa]" />
                    )}
                  </div>

                  {/* Priority dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: priorityColor[task.priority] }}
                  />

                  {/* Title */}
                  <span
                    className={`flex-1 text-[13px] font-light transition-colors duration-150
                      ${isSelected ? "text-[#e2e2ee]" : "text-[#c0c0d8]"}`}
                  >
                    {task.title}
                  </span>

                  {/* Priority badge */}
                  <span
                    className="font-mono text-[9px] tracking-[2px]"
                    style={{ color: priorityColor[task.priority] }}
                  >
                    {task.priority}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between"
        >
          <p className="font-mono text-[9px] tracking-[3px] text-[#3a3a52] uppercase">
            {selected.length < 3
              ? `Select ${3 - selected.length} more`
              : "Ready to focus"}
          </p>
          <button
            onClick={() => selected.length === 3 && navigate("/")}
            disabled={selected.length !== 3}
            className={`font-mono text-[9px] tracking-[4px] uppercase px-6 py-3 rounded-md border transition-all duration-150
              ${
                selected.length === 3
                  ? "text-[#a78bfa] border-[#a78bfa44] bg-[#a78bfa0f] hover:border-[#a78bfa88] hover:bg-[#a78bfa1a] cursor-pointer"
                  : "text-[#3a3a52] border-[#1a1a26] bg-transparent cursor-not-allowed"
              }`}
          >
            Start day →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
