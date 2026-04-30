// app/loading.js
export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="flex items-end gap-4">
                {/* Texte MenSavil */}
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter animate-mensavil-fade">
                    MenSavil
                </h1>

                {/* Dik l-animation dyal dots li f tswira (Optional) */}
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-current animate-mensavil-fade [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 rounded-full bg-current animate-mensavil-fade [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 rounded-full bg-current animate-mensavil-fade"></div>
                </div>
            </div>
        </div>
    );
}