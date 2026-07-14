import { Link, NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

import { Mascot } from "./Mascot";
import { NAV_ITEMS } from "./Sidebar";
import { UserProgress } from "./UserProgress";

/** 모바일: 상단 로고+스탯, 하단 탭바 (lg 미만에서만 노출) */
export const MobileTopbar = () => (
  <nav className="fixed left-0 right-0 top-0 z-40 flex h-[56px] items-center justify-between border-b-2 border-swan bg-white px-4 lg:hidden">
    <Link to="/learn" className="flex items-center gap-x-2">
      <Mascot size={30} />
      <span className="text-lg font-extrabold text-coral">코딩고링</span>
    </Link>
    <div className="scale-90">
      <UserProgress />
    </div>
  </nav>
);

export const MobileTabbar = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[64px] items-stretch border-t-2 border-swan bg-white lg:hidden">
    {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
      <NavLink
        key={href}
        to={href}
        className={({ isActive }) =>
          cn(
            "flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-bold",
            isActive ? "text-coral" : "text-hare"
          )
        }
      >
        <Icon className="h-6 w-6" />
        {label}
      </NavLink>
    ))}
  </nav>
);
