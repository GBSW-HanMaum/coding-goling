import { Outlet } from "react-router-dom";

import { EnergyToast } from "./EnergyToast";
import { MobileTabbar, MobileTopbar } from "./MobileNav";
import { Sidebar } from "./Sidebar";

export const StickyWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="hidden w-[368px] shrink-0 lg:block">
    <div className="sticky top-6 flex flex-col gap-y-4">{children}</div>
  </div>
);

export const FeedWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex-1 pb-10">{children}</div>
);

export const MainLayout = () => (
  <>
    <EnergyToast />
    <Sidebar />
    <MobileTopbar />
    <main className="h-full px-4 pb-[80px] pt-[68px] lg:px-6 lg:pb-0 lg:pl-[280px] lg:pt-6">
      <div className="mx-auto h-full max-w-[1056px]">
        <Outlet />
      </div>
    </main>
    <MobileTabbar />
  </>
);
