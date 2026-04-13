import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/types";

export function Footer(): React.ReactElement {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
        <div className="text-center lg:max-w-[12rem]">
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Navigation</h4>
          <ul className="grid max-w-[11.5rem] grid-cols-2 gap-x-3 gap-y-3">
            {NAV_LINKS.map((link) => (<li key={link.href}><Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">{link.label}</Link></li>))}
          </ul>
        </div>
        <div className="text-center">
          <Image src="/images/logo.svg" alt="Master Cho's Black Belt Academy" width={96} height={96} className="mx-auto mb-4 h-24 w-24" />
          <p className="text-sm text-white/70 leading-relaxed">Making a difference, one belt at a time. Lynnwood&apos;s best martial arts program since 1999.</p>
        </div>
        <div className="text-center">
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Contact</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="tel:+14253610688" className="text-sm text-white/70 hover:text-white transition-colors">425-361-0688</a></li>
            {/* TODO: Replace with actual Facebook/Instagram page URLs */}
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Instagram</a></li>
          </ul>
        </div>
        <div className="text-center">
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Our Location</h4>
          <address className="text-sm not-italic text-white/70 leading-relaxed">Master Cho&apos;s Taekwondo<br />3221 184th St SW STE 100<br />Lynnwood, WA 98037</address>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40">&copy; {new Date().getFullYear()} Master Cho&apos;s Taekwondo. All rights reserved.</div>
    </footer>
  );
}
