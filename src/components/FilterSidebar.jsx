import { categories } from '../data/products'

export default function FilterSidebar({
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    onReset
}) {
    const handleCategoryChange = (cat) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(selectedCategories.filter(c => c !== cat))
        } else {
            setSelectedCategories([...selectedCategories, cat])
        }
    }

    return (
        <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-navy-900 rounded-[2.5rem] p-8 border border-navy-800/50 sticky top-28 shadow-card space-y-10">
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white font-display italic">Refine Selection</h3>
                        <button
                            onClick={onReset}
                            className="text-[10px] font-black text-brand-500 uppercase tracking-widest hover:text-white transition-colors border-b border-brand-500/20 pb-0.5"
                        >
                            Reset All
                        </button>
                    </div>

                    <div className="space-y-10">
                        {/* Category Filter */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">The Departments</h4>
                            <div className="space-y-4">
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center group cursor-pointer">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => handleCategoryChange(cat)}
                                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-navy-800 bg-navy-950 transition-all checked:bg-brand-500 checked:border-brand-500 shadow-sm"
                                            />
                                            <svg
                                                className="pointer-events-none absolute h-3 w-3 left-1 opacity-0 peer-checked:opacity-100 text-navy-950 transition-opacity"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="ml-4 text-sm font-medium text-slate-500 group-hover:text-white transition-colors">
                                            {cat}
                                        </span>
                                        {selectedCategories.includes(cat) && (
                                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500 shadow-gold" />
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Investment Range</h4>
                            <div className="space-y-6">
                                <input
                                    type="range"
                                    min="0"
                                    max="3000"
                                    step="50"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full h-1 bg-navy-800 rounded-full appearance-none cursor-pointer accent-brand-500"
                                />
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1 p-3 bg-navy-950 rounded-2xl border border-navy-800">
                                        <span className="text-[9px] text-slate-600 block uppercase font-black tracking-widest mb-1">Floor</span>
                                        <span className="text-sm font-black text-white">$0</span>
                                    </div>
                                    <div className="w-4 h-px bg-navy-800" />
                                    <div className="flex-1 p-3 bg-navy-950 rounded-2xl border border-navy-800 text-right">
                                        <span className="text-[9px] text-slate-600 block uppercase font-black tracking-widest mb-1">Ceiling</span>
                                        <span className="text-sm font-black text-white">${priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand/Quality Promo Card inside Sidebar */}
                <div className="p-6 bg-navy-950 rounded-[2rem] border border-brand-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-brand-500/10 transition-colors" />
                    <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em] mb-2">The Inner Circle</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">Use code <span className="text-white font-bold">ESTATE20</span> for a distinguished 20% reduction on your inaugural selection.</p>
                </div>
            </div>
        </aside>
    )
}
