import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
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
