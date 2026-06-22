import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#070709] text-[#e2e2ee]">
      <Sidebar />

      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
