import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'

export default function SortBar({
    totalResults,
    sort,
    setSort,
    search,
    setSearch
}) {
    const [localSearch, setLocalSearch] = useState(search)
    const debouncedSearch = useDebounce(localSearch, 500)

    useEffect(() => {
        setSearch(debouncedSearch)
    }, [debouncedSearch, setSearch])

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-navy-900 p-6 rounded-[2rem] border border-navy-800/50 shadow-card">
            <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="relative w-full md:w-96 group">
                    <svg
                        className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search the collection..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        className="input !pl-14 !bg-navy-950 !border-navy-800 focus:!border-brand-500/50 !rounded-2xl"
                    />
                </div>
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-navy-950 rounded-xl border border-navy-800">
                    <span className="text-brand-500 font-black text-xs italic">{totalResults}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Masterpieces</span>
                </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Arrange By</span>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="bg-navy-950 border border-navy-800 py-3 px-6 rounded-2xl text-xs font-black uppercase tracking-widest text-white outline-none focus:ring-2 focus:ring-brand-500/30 appearance-none cursor-pointer min-w-[180px]"
                    >
                        <option value="newest">Recent Curations</option>
                        <option value="price-asc">Price Ascending</option>
                        <option value="price-desc">Price Descending</option>
                        <option value="rating">Critic's Rating</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
