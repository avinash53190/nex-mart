export default function ProductDetailSkeleton() {
  return (
    <div className="bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
        <div className="h-4 w-56 bg-navy-800 rounded-full mb-8" />

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
          <div className="space-y-6">
            <div className="aspect-[4/5] rounded-[2rem] bg-navy-900 border border-navy-800" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square rounded-2xl bg-navy-900 border border-navy-800" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-4 w-40 bg-navy-800 rounded-full" />
            <div className="h-12 w-3/4 bg-navy-800 rounded-2xl" />
            <div className="h-6 w-1/3 bg-navy-800 rounded-full" />
            <div className="h-28 bg-navy-900 rounded-3xl border border-navy-800" />
            <div className="h-16 bg-navy-900 rounded-2xl border border-navy-800" />
            <div className="flex gap-4">
              <div className="h-16 flex-1 bg-navy-800 rounded-2xl" />
              <div className="h-16 w-16 bg-navy-800 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
