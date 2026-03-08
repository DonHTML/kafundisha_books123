import { createStaticClient } from "@/utils/supabase/server";
import EbooksClient from "@/components/EbooksClient";

export const revalidate = 3600;

export default async function EbooksPage() {
    const supabase = createStaticClient();

    const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'eBooks')
        .order('created_at', { ascending: false });

    // Fallback for demo if DB is empty for this category
    const displayProducts = (products && products.length > 0) ? products : [
        {
            name: "My First Zambian Alphabet (PDF)",
            price: "K20",
            description: "A colorful digital guide to the alphabet with local objects. Instant PDF download.",
            category: "eBooks",
            image_url: null, // Fallback to icon
        },
        {
            name: "Teacher's Guide: Grade 1",
            price: "K50",
            description: "Complete lesson plans and activity sheets for Grade 1 teachers.",
            category: "eBooks",
            image_url: null,
        }
    ];

    return <EbooksClient initialProducts={displayProducts} />;
}
