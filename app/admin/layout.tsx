"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { logoutAction } from "./login/actions";
import { BookOpenIcon, HomeIcon, ShoppingBagIcon, PlayIcon, UsersIcon, FileTextIcon, ImageIcon, SettingsIcon, LogOutIcon, Info as InfoIcon, BookIcon } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await logoutAction();
        localStorage.removeItem("admin_auth");
        window.location.href = "/admin/login";
    };

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-zinc-50 text-zinc-900 selection:bg-primary selection:text-white">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white transition-transform md:translate-x-0">
                <div className="flex h-full flex-col px-4 py-6">
                    {/* Branding */}
                    <Link href="/" className="mb-10 flex items-center gap-3 px-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 text-white">
                            <BookOpenIcon size={24} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black uppercase tracking-tighter text-zinc-900 leading-none">
                                Kafundisha
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                                Workspace
                            </span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        <SidebarItem href="/admin" icon={<HomeIcon size={18} />} label="Dashboard" active={pathname === "/admin"} />
                        <SidebarItem href="/admin/products" icon={<ShoppingBagIcon size={18} />} label="Products" active={pathname.startsWith("/admin/products")} />
                        <SidebarItem href="/admin/stories" icon={<PlayIcon size={18} />} label="Stories & Media" active={pathname.startsWith("/admin/stories")} />
                        <SidebarItem href="/admin/ebooks" icon={<BookIcon size={18} />} label="eBooks" active={pathname.startsWith("/admin/ebooks")} />
                        <SidebarItem href="/admin/teachers" icon={<UsersIcon size={18} />} label="Teachers & Partners" active={pathname.startsWith("/admin/teachers")} />
                        <SidebarItem href="/admin/pages" icon={<FileTextIcon size={18} />} label="Pages Editor" active={pathname.startsWith("/admin/pages")} />
                        <SidebarItem href="/admin/media" icon={<ImageIcon size={18} />} label="Media Library" active={pathname.startsWith("/admin/media")} />
                        <SidebarItem href="/admin/help" icon={<InfoIcon size={18} />} label="Help Hub" active={pathname === "/admin/help"} />
                    </nav>

                    {/* Bottom Actions */}
                    <div className="mt-auto pt-6 border-t border-zinc-100 space-y-1">
                        <SidebarItem href="/admin/settings" icon={<SettingsIcon size={18} />} label="Site Settings" />
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-xs font-black uppercase tracking-widest transition-all text-zinc-400 hover:bg-red-50 hover:text-red-500"
                        >
                            <LogOutIcon size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64">
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-black uppercase tracking-tighter text-zinc-900">Control Center</h1>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-green-600">
                            Live
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-900">Kafundisha Admin</p>
                            <p className="text-[10px] font-medium text-zinc-500">Brand Manager</p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xs">
                            KB
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

function SidebarItem({ href, icon, label, active = false, danger = false }: any) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-xs font-black uppercase tracking-widest transition-all ${active
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : danger
                    ? "text-zinc-400 hover:bg-red-50 hover:text-red-500"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-primary"
                }`}
        >
            <span className="shrink-0">{icon}</span>
            <span>{label}</span>
            {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white shadow-sm" />}
        </Link>
    );
}
