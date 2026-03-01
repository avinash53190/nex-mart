import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading }) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-navy-900 rounded-[2rem] h-[450px] animate-pulse border border-navy-800/50 overflow-hidden">
                        <div className="bg-navy-800/50 h-[300px]" />
                        <div className="p-6 space-y-4">
                            <div className="h-2 w-1/4 bg-navy-800 rounded-full" />
                            <div className="h-4 w-3/4 bg-navy-800 rounded-full" />
                            <div className="h-8 w-1/3 bg-navy-800 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-navy-900 rounded-[3rem] border border-navy-800/50">
                <div className="w-24 h-24 bg-navy-950 rounded-full flex items-center justify-center mb-8 shadow-gold-hover border border-navy-800">
                    <svg className="w-10 h-10 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display italic">No Masterpieces Found</h3>
                <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">
                    We couldn't locate any items matching your refined search. Perhaps adjust your requirements?
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-10 btn-secondary !px-10 !text-[10px] uppercase font-black tracking-widest"
                >
                    Reset Collection
                </button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
