"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/admin/login/actions";

export default function StaffLink() {
    const router = useRouter();

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        // Force logout so it always asks for the password
        await logoutAction();
        localStorage.removeItem("admin_auth");
        window.location.href = "/admin/login";
    };

    return (
        <button
            onClick={handleClick}
            className="rounded px-2 py-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-all opacity-50 hover:opacity-100 text-[10px] cursor-pointer"
        >
            Staff
        </button>
    );
}
