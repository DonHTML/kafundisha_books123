"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

export async function loginAction(password: string) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    // IMPORTANT: use the SERVICE ROLE key here, not the anon/publishable key.
    // This action runs server-only ("use server"), so the service key never
    // reaches the browser bundle. site_settings must have RLS enabled with
    // NO select policy for anon — this is the only thing that then keeps
    // the admin password hash from being publicly queryable via the REST API.
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const cookieStore = await cookies();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    try {
        const { data } = await supabase
            .from('site_settings')
            .select('config_value')
            .eq('config_key', 'admin_access_key')
            .single();

        // Fail closed: if there's no properly configured bcrypt hash,
        // login fails. No hardcoded fallback password, ever.
        if (!data?.config_value?.hash) {
            console.error("admin_access_key is not configured with a bcrypt hash");
            return { success: false, error: "Login is not configured. Contact the site owner." };
        }

        const isValid = await bcrypt.compare(password, data.config_value.hash);

        if (isValid) {
            cookieStore.set('admin_session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            return { success: true };
        }

        return { success: false, error: "Invalid access key. Please try again." };
    } catch (err) {
        console.error("loginAction failed:", process.env.NODE_ENV !== "production" ? err : "(details hidden in production)");
        return { success: false, error: "Unable to connect to database." };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
}