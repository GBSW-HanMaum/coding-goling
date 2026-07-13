import { BookOpen, LogOut, ShoppingBag, Target, Trophy, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useAuth } from "@/store/useAuth";

import { Mascot } from "./Mascot";
import { buttonVariants } from "./ui/Button";

export const NAV_ITEMS = [
  { label: "학습", href: "/learn", icon: BookOpen },
  { label: "리더보드", href: "/leaderboard", icon: Trophy },
  { label: "퀘스트", href: "/quests", icon: Target },
  { label: "상점", href: "/shop", icon: ShoppingBag },
  { label: "프로필", href: "/profile", icon: User },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
  <div className="fixed left-0 top-0 z-40 hidden h-full w-[256px] flex-col border-r-2 border-swan bg-white px-4 lg:flex">
    <Link to="/learn" className="flex items-center gap-x-2 pb-7 pl-2 pt-7">
      <Mascot size={40} />
      <h1 className="text-2xl font-extrabold tracking-tight text-coral">
        코드런
      </h1>
    </Link>

    <div className="flex flex-1 flex-col gap-y-1.5">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
        <NavLink
          key={href}
          to={href}
          className={({ isActive }) =>
            cn(
              buttonVariants({
                variant: isActive ? "sidebarActive" : "sidebar",
              }),
              "h-[52px] justify-start"
            )
          }
        >
          <Icon className="mr-4 h-7 w-7" />
          {label}
        </NavLink>
      ))}
    </div>

    <div className="flex items-center gap-x-3 border-t-2 border-swan py-4 pl-1">
      <Link
        to="/profile"
        className="flex min-w-0 flex-1 items-center gap-x-3 rounded-xl p-1 transition hover:bg-polar"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-macaw-light text-lg">
          🧑‍💻
        </div>
        <span className="truncate text-sm font-bold text-wolf">
          {user?.nickname ?? "게스트"}
        </span>
      </Link>
      <button
        onClick={onLogout}
        title="로그아웃"
        aria-label="로그아웃"
        className="rounded-lg p-2 text-hare transition hover:bg-polar hover:text-cardinal"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  </div>
  );
};
