'use client'
import LeftSidebar from "@/components/Left_sidebar";
import MainSidebar from "@/components/Main_Sidebar";
import Right_SideBar from "@/components/Right_SideBar";

export default function Home() {
  return (
    <div className="h-screen flex bg-black text-white">
      <LeftSidebar />

      <MainSidebar />

      <Right_SideBar />
    </div>
  );
}
