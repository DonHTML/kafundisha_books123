"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

async function verifyAuthAndGetClient() {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_session")?.value !== "authenticated") {
        throw new Error("Unauthorized request. Please log in.");
    }

    // IMPORTANT: service role key, not the anon key. This bypasses RLS,
    // which is correct here BECAUSE the cookie check above already gated
    // access. This also means RLS on products/stories/teacher_requests/
    // site_settings can (and should) now be locked down to deny anon
    // writes entirely — these actions no longer depend on anon having
    // elevated permissions.
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
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

        // Belt-and-suspenders: never let the generic settings upsert be used
        // to touch the admin password. That must only ever happen through
        // updateAdminKeyAction below, which enforces hashing.
        if (config_key === 'admin_access_key') {
            throw new Error("Use updateAdminKeyAction to change the admin key.");
        }

        const { error } = await supabase.from('site_settings').upsert({ config_key, config_value });
        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function updateAdminKeyAction(newKey: string) {
    try {
        const supabase = await verifyAuthAndGetClient();

        if (!newKey || newKey.length < 8) {
            throw new Error("Access key must be at least 8 characters.");
        }

        // Hash the new access key
        const hashedKey = await bcrypt.hash(newKey, 10);

        // Save using the safe hash payload
        const { error } = await supabase.from('site_settings').upsert({
            config_key: 'admin_access_key',
            config_value: { hash: hashedKey }
        });

        if (error) throw error;
        return { success: true };
    } catch (err: any) {
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