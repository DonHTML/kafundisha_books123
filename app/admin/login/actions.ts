"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import bcrypt from "bcryptjs";

export async function loginAction(password: string) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseKey || supabaseKey === 'your_service_role_key_here') {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing from environment variables. Please add it to your .env file.");
    }

    // Create server client for reading the access key bypassing RLS
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll() { },
        },
    });

    try {
        const { data } = await supabase
            .from('site_settings')
            .select('config_value')
            .eq('config_key', 'admin_access_key')
            .single();

        let isValid = false;

        if (data?.config_value?.hash) {
            isValid = await bcrypt.compare(password, data.config_value.hash);
        } else if (data?.config_value?.key) {
            isValid = password === data.config_value.key;
        } else {
            isValid = password === "AdminMusonda";
        }

        if (isValid) {
            // Set secure HTTP-only cookie
            cookieStore.set('admin_session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            return { success: true };
        } else {
            return { success: false, error: "Invalid access key. Please try again." };
        }
    } catch (err) {
        console.error(err);
        return { success: false, error: "Unable to connect to database." };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
}
