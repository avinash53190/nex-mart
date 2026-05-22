export default function ProductCardSkeleton() {
  return (
    <div className="bg-navy-900 rounded-3xl overflow-hidden border border-navy-800/50 animate-pulse">
      <div className="aspect-[4/5] bg-navy-800/50" />
      <div className="p-6 space-y-4">
        <div className="h-3 w-24 bg-navy-800 rounded-full" />
        <div className="h-5 w-4/5 bg-navy-800 rounded-full" />
        <div className="h-4 w-1/2 bg-navy-800 rounded-full" />
      </div>
    </div>
  )
}
