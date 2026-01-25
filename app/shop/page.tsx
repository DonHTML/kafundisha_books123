import { createStaticClient } from "@/utils/supabase/server";
import ShopClient from "@/components/ShopClient";
import Link from "next/link";

export const revalidate = 3600; // revalidate every hour

export default async function ShopPage() {
    const supabase = createStaticClient();

    const { data: products } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    const displayProducts = (products && products.length > 0) ? products : [
        {
            name: "Preschool Exercise Book",
            price: "K4",
            description: "Perfect for early writing and drawing practice.",
            category: "Books",
            color_class: "bg-orange-50",
            image_url: "/preschool-book.png",
        },
        {
            name: "CVC Flashcards",
            price: "K50",
            description: "Learn to read consonant-vowel-consonant words with ease.",
            category: "Flashcards",
            color_class: "bg-green-50",
            image_url: "/cvc-kit.png",
        }
    ];

    return (
        <>
            <ShopClient initialProducts={displayProducts} />

            {/* Bulk Order Banner */}
            <section className="mx-auto max-w-7xl px-6 mt-32 pb-32">
                <div className="relative overflow-hidden rounded-[4rem] bg-primary p-12 md:p-24 text-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-8 md:text-6xl px-4">
                            Bulk order for <span className="italic">Your School</span>
                        </h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
                            We partner with schools and teachers to provide learning materials at wholesale prices.
                        </p>
                        <Link
                            href="/teachers"
                            className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-xl font-black uppercase tracking-widest text-primary transition-all hover:scale-105 shadow-xl"
                        >
                            Institutional Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
