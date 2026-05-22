import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import { categories } from '../data/defaultProducts'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export default function Home() {
  const { products } = useProducts()
  const featured = products.filter(p => p.featured).slice(0, 4)

  return (
    <div className="bg-navy-950 overflow-hidden">
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brand-500 to-navy-950 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="inline-block text-brand-500 font-black uppercase tracking-[0.4em] text-xs mb-4">
              Now Available • Spring 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 font-display">
              Elevate Your <br />
              <span className="text-gold italic">Lifestyle.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
              Discover a curated selection of world-class products designed for those who demand excellence in every detail.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary !px-10 !py-5 text-sm uppercase tracking-widest">
                Explore Collection
              </Link>
              <Link to="/categories" className="btn-secondary !px-10 !py-5 text-sm uppercase tracking-widest">
                Personal Styling
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full hidden lg:block opacity-30 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-l from-brand-500/20 to-transparent rounded-l-full blur-3xl" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <motion.div {...fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-white mb-4 font-display italic">The Curated List</h2>
            <p className="text-slate-500 text-lg">Our experts hand-picked these exclusive pieces for your consideration this season.</p>
          </div>
          <Link to="/shop" className="text-brand-500 font-black uppercase tracking-widest text-xs hover:text-white transition-colors border-b-2 border-brand-500/30 pb-1">
            Browse All Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-navy-900 py-24 border-y border-navy-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Signature Categories</h2>
            <p className="text-slate-400">Refined selections across every vertical of your luxury life.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-navy-950">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}?auto=format&fit=crop&q=80&w=800`}
                    alt={cat}
                    className="w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <span className="text-brand-500 font-bold uppercase tracking-widest text-[10px] mb-2">Explore Room</span>
                  <h3 className="text-3xl font-bold text-white mb-4 font-display">{cat}</h3>
                  <Link to={`/shop?category=${cat}`} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-brand-500 group-hover:text-navy-950 group-hover:border-transparent transition-all duration-500">
                    →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { title: 'Discrete Logistics', desc: 'White-glove delivery service globally, ensuring your package arrives in pristine condition.', icon: '📦' },
            { title: 'Bespoke Curation', desc: 'Every item in our store is hand-vetted by industry experts for authenticity and craftsmanship.', icon: '💎' },
            { title: 'Lifetime Support', desc: 'A dedicated concierge is assigned to every member, available 24/7 for any request.', icon: '🤝' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeInUp}
              transition={{ delay: i * 0.2 }}
              className="text-center space-y-4"
            >
              <div className="w-20 h-20 bg-navy-900 border border-navy-800 rounded-full flex items-center justify-center text-3xl mx-auto shadow-gold-hover">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white font-display uppercase tracking-widest">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-navy-900 border border-navy-800 p-12 md:p-20 text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10 space-y-6">
            <span className="text-brand-500 font-black uppercase tracking-[0.3em] text-[10px]">The Inner Circle</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-display">Join the Elite.</h2>
            <p className="text-slate-400 max-w-md mx-auto">Receive early access to limited releases and VIP invitations to exclusive events.</p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4">
              <input
                type="email"
                placeholder="The Gentleman / Lady's Email"
                className="input !bg-navy-950 !border-navy-800 focus:!border-brand-500/50"
              />
              <button type="submit" className="btn-primary whitespace-nowrap !px-8 text-xs uppercase tracking-widest font-black">
                Subscribe
              </button>
            </form>
            <p className="text-[10px] text-slate-600 font-medium">By joining, you agree to our strictly private privacy policy.</p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
