import { memo } from 'react'
import { clampQuantity } from '../services/productDetailService'

function ProductQuantityControl({ value, stock, onChange }) {
  const maxQty = Math.max(0, Number(stock) || 0)
  const safeValue = clampQuantity(value, stock)

  const update = (nextValue) => {
    const next = clampQuantity(nextValue, stock)
    onChange(next)
  }

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center bg-navy-900 rounded-2xl border border-navy-800 p-1">
        <button
          type="button"
          onClick={() => update(safeValue - 1)}
          disabled={maxQty === 0 || safeValue <= 1}
          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          −
        </button>
        <span className="w-12 text-center font-black text-white">{maxQty === 0 ? 0 : safeValue}</span>
        <button
          type="button"
          onClick={() => update(safeValue + 1)}
          disabled={maxQty === 0 || safeValue >= maxQty}
          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

      <div className="flex-1 flex items-center gap-3">
        <span className={`w-2.5 h-2.5 rounded-full ${maxQty > 0 ? 'bg-brand-500 shadow-gold' : 'bg-red-500'}`} />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {maxQty > 0 ? `In Stock • ${maxQty} Pieces Remaining` : 'Currently Out of Stock'}
        </span>
      </div>
    </div>
  )
}

export default memo(ProductQuantityControl)
