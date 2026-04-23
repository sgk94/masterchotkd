import { createMetadata } from "@/lib/metadata";
import { PageContainer } from "@/components/ui/page-container";
import { BUSINESS_ADDRESS_LINES, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/location";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Master Cho's Taekwondo in Lynnwood, WA.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage(): React.ReactElement {
  return (
    <PageContainer>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-brand-black/40">Last updated: April 23, 2026</p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-brand-black/70">
          <section>
            <h2 className="font-heading text-xl text-brand-black">Your Privacy</h2>
            <p className="mt-3">
              Master Cho&apos;s Taekwondo (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This policy explains what information we collect through our website at masterchostaekwondo.com, how we use it, and your choices regarding that information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-brand-black">Information We Collect</h2>
            <p className="mt-3">We collect information you voluntarily provide through our contact form:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Message content</li>
              <li>Programs of interest</li>
            </ul>
            <p className="mt-3">
              We also use Clerk for member authentication. When you sign in to the members area, Clerk processes your email address and authentication credentials. See <a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-blue underline hover:text-brand-red">Clerk&apos;s Privacy Policy</a> for details on their data handling.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-brand-black">How We Use Your Information</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>To respond to your contact form inquiries</li>
              <li>To provide access to the members area and training resources</li>
              <li>To send administrative communications related to your membership</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-brand-black">Data Storage &amp; Retention</h2>
            <p className="mt-3">
              Contact form submissions are sent as email notifications and are not stored in a database on our website. Member account data is managed through Clerk&apos;s secure infrastructure. We retain information only as long as necessary to fulfill the purposes described in this policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-brand-black">Cookies &amp; Tracking</h2>
            <p className="mt-3">
              Our website uses only essential cookies required for authentication (Clerk). We do not use advertising cookies, analytics trackers, or third-party tracking scripts.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-brand-black">Third-Party Services</h2>
            <p className="mt-3">We use the following third-party services to operate our website:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li><strong>Vercel</strong> &mdash; website hosting</li>
              <li><strong>Clerk</strong> &mdash; member authentication</li>
              <li><strong>Resend</strong> &mdash; transactional email delivery (contact form notifications)</li>
              <li><strong>YouTube</strong> &mdash; embedded training videos (privacy-enhanced mode)</li>
            </ul>
            <p className="mt-3">Each service has its own privacy policy governing their handling of data.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-brand-black">Your Rights</h2>
            <p className="mt-3">You may request to:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Withdraw consent for communications</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us using the information below.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-brand-black">Children&apos;s Privacy</h2>
            <p className="mt-3">
              Our members area is intended for use by parents, guardians, and adult students. We do not knowingly collect personal information directly from children under 13. Parent or guardian accounts manage access for minor students.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-brand-black">Changes to This Policy</h2>
            <p className="mt-3">
              We may update this privacy policy from time to time. Changes will be reflected on this page with an updated &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-brand-black">Contact Us</h2>
            <p className="mt-3">If you have questions about this privacy policy, contact us at:</p>
            <div className="mt-3">
              <p>Master Cho&apos;s Taekwondo</p>
              <p>{BUSINESS_ADDRESS_LINES[0]}</p>
              <p>{BUSINESS_ADDRESS_LINES[1]}</p>
              <p>
                Phone: <a href={`tel:${BUSINESS_PHONE_TEL}`} className="text-brand-blue underline hover:text-brand-red">{BUSINESS_PHONE_DISPLAY}</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
