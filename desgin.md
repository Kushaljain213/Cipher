# Ryoku — Focus Execution System

A minimal productivity system designed to eliminate decision paralysis and force execution.

The system intentionally limits visible tasks and enforces focus sessions to reduce cognitive overload and procrastination.

---

# Core Concept

The application separates tasks into **two layers**.

| Layer       | Purpose                              |
| ----------- | ------------------------------------ |
| Task Pool   | All tasks the user wants to complete |
| Focus Tasks | The 3 tasks selected for today       |

The homepage **never shows the full task pool**.
It only shows **today’s three focus tasks**.

This reduces decision fatigue and prevents task overload.

---

# High-Level Flow

```
Capture tasks
↓
Morning planning
↓
Choose 3 focus tasks
↓
Focus session timer
↓
Complete task
↓
Stats update
```

This loop repeats daily.

---

# Application Screens

The system contains four primary screens.

| Screen     | Purpose                       |
| ---------- | ----------------------------- |
| Inbox      | Capture and manage all tasks  |
| Planner    | Select today's focus tasks    |
| Home       | Display today's 3 focus tasks |
| Focus Mode | Run the timer for a task      |

---

# 1. Inbox (Task Pool)

The inbox stores all tasks.

Example UI:

```
Tasks

[ + Add Task ]

P0  Implement HTTP request parser
P1  Solve binary search problems
P1  Read Go scheduler article
P2  Fix portfolio website
P3  Explore Rust async runtime
```

Task fields:

```
Title
Priority
Estimated Time
```

Priority levels:

```
P0 — Critical
P1 — Important
P2 — Normal
P3 — Low
```

Sorting order:

```
priority ASC
created_at ASC
```

---

# 2. Morning Planner (Hybrid Selection)

At the beginning of the day, the system suggests tasks based on priority.

Example UI:

```
Plan Today

Suggested Tasks

☑ P0 Implement HTTP request parser
☑ P1 Solve binary search problems
☑ P1 Read Go scheduler article
☐ P2 Fix portfolio website
☐ P3 Explore Rust async runtime

Select 3 tasks

[ Start Day ]
```

Rules:

```
Maximum selections = 3
```

After confirmation:

```
Focus tasks are locked for the day
```

Additional tasks cannot be added until one is completed.

---

# 3. Home (Focus Dashboard)

The homepage shows **only the three focus tasks**.

Example UI:

```
RYOKU

Today's Focus

[P0] Implement HTTP request parser
[Start]

[P1] Solve binary search problems
[Start]

[P1] Read Go scheduler article
[Start]

Focus today: 1h 40m
Sessions: 3
Streak: 4 days
```

No other tasks are visible.

---

# 4. Focus Mode

When a focus session begins:

```
Implement HTTP request parser

44:59
```

Available actions:

```
Complete
Quit
```

After completion:

```
Task Completed

Focus today: 2h
Sessions: 4
```

The user returns to the homepage.

---

# System Rules

The system enforces several constraints:

```
Maximum focus tasks = 3
Task duration = 20–60 minutes
Priority determines suggested tasks
Focus sessions run one task at a time
```

Constraints reduce cognitive overload.

---

# Database Design

Minimal schema.

## tasks

```
id
title
priority
estimated_minutes
created_at
completed
```

## focus_tasks

```
id
task_id
date
completed
```

## sessions

```
id
task_id
start_time
end_time
completed
```

---

# Backend Functions (Go)

Wails backend should expose:

```
CreateTask()
GetTasks()
GetSuggestedTasks()

StartFocusSession(taskID)
CompleteFocusSession(sessionID)

GetTodayFocusTasks()
SetFocusTasks(taskIDs)

GetStats()
```

---

# React Component Structure

```
src
 ├ pages
 │  ├ Home.tsx
 │  ├ Planner.tsx
 │  └ Tasks.tsx
 │
 ├ components
 │  ├ TaskItem.tsx
 │  ├ FocusCard.tsx
 │  ├ Timer.tsx
 │  └ StatsBar.tsx
```

Navigation flow:

```
Planner → Home → FocusSession → Home
```

---

# Priority Badge Design

Visual indicators:

```
P0 → Red
P1 → Orange
P2 → Blue
P3 → Gray
```

Color helps the brain process priority quickly.

---

# Daily Loop

Each day follows the same process:

```
Open app
↓
Planner suggests tasks
↓
User selects 3 tasks
↓
Focus sessions
↓
Stats update
↓
Repeat next day
```

---

# Version Roadmap

The system should be implemented incrementally.

## v1

```
Hardcoded tasks
Focus timer
Complete task
```

## v2

```
Task storage
Priority system
Planner screen
```

## v3

```
Statistics
Focus streaks
Session history
```

Building everything at once increases the risk of project failure.

---

# Design Philosophy

Most productivity systems fail due to information overload.

Typical mental environment:

```
CP
Go backend
Rust
Systems design
Projects
Internships
Resume
Research papers
```

The system reduces this complexity to:

```
Do these 3 things today.
```

Simple constraints produce reliable execution.
