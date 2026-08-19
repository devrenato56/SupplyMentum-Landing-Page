"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Boxes,
    BriefcaseBusiness,
    CalendarDays,
    ChevronRight,
    CircleUserRound,
    FileUser,
    Images,
    LayoutDashboard,
    LogOut,
    Network,
    PanelLeftClose,
    X,
} from "lucide-react";

interface AdminSidebarProps {
    open: boolean;
    onClose: () => void;
}

interface SidebarItem {
    label: string;
    href: string;
    icon: React.ComponentType<{
        size?: number;
        strokeWidth?: number;
        className?: string;
    }>;
}

const navigationGroups: {
    label: string;
    items: SidebarItem[];
}[] = [
        {
            label: "General",
            items: [
                {
                    label: "Dashboard",
                    href: "/admin",
                    icon: LayoutDashboard,
                },
            ],
        },
        {
            label: "Contenido",
            items: [
                {
                    label: "Áreas",
                    href: "/admin/areas",
                    icon: Network,
                },
                {
                    label: "Directivos",
                    href: "/admin/executives",
                    icon: CircleUserRound,
                },
                {
                    label: "Eventos",
                    href: "/admin/events",
                    icon: CalendarDays,
                },
                {
                    label: "Proyectos",
                    href: "/admin/projects",
                    icon: BriefcaseBusiness,
                },
            ],
        },
        {
            label: "Gestión",
            items: [
                {
                    label: "Convocatorias",
                    href: "/admin/applications",
                    icon: FileUser,
                },
                {
                    label: "Multimedia",
                    href: "/admin/media",
                    icon: Images,
                },
            ],
        },
    ];

export default function AdminSidebar({
    open,
    onClose,
}: AdminSidebarProps) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/admin") {
            return pathname === "/admin";
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Cerrar menú"
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px] lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
          fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col
          border-r border-[#22222A] bg-[#0A0A0D]
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="flex h-[72px] items-center justify-between border-b border-[#22222A] px-5">
                    <Link
                        href="/admin"
                        onClick={onClose}
                        className="flex min-w-0 items-center gap-3"
                    >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#2A2A31] bg-[#111115]">
                            <Boxes
                                size={18}
                                strokeWidth={1.8}
                                className="text-[#ED1C24]"
                            />
                        </div>

                        <div className="min-w-0">
                            <Image
                                src="/logo.png"
                                alt="SupplyMentum"
                                width={894}
                                height={226}
                                priority
                                className="h-6 w-auto object-contain"
                            />

                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.26em] text-zinc-600">
                                Content Management
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-zinc-500 transition-colors hover:text-white lg:hidden"
                        aria-label="Cerrar menú"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-5">
                    {navigationGroups.map((group) => (
                        <div
                            key={group.label}
                            className="mb-7"
                        >
                            <p className="mb-2 px-3 font-[family-name:var(--font-archivo)] text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-600">
                                {group.label}
                            </p>

                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={onClose}
                                            className={`
                        group relative flex h-11 items-center gap-3 px-3
                        font-[family-name:var(--font-archivo)]
                        text-[12px] font-semibold uppercase tracking-[0.08em]
                        transition-colors
                        ${active
                                                    ? "bg-[#ED1C24]/10 text-white"
                                                    : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-200"
                                                }
                      `}
                                        >
                                            {active && (
                                                <span className="absolute inset-y-0 left-0 w-[2px] bg-[#ED1C24]" />
                                            )}

                                            <Icon
                                                size={17}
                                                strokeWidth={1.8}
                                                className={
                                                    active
                                                        ? "text-[#ED1C24]"
                                                        : "text-zinc-600 transition-colors group-hover:text-zinc-400"
                                                }
                                            />

                                            <span className="flex-1">
                                                {item.label}
                                            </span>

                                            {active && (
                                                <ChevronRight
                                                    size={14}
                                                    className="text-[#ED1C24]"
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="border-t border-[#22222A] p-3">
                    <Link
                        href="/"
                        className="flex h-11 items-center gap-3 px-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-zinc-500 transition-colors hover:bg-white/[0.03] hover:text-white"
                    >
                        <PanelLeftClose
                            size={17}
                            strokeWidth={1.8}
                        />

                        Ver sitio
                    </Link>

                    <button
                        type="button"
                        className="flex h-11 w-full items-center gap-3 px-3 text-left text-[12px] font-semibold uppercase tracking-[0.08em] text-zinc-500 transition-colors hover:bg-red-950/20 hover:text-red-400"
                    >
                        <LogOut
                            size={17}
                            strokeWidth={1.8}
                        />

                        Cerrar sesión
                    </button>
                </div>
            </aside>
        </>
    );
}