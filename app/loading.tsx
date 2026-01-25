export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
            <div className="relative flex h-24 w-24 flex-col items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute h-full w-full rounded-full border-[3px] border-primary/10" />
                {/* Spinning Progress */}
                <div className="absolute h-full w-full rounded-full border-[3px] border-primary border-t-transparent animate-[spin_0.8s_linear_infinite]" />

                {/* Central Icon/Logo Glow */}
                <div className="relative h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 animate-pulse">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                </div>
            </div>

            <div className="absolute bottom-12 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 animate-pulse">
                    Kafundisha Labs
                </p>
            </div>
        </div>
    );
}
