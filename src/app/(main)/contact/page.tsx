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
              <div className="mt-1 flex gap-4">
                <a
                  href="https://www.facebook.com/masterchostaekwondo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue transition-colors hover:text-brand-red"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/masterchostaekwondo/"
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
    </PageContainer>
  );
}
