import type { Metadata } from "next";
import LegalLayout from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Arc Studio collects, uses, and protects your information when you visit witharc.co or get in touch.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 24, 2026">
      <section>
        <h2>Overview</h2>
        <p>
          This Privacy Policy explains how Arc Studio (“Arc,” “we,” “us,” or
          “our”) collects, uses, and protects information when you visit
          witharc.co (the “Site”) or get in touch with us. By using the Site,
          you agree to the practices described here.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Information you provide.</strong> When you contact us, book
            a call, or start an engagement, you may share your name, email,
            company, and details about your project.
          </li>
          <li>
            <strong>Information collected automatically.</strong> Like most
            websites, we collect basic technical and usage data — such as your
            browser type, device, approximate location, pages viewed, and
            referring links — through analytics and similar technologies.
          </li>
        </ul>
      </section>

      <section>
        <h2>How we use information</h2>
        <p>
          We use the information we collect to respond to enquiries, schedule
          and run calls, deliver and improve our services, operate and secure
          the Site, and communicate with you about your engagement. We don’t
          sell your personal information.
        </p>
      </section>

      <section>
        <h2>Cookies and analytics</h2>
        <p>
          We use Google Analytics to understand how visitors use the Site so we
          can improve it. These tools may set cookies or use similar
          technologies to collect usage data. You can control cookies through
          your browser settings, and most browsers let you refuse or delete
          them.
        </p>
      </section>

      <section>
        <h2>Third-party services</h2>
        <p>
          We rely on a few trusted third parties to run our business and this
          Site. Each handles data under its own privacy policy, and we share
          only what’s needed for them to provide their service:
        </p>
        <ul>
          <li>
            <strong>Google Analytics</strong> — website analytics.
          </li>
          <li>
            <strong>Cal.com</strong> — scheduling and booking calls.
          </li>
          <li>
            <strong>Telegram</strong> — direct messaging when you reach out.
          </li>
          <li>
            <strong>Liveblocks</strong> — live cursor presence on the Site.
          </li>
        </ul>
      </section>

      <section>
        <h2>Data sharing</h2>
        <p>
          We don’t sell or rent your personal information. We share it only with
          the service providers above, when required by law, to protect our
          rights, or with your consent where applicable.
        </p>
      </section>

      <section>
        <h2>Data retention</h2>
        <p>
          We keep personal information only for as long as needed to provide our
          services, comply with legal obligations, resolve disputes, and enforce
          our agreements. When it’s no longer needed, we delete or anonymize it.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access,
          correct, delete, or restrict the use of your personal information, or
          to object to certain processing. To exercise any of these rights,
          email us at <a href="mailto:hello@witharc.co">hello@witharc.co</a> and
          we’ll respond as required by applicable law.
        </p>
      </section>

      <section>
        <h2>Data security</h2>
        <p>
          We take reasonable measures to protect your information. No method of
          transmission or storage is completely secure, however, so we can’t
          guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>Children’s privacy</h2>
        <p>
          The Site and our services are intended for businesses and aren’t
          directed to children under 16. We don’t knowingly collect personal
          information from children.
        </p>
      </section>

      <section>
        <h2>International visitors</h2>
        <p>
          Arc works with founders worldwide. If you access the Site from outside
          the country where our service providers store data, your information
          may be transferred to and processed in other countries.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we’ll
          revise the “Last updated” date above. Significant changes will be
          reflected here.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this Privacy Policy or your data? Email us at{" "}
          <a href="mailto:hello@witharc.co">hello@witharc.co</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
