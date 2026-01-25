"use client";

import { useState, useEffect } from "react";
import {
    PlusIcon,
    SearchIcon,
    FilterIcon,
    MoreVerticalIcon,
    Edit2Icon,
    EyeOffIcon,
    Trash2Icon,
    ExternalLinkIcon,
    ShoppingBagIcon,
    ArrowRightIcon
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ProductsManager() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            fetchProducts();
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

    if (products.length === 0) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                            Products <span className="text-primary italic">Manager</span>
                        </h1>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            Your product catalog is currently empty
                        </p>
                    </div>
                    <Link
                        href="/admin/products/new"
                        className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-primary transition-all shadow-lg"
                    >
                        <PlusIcon size={18} />
                        Create First Product
                    </Link>
                </div>

                <div className="rounded-[3rem] border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-20 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl shadow-zinc-200/50 mb-8">
                        <ShoppingBagIcon className="text-zinc-200" size={40} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900">No Products Found</h3>
                    <p className="mx-auto max-w-xs text-sm font-medium text-zinc-500 mt-2 mb-10 capitalize">
                        Start building your library by adding your first educational book or tool.
                    </p>
                    <Link
                        href="/admin/products/new"
                        className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary hover:gap-5 transition-all"
                    >
                        Click here to start <ArrowRightIcon size={16} />
                    </Link>
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
                        Products <span className="text-primary italic">Manager</span>
                    </h1>
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                        Manage books, prices, and WhatsApp orders
                    </p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-primary transition-all shadow-lg shadow-zinc-900/10"
                >
                    <PlusIcon size={18} />
                    Add New Product
                </Link>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm">
                <div className="relative flex-1 max-w-md">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full rounded-xl bg-zinc-50 border-none pl-12 pr-4 py-3 text-sm font-bold placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">
                        <FilterIcon size={14} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">
                        Bulk Actions
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50/50">
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Product</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Category</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Price</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {products.map((product) => (
                            <tr key={product.id} className="group hover:bg-zinc-50/50 transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-14 w-14 rounded-2xl ${product.color_class || 'bg-zinc-100'} overflow-hidden flex items-center justify-center text-zinc-400 border border-zinc-200 relative`}>
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-[8px] font-black uppercase text-zinc-300">No Image</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-black text-zinc-900 uppercase tracking-tight">{product.name}</p>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">ID: {product.id.substring(0, 8)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="rounded-lg bg-zinc-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-lg font-black text-primary">
                                    {product.price}
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className={`h-2 w-2 rounded-full ${product.status === 'Published' ? 'bg-green-500' : 'bg-zinc-300'}`} />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${product.status === 'Published' ? 'text-green-600' : 'text-zinc-400'}`}>
                                            {product.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/admin/products/${product.id}`}
                                            className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-primary hover:border-primary transition-all"
                                        >
                                            <Edit2Icon size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(product.id)} className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-500 transition-all">
                                            <Trash2Icon size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Showing {products.length} products</p>
            </div>
        </div>
    );
}
