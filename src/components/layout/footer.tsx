import Link from "next/link";
import { NAV_LINKS } from "@/types";

export function Footer(): React.ReactElement {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Navigation</h4>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (<li key={link.href}><Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">{link.label}</Link></li>))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Master Cho&apos;s Taekwondo</h4>
          <p className="text-sm text-white/70 leading-relaxed">Making a difference, one belt at a time. Lynnwood&apos;s best martial arts program since 1999.</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Follow Us</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Our Location</h4>
          <address className="text-sm not-italic text-white/70 leading-relaxed">Master Cho&apos;s Taekwondo<br />3221 184th St SW STE 100<br />Lynnwood, WA 98037</address>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40">&copy; {new Date().getFullYear()} Master Cho&apos;s Taekwondo. All rights reserved.</div>
    </footer>
  );
}
