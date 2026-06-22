import { HashRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/home";
import Planner from "./pages/identity";
import Task from "./pages/task";
import Layout from "./components/layout";
import Dashboard from "./pages/main";
import Settings from "./pages/settings";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/tasks" element={<Task />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
