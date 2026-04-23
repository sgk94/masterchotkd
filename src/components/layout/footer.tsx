import Image from "next/image";
import Link from "next/link";
import { BUSINESS_ADDRESS_LINES, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/location";
import { PRIMARY_NAV } from "@/lib/nav";

export function Footer(): React.ReactElement {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
        <div className="text-center lg:max-w-[12rem]">
          <p className="mb-4 text-sm font-semibold text-brand-gold">Navigation</p>
          <ul className="grid max-w-[11.5rem] grid-cols-2 gap-x-3 gap-y-3">
            {PRIMARY_NAV.map((link) => (<li key={link.href}><Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">{link.label}</Link></li>))}
          </ul>
        </div>
        <div className="text-center">
          <Image src="/images/logo.png" alt="Master Cho's Black Belt Academy" width={96} height={96} className="mx-auto mb-4 h-24 w-24" />
          <p className="text-sm text-white/70 leading-relaxed">Making a difference, one belt at a time. Lynnwood&apos;s best martial arts program since 1999.</p>
        </div>
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold text-brand-gold">Contact</p>
          <ul className="flex flex-col gap-2">
            <li><a href={`tel:${BUSINESS_PHONE_TEL}`} className="text-sm text-white/70 hover:text-white transition-colors">{BUSINESS_PHONE_DISPLAY}</a></li>
            <li><a href="https://www.facebook.com/masterchostaekwondo" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Facebook</a></li>
            <li><a href="https://www.instagram.com/masterchostaekwondo/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Instagram</a></li>
          </ul>
        </div>
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold text-brand-gold">Our Location</p>
          <address className="text-sm not-italic text-white/70 leading-relaxed">
            Master Cho&apos;s Taekwondo
            <br />
            {BUSINESS_ADDRESS_LINES[0]}
            <br />
            {BUSINESS_ADDRESS_LINES[1]}
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} Master Cho&apos;s Taekwondo. All rights reserved.
        <span className="mx-2">·</span>
        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
      </div>
    </footer>
  );
}
