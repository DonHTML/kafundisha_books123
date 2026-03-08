"use client";

import { useState, useEffect } from "react";
import {
    UsersIcon,
    MessageSquareIcon,
    DownloadIcon,
    SearchIcon,
    FilterIcon,
    MapPinIcon,
    PhoneIcon,
    CalendarIcon,
    MoreVerticalIcon,
    CheckCircle2Icon,
    Trash2Icon
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { deleteTeacherRequestAction, getTeacherRequestsAction } from "../actions";

export default function TeachersPartners() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const result = await getTeacherRequestsAction();

            if (!result.success) throw new Error(result.error);
            setRequests(result.data || []);
        } catch (err) {
            console.error("Error fetching requests:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Remove this request from the queue?")) return;
        try {
            const result = await deleteTeacherRequestAction(id);
            if (!result.success) throw new Error(result.error);
            fetchRequests();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                            Teachers & <span className="text-primary italic">Partners</span>
                        </h1>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            No requests or applications recorded yet
                        </p>
                    </div>
                </div>

                <div className="rounded-[3rem] border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-20 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl shadow-zinc-200/50 mb-8">
                        <UsersIcon className="text-zinc-200" size={40} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900">Queue is Empty</h3>
                    <p className="mx-auto max-w-xs text-sm font-medium text-zinc-500 mt-2 capitalize leading-relaxed">
                        When teachers or schools reach out through the website, their details will appear here automatically.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                        Teachers & <span className="text-primary italic">Partners</span>
                    </h1>
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                        Manage bulk buyers, schools, and local distributors
                    </p>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-primary transition-all shadow-lg shadow-zinc-900/10">
                    <DownloadIcon size={18} />
                    Export to Excel
                </button>
            </div>

            {/* List Overview */}
            <div className="overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-sm">
                <div className="p-8 border-b border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            className="w-full rounded-xl bg-zinc-50 border-none pl-12 pr-4 py-3 text-sm font-bold placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mr-2">Sort by: Date</span>
                        <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-400 hover:bg-zinc-50 transition-all">
                            <FilterIcon size={18} />
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-zinc-50">
                    {requests.map((request) => (
                        <div key={request.id} className="group p-8 hover:bg-zinc-50/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900">{request.name}</h3>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${request.status === 'New'
                                        ? 'bg-orange-500 text-white'
                                        : request.status === 'Contacted'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-green-500 text-white'
                                        }`}>
                                        {request.status}
                                    </span>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                        <UsersIcon size={14} className="text-zinc-400" />
                                        {request.school}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                        <MapPinIcon size={14} className="text-zinc-400" />
                                        {request.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                        <PhoneIcon size={14} className="text-zinc-400" />
                                        {request.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                        <CalendarIcon size={14} className="text-zinc-400" />
                                        {new Date(request.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                    {request.interest}
                                </span>
                                <a
                                    href={`https://wa.me/${request.phone.replace(/[^0-9]/g, '')}?text=Hi ${request.name}, this is Kafundisha Books regarding your interest in ${request.interest}.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary transition-all shadow-lg shadow-zinc-900/10"
                                >
                                    <MessageSquareIcon size={14} />
                                    WhatsApp Reply
                                </a>
                                <button onClick={() => handleDelete(request.id)} className="h-11 w-11 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-500 transition-all">
                                    <Trash2Icon size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
