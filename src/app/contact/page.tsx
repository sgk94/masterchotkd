import { createMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with Master Cho's Taekwondo.",
});

export default function ContactPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
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
                Location
              </h3>
              <p className="mt-1 text-brand-black/60">
                3221 184th St SW STE 100
                <br />
                Lynnwood, WA 98037
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg text-brand-black">
                Follow Us
              </h3>
              <div className="mt-1 flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue transition-colors hover:text-brand-red"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue transition-colors hover:text-brand-red"
                >
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
    </div>
  );
}
