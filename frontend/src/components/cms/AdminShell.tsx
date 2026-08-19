"use client";

import { useState } from "react";
import AdminHeader from "../cms/AdminHeader";
import AdminSidebar from "../cms/AdminSidebar";

interface AdminShellProps {
    children: React.ReactNode;
}

export default function AdminShell({
    children,
}: AdminShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#070709] text-zinc-100">
            <AdminSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:pl-[260px]">
                <AdminHeader
                    onOpenSidebar={() => setSidebarOpen(true)}
                />

                <main className="min-h-[calc(100vh-72px)]">
                    <div className="mx-auto w-full max-w-[1600px] px-5 py-7 sm:px-7 lg:px-10 lg:py-9">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}