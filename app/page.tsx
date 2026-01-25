import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, WhatsAppIcon, BookOpenIcon } from "@/components/Icons";
import SecretVault from "@/components/SecretVault";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Playful Background Blobs */}
      <div className="blob bg-orange-200 w-[500px] h-[500px] -top-24 -left-24 animate-float" />
      <div className="blob bg-blue-100 w-[400px] h-[400px] top-1/2 -right-24 delay-1000 animate-float" />
      <div className="blob bg-green-100 w-[300px] h-[300px] bottom-0 left-1/4 delay-2000 animate-float" />

      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center pt-12">
        <div className="relative z-10 mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-soft-orange px-4 py-1.5 border border-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-primary">
                Kafundisha Books & Media
              </span>
            </div>
            <h1 className="mb-8 text-6xl font-black tracking-tighter md:text-8xl leading-[0.9] text-zinc-900">
              Opening New <br />
              <span className="text-primary italic font-serif">Worlds.</span>
            </h1>
            <p className="mb-12 max-w-lg text-lg font-medium text-zinc-500 md:text-xl leading-relaxed">
              "One Page at a Time!" <br />
              We create beautiful, affordable learning materials that make Zambian children fall in love with reading.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/shop"
                className="group flex items-center justify-center gap-3 rounded-2xl bg-zinc-900 px-10 py-5 text-lg font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:shadow-2xl hover:shadow-primary/30"
              >
                Explore Books
                <ArrowUpRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link
                href="https://wa.me/260977755766?text=Hi! I'd like to order Kafundisha Books."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 rounded-2xl bg-white border-2 border-zinc-100 px-10 py-5 text-lg font-black uppercase tracking-widest text-zinc-900 transition-all hover:border-primary hover:text-primary"
              >
                <WhatsAppIcon className="h-6 w-6 text-green-500" />
                Order on WhatsApp
              </Link>
            </div>
          </div>

          <div className="relative lg:block">
            <div className="relative aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/preschool-book.png"
                alt="Kafundisha Preschool Book"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-zinc-100">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <BookOpenIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Featured</p>
                <p className="text-lg font-black text-zinc-900 leading-none">Preschool Series</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="relative py-32 px-6 bg-zinc-50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">The Collection</span>
            <h2 className="mt-2 text-4xl font-black tracking-tighter text-zinc-900 md:text-6xl">
              Beautifully <span className="text-primary italic">Crafted</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <ProductBanner
              title="Preschool"
              desc="Exercise Books & Workbooks"
              price="From K4"
              color="bg-orange-400"
              link="/shop"
            />
            <ProductBanner
              title="Flashcards"
              desc="CVC & Alphabet Sets"
              price="K50"
              color="bg-blue-400"
              link="/shop"
            />
            <ProductBanner
              title="Stories"
              desc="Animated Fun & Reads"
              price="Free to Watch"
              color="bg-purple-400"
              link="/stories"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-black tracking-tight text-zinc-900 mb-8 md:text-6xl">
            We create for the <br />
            <span className="text-primary">future of Zambia.</span>
          </h3>
          <p className="text-xl text-zinc-500 font-medium leading-relaxed mb-12">
            Our mission is to provide every child with learning materials that are not only affordable
            but also culturally relevant and exciting to use.
          </p>
          <Link
            href="/about"
            className="text-sm font-black uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-200 pb-2 hover:border-primary hover:text-primary transition-all"
          >
            Read our story
          </Link>
        </div>
      </section>

      {/* Hidden Secret Entry */}
      <SecretVault />
    </div>
  );
}

function ProductBanner({ title, desc, price, color, link }: { title: string; desc: string; price: string; color: string; link: string }) {
  return (
    <Link href={link} className="group relative overflow-hidden rounded-[3rem] p-10 h-80 flex flex-col justify-end transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl">
      <div className={`absolute inset-0 ${color} opacity-10 group-hover:opacity-20 transition-opacity`} />
      <div className="relative z-10">
        <span className="text-sm font-black uppercase tracking-widest text-zinc-900/40">{price}</span>
        <h3 className="text-3xl font-black text-zinc-900 mt-2">{title}</h3>
        <p className="text-lg font-medium text-zinc-500">{desc}</p>
      </div>
      <div className={`absolute top-6 right-6 h-12 w-12 rounded-full bg-white flex items-center justify-center text-${color}-600 shadow-sm opacity-0 group-hover:opacity-100 transition-all`}>
        <ArrowUpRightIcon className="h-6 w-6" />
      </div>
    </Link>
  );
}
