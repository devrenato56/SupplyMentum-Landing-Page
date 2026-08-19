import Link from "next/link";
import {
    ArrowRight,
    BriefcaseBusiness,
    CalendarDays,
    CircleUserRound,
    FileUser,
    Network,
} from "lucide-react";

import PageHeader from "@/components/cms/PageHeader";
import StatCard from "@/components/cms/StatCard";

const recentActions = [
    {
        id: 1,
        title: "Directivos",
        description: "Gestión de integrantes visibles en la organización.",
        href: "/admin/executives",
    },
    {
        id: 2,
        title: "Eventos",
        description: "Administración de eventos y publicaciones.",
        href: "/admin/events",
    },
    {
        id: 3,
        title: "Proyectos",
        description: "Gestión del portafolio de proyectos.",
        href: "/admin/projects",
    },
];

export default function AdminDashboardPage() {
    return (
        <>
            <PageHeader
                eyebrow="Panel administrativo"
                title="Dashboard"
                description="Administra el contenido público de SupplyMentum desde un único panel."
            />

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Áreas"
                    value="—"
                    detail="Áreas registradas"
                    icon={Network}
                    href="/admin/areas"
                />

                <StatCard
                    label="Directivos"
                    value="—"
                    detail="Miembros de dirección"
                    icon={CircleUserRound}
                    href="/admin/executives"
                />

                <StatCard
                    label="Eventos"
                    value="—"
                    detail="Eventos registrados"
                    icon={CalendarDays}
                    href="/admin/events"
                />

                <StatCard
                    label="Proyectos"
                    value="—"
                    detail="Proyectos registrados"
                    icon={BriefcaseBusiness}
                    href="/admin/projects"
                />
            </section>

            <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="border border-[#22222A] bg-[#111115]">
                    <div className="flex items-center justify-between border-b border-[#22222A] px-5 py-4 sm:px-6">
                        <div>
                            <p className="font-[family-name:var(--font-archivo)] text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                                Acceso rápido
                            </p>

                            <h2 className="mt-1 text-base font-semibold text-zinc-200">
                                Gestión de contenido
                            </h2>
                        </div>
                    </div>

                    <div className="divide-y divide-[#22222A]">
                        {recentActions.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="group flex items-center justify-between gap-5 px-5 py-5 transition-colors hover:bg-white/[0.02] sm:px-6"
                            >
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-200 transition-colors group-hover:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                                        {item.description}
                                    </p>
                                </div>

                                <ArrowRight
                                    size={17}
                                    className="shrink-0 text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-[#ED1C24]"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="border border-[#22222A] bg-[#111115]">
                    <div className="border-b border-[#22222A] px-5 py-4">
                        <p className="font-[family-name:var(--font-archivo)] text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                            Estado
                        </p>

                        <h2 className="mt-1 text-base font-semibold text-zinc-200">
                            Sistema
                        </h2>
                    </div>

                    <div className="space-y-5 p-5">
                        <SystemStatus
                            label="Backend CMS"
                            value="Pendiente de integración"
                        />

                        <SystemStatus
                            label="Autenticación"
                            value="Pendiente de integración"
                        />

                        <SystemStatus
                            label="Supabase Storage"
                            value="Configurado en backend"
                        />
                    </div>
                </div>
            </section>

            <section className="mt-6 border border-[#22222A] bg-[#0D0D10] px-5 py-5 sm:px-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#292930]">
                            <FileUser
                                size={18}
                                className="text-[#FFBD59]"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-zinc-300">
                                Convocatorias
                            </p>

                            <p className="mt-1 text-xs leading-5 text-zinc-600">
                                Revisa y administra las postulaciones recibidas.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/admin/applications"
                        className="inline-flex h-10 items-center justify-center border border-[#313138] px-4 font-[family-name:var(--font-archivo)] text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
                    >
                        Ver módulo
                    </Link>
                </div>
            </section>
        </>
    );
}

interface SystemStatusProps {
    label: string;
    value: string;
}

function SystemStatus({
    label,
    value,
}: SystemStatusProps) {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-xs text-zinc-500">
                    {label}
                </span>

                <span className="h-2 w-2 shrink-0 bg-[#FFBD59]" />
            </div>

            <p className="text-xs text-zinc-700">
                {value}
            </p>
        </div>
    );
}