"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
//import { useIsFetching, useIsMutating } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  // const isFetching = useIsFetching() > 0;
  // const isMutating = useIsMutating() > 0;
  // const isLoading = isFetching || isMutating;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar on the left */}
        <DashboardSidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-1">
          <DashboardNavbar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>

      {/* Global Loader
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )} */}
    </SidebarProvider>
  );
};

export default Layout;

// const Layout = ({ children }: Props) => {
//   return (
//     <SidebarProvider>
//       <DashboardSidebar/>
//       <main>
//         <DashboardNavbar/>
//         {children}
//       </main>
//     </SidebarProvider>
//   );
// };
