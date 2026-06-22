import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutGrid,
  CalendarDays,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Implement HTTP request parser",
    priority: "P0",
    done: false,
  },
  { id: 2, title: "Solve binary search problems", priority: "P1", done: false },
  { id: 3, title: "Read Go scheduler article", priority: "P2", done: false },
];

const priorityColor: Record<string, string> = {
  P0: "text-[#f87171]",
  P1: "text-[#fbbf24]",
  P2: "text-[#60a5fa]",
};

const priorityBg: Record<string, string> = {
  P0: "bg-[#f87171]",
  P1: "bg-[#fbbf24]",
  P2: "bg-[#60a5fa]",
};

const NAV = [
  { to: "/tasks", label: "Tasks", showBadge: true, icon: LayoutGrid },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/Dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const SYSTEM = [{ to: "/settings", label: "Settings", icon: Settings }];

const activeClass =
  "relative text-[#e2e2ee] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-[#a78bfa] before:rounded-r";
const inactiveClass =
  "text-[#6e6e90] hover:text-[#c0c0d8] hover:bg-white/[0.02]";
const baseClass =
  "flex items-center gap-3 px-[22px] py-2.5 font-mono text-[10px] tracking-[3px] uppercase transition-all duration-150";

export default function Sidebar() {
  const [tasks, setTasks] = useState(initialTasks);
  const done = tasks.filter((t) => t.done).length;
  const progress = tasks.length > 0 ? (done / tasks.length) * 100 : 0;
  const toggleTask = (id: number) =>
    setTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  return (
    <aside className="flex h-screen w-[220px] flex-shrink-0 flex-col border-r border-[#1a1a26] bg-[#0d0d12]">
      {/* Brand */}
      <div className="border-b border-[#1a1a26] px-[22px] py-6">
        <h2
          className="italic leading-none text-[#e2e2ee]"
          style={{
            fontFamily: "Instrument Serif",
            fontSize: "1.4rem",
            letterSpacing: "-0.5px",
          }}
        >
          Ryoku
        </h2>
        <span className="mt-1.5 block font-mono text-[8px] tracking-[4px] text-[#6e6e90] uppercase">
          Focus system
        </span>
      </div>

      {/* Nav */}
      <nav className="pt-1">
        <p className="px-[22px] pb-1.5 pt-4 font-mono text-[8px] tracking-[4px] text-[#3d3d5c] uppercase">
          Workspace
        </p>
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <Icon size={14} className="opacity-55 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.showBadge && tasks.filter((t) => !t.done).length > 0 && (
                <span className="rounded-sm bg-[#f87171]/10 px-1.5 py-0.5 font-mono text-[8px] tracking-[1px] text-[#f87171]">
                  {tasks.filter((t) => !t.done).length}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="mx-[22px] my-2.5 h-px bg-[#1a1a26]" />

        <p className="px-[22px] pb-1.5 pt-1 font-mono text-[8px] tracking-[4px] text-[#3d3d5c] uppercase">
          System
        </p>
        {SYSTEM.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <Icon size={14} className="opacity-55 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-[22px] mt-5 h-px bg-[#1a1a26]" />

      {/* Today's Focus */}
      <div className="flex flex-1 flex-col overflow-hidden px-[22px] pt-4">
        <p className="mb-3 font-mono text-[8px] tracking-[4px] text-[#3d3d5c] uppercase">
          Today's focus
        </p>
        <div className="flex flex-col">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="group flex cursor-pointer items-start gap-3 border-b border-[#13131a] py-2.5 last:border-0"
            >
              {/* Checkbox */}
              <div
                className={`mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-sm border transition-all
                  ${task.done ? "border-[#a78bfa55] bg-[#a78bfa18]" : "border-[#2a2a3c] group-hover:border-[#3d3d5c]"}`}
              >
                {task.done && (
                  <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                    <path
                      d="M1 2.5L2.5 4L6 1"
                      stroke="#a78bfa"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span
                  className={`text-[11px] leading-snug transition-all
                    ${task.done ? "text-[#3d3d5c] line-through" : "text-[#c0c0d8] group-hover:text-[#e2e2ee]"}`}
                  style={{ fontFamily: "sans-serif", fontWeight: 300 }}
                >
                  {task.title}
                </span>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`h-1 w-1 rounded-full ${priorityBg[task.priority]}`}
                  />
                  <span
                    className={`font-mono text-[8px] tracking-[1px] ${priorityColor[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#1a1a26] px-[22px] py-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
            <span className="font-mono text-[8px] tracking-[3px] text-[#6e6e90] uppercase">
              Active
            </span>
          </div>
          <span
            className="italic text-[#a78bfa]"
            style={{ fontFamily: "Instrument Serif", fontSize: "0.95rem" }}
          >
            {done} / {tasks.length}
          </span>
        </div>
        <div className="h-px overflow-hidden rounded-full bg-[#1a1a26]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#a78bfa] to-[#7c5ccf] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
