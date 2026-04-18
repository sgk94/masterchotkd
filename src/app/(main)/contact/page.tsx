import { createMetadata } from "@/lib/metadata";
import { BUSINESS_ADDRESS_LINES, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/location";
import { ContactForm } from "@/components/forms/contact-form";
import { PageContainer } from "@/components/ui/page-container";

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with Master Cho's Taekwondo.",
});

export default function ContactPage(): React.ReactElement {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-brand-black/60">
            Have questions? We&apos;d love to hear from you.
          </p>
          <div className="mt-10 space-y-6">
            <div>
              <h3 className="font-heading text-lg text-brand-black">
                Phone
              </h3>
              <a
                href={`tel:${BUSINESS_PHONE_TEL}`}
                className="mt-1 inline-block text-brand-blue transition-colors hover:text-brand-red"
              >
                {BUSINESS_PHONE_DISPLAY}
              </a>
            </div>
            <div>
              <h3 className="font-heading text-lg text-brand-black">
                Location
              </h3>
              <p className="mt-1 text-brand-black/60">
                {BUSINESS_ADDRESS_LINES[0]}
                <br />
                {BUSINESS_ADDRESS_LINES[1]}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg text-brand-black">
                Follow Us
              </h3>
              <div className="mt-2 flex gap-4">
                <a
                  href="https://www.facebook.com/masterchostaekwondo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-blue transition-colors hover:text-brand-red"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 21v-8.1h2.7l.4-3.2h-3.1V7.7c0-.9.2-1.6 1.5-1.6h1.7V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.4H8v3.2h2.3V21h3.2Z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/masterchostaekwondo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-blue transition-colors hover:text-brand-red"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-card bg-brand-cream p-8">
          <ContactForm />
        </div>
      </div>
    </PageContainer>
  );
}
