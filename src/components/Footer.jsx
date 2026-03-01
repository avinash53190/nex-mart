import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-navy-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-gold transition-transform duration-500 group-hover:rotate-12">
                <span className="text-navy-950 font-black text-xl italic">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white leading-none">NexMart</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-500 font-bold">Premium Store</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              The world's premier destination for curated luxury goods. We bring together the finest craftsmanship and most exclusive labels in a single, seamless experience.
            </p>
            <div className="flex items-center gap-4 text-slate-500">
              {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="hover:text-brand-500 transition-colors uppercase text-[10px] font-black tracking-widest">{social}</a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-brand-500 font-black uppercase tracking-[0.2em] text-[10px]">The House</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/curation" className="text-slate-400 hover:text-white transition-colors">Our Curation</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Press</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-brand-500 font-black uppercase tracking-[0.2em] text-[10px]">Client Services</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Concierge</Link></li>
              <li><Link to="/shipping" className="text-slate-400 hover:text-white transition-colors">Logistics</Link></li>
              <li><Link to="/returns" className="text-slate-400 hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-6">
            <h4 className="text-brand-500 font-black uppercase tracking-[0.2em] text-[10px]">Global Presence</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Subscribe for invitations to private viewings and early access to limited estate releases.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="input !bg-navy-950 !border-navy-800 !py-2.5 !px-4 text-xs"
              />
              <button className="btn-primary !py-2.5 !px-6 text-[10px] uppercase tracking-widest font-black">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 NexMart House of Luxury. All rights reserved.</p>
          <div className="flex items-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            {["Visa", "Mastercard", "Amex", "PayPal"].map((m) => (
              <span key={m} className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
