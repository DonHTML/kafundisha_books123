"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import bcrypt from "bcryptjs";

async function verifyAuthAndGetClient() {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_session")?.value !== "authenticated") {
        throw new Error("Unauthorized request. Please log in.");
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey || serviceKey === 'your_service_role_key_here') {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing from environment variables.");
    }

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll() { },
            },
        }
    );
}

// === Teachers ===
export async function deleteTeacherRequestAction(id: string) {
    try {
        const supabase = await verifyAuthAndGetClient();
        const { error } = await supabase.from('teacher_requests').delete().eq('id', id);
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function getTeacherRequestsAction() {
    try {
        const supabase = await verifyAuthAndGetClient();
        const { data, error } = await supabase
            .from('teacher_requests')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return { success: true, data };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

// === Stories ===
export async function deleteStoryAction(id: string) {
    try {
        const supabase = await verifyAuthAndGetClient();
        const { error } = await supabase.from('stories').delete().eq('id', id);
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function insertStoryAction(data: any) {
    try {
        const supabase = await verifyAuthAndGetClient();
        const { error } = await supabase.from('stories').insert([data]);
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function updateStoryAction(id: string, data: any) {
    try {
        const supabase = await verifyAuthAndGetClient();
        const { error } = await supabase.from('stories').update(data).eq('id', id);
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

// === Products / eBooks ===
export async function deleteProductAction(id: string) {
    try {
        const supabase = await verifyAuthAndGetClient();
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function insertProductAction(data: any) {
    try {
        const supabase = await verifyAuthAndGetClient();
        const { error } = await supabase.from('products').insert([data]);
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function updateProductAction(id: string, data: any) {
    try {
        const supabase = await verifyAuthAndGetClient();
        const { error } = await supabase.from('products').update(data).eq('id', id);
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

// === Settings ===
export async function upsertSiteSettingsAction(config_key: string, config_value: any) {
    try {
        const supabase = await verifyAuthAndGetClient();
        const { error } = await supabase
            .from('site_settings')
            .update({ config_value })
            .eq('config_key', config_key)
            .select();
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function updateAdminKeyAction(newKey: string) {
    try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
        if (!url || !key) return { success: false, error: "Missing config: " + [url, key].join(',') };

        const supabase = await verifyAuthAndGetClient();
        const hashedKey = await bcrypt.hash(newKey, 10);

        const { error } = await supabase
            .from('site_settings')
            .update({ config_value: { hash: hashedKey } })
            .eq('config_key', 'admin_access_key')
            .select();

        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        console.error("Update admin action failed:", err);
        return { success: false, error: err.message };
    }
}

// === Dashboard Fetching ===
export async function getAdminDashboardStatsAction() {
    try {
        const supabase = await verifyAuthAndGetClient();

        const { count: products } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });

        const { count: stories } = await supabase
            .from('stories')
            .select('*', { count: 'exact', head: true });

        const { count: requests } = await supabase
            .from('teacher_requests')
            .select('*', { count: 'exact', head: true });

        const { data: visitsData } = await supabase
            .from('site_settings')
            .select('config_value')
            .eq('config_key', 'store_visits')
            .single();

        return {
            success: true,
            data: {
                products: products || 0,
                stories: stories || 0,
                requests: requests || 0,
                visits: visitsData?.config_value?.count || 0
            }
        };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}
