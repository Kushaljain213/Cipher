import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as motion from "motion/react-client";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState("");
  const [dateLine, setDateLine] = useState("");
  const [sessionCount] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setReady(true);
    v.addEventListener("canplay", onReady);
    return () => v.removeEventListener("canplay", onReady);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      setDateLine(
        `${days[now.getDay()]} · ${months[now.getMonth()]} ${now.getDate()}`,
      );
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  const tasks = [
    { title: "Implement HTTP request parser", priority: "P0" },
    { title: "Solve binary search problems", priority: "P1" },
    { title: "Read Go scheduler article", priority: "P2" },
  ];

  const priorityDot: Record<string, string> = {
    P0: "bg-[#f87171]",
    P1: "bg-[#fbbf24]",
    P2: "bg-[#60a5fa]",
  };
  const priorityText: Record<string, string> = {
    P0: "text-[#f87171]",
    P1: "text-[#fbbf24]",
    P2: "text-[#60a5fa]",
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const fade = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#070709] text-[#e2e2ee]">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-60" : "opacity-0"
        }`}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, transparent 30%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── TOP LEFT: Wordmark ── */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="absolute top-9 left-10 z-10"
      >
        <h1
          className="italic leading-none"
          style={{
            fontFamily: "Instrument Serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            letterSpacing: "-1.5px",
          }}
        >
          Ryoku
        </h1>
        <p className="mt-1.5 font-mono text-[9px] tracking-[4px] text-[#6e6e90] uppercase">
          Focus system
        </p>
      </motion.div>

      {/* ── TOP RIGHT: Clock ── */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        style={{ animationDelay: "0.1s" }}
        className="absolute top-9 right-10 z-10 text-right"
      >
        <div
          className="leading-none"
          style={{
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            letterSpacing: "-1px",
          }}
        >
          {time}
        </div>
        <p className="mt-1.5 font-mono text-[9px] tracking-[3px] text-[#6e6e90] uppercase">
          {dateLine}
        </p>
      </motion.div>

      {/* ── BOTTOM LEFT: Tasks ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="absolute bottom-9 left-10 z-10 w-[300px] space-y-2"
      >
        <motion.p
          variants={fade}
          className="mb-2.5 font-mono text-[9px] tracking-[4px] text-[#6e6e90] uppercase"
        >
          Today's focus
        </motion.p>

        {tasks.map((task, i) => (
          <motion.div
            key={i}
            variants={fade}
            className="flex items-center gap-2.5 rounded-md border border-[#1a1a26] bg-[#0d0d12]/90 px-3.5 py-2.5 backdrop-blur-sm transition hover:border-[#2d2d45]"
          >
            <div
              className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${priorityDot[task.priority]}`}
            />
            <span className="flex-1 text-[12px] font-light text-[#c0c0d8]">
              {task.title}
            </span>
            <span
              className={`font-mono text-[9px] tracking-[2px] ${priorityText[task.priority]}`}
            >
              {task.priority}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── BOTTOM CENTER: Status strip ── */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4"
      >
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-[#34d399]" />
          <span className="font-mono text-[9px] tracking-[3px] text-[#6e6e90] uppercase">
            Active
          </span>
        </div>
        <div className="h-3 w-px bg-[#1a1a26]" />
        <span className="font-mono text-[9px] tracking-[3px] text-[#6e6e90] uppercase">
          {tasks.length} tasks · 0 done
        </span>
      </motion.div>

      {/* ── BOTTOM RIGHT: Session count + CTA ── */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="absolute bottom-9 right-10 z-10 flex flex-col items-end gap-3"
      >
        <div className="text-right">
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: "1.8rem",
              color: "#a78bfa",
              lineHeight: 1,
            }}
          >
            {sessionCount}
          </div>
          <p className="mt-1 font-mono text-[9px] tracking-[3px] text-[#6e6e90] uppercase">
            Sessions today
          </p>
        </div>

        <Link
          to="/tasks"
          className="flex items-center gap-2 rounded-md border border-[#a78bfa44] bg-[#a78bfa14] px-5 py-2.5 font-mono text-[10px] tracking-[4px] text-[#a78bfa] uppercase transition hover:border-[#a78bfa88] hover:bg-[#a78bfa22]"
        >
          Enter session <span className="opacity-70">→</span>
        </Link>
      </motion.div>
    </div>
  );
}
