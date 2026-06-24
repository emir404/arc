import type { Metadata } from "next";
import LegalLayout from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern engagements with Arc Studio, including our partnership model, billing, and refund policy.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="June 24, 2026">
      <section>
        <h2>Overview</h2>
        <p>
          These Terms of Service (“Terms”) govern your engagement with Arc
          Studio (“Arc,” “we,” “us,” or “our”) and your use of witharc.co (the
          “Site”). By engaging our services or using the Site, you agree to
          these Terms. If you don’t agree, please don’t use the Site or our
          services.
        </p>
      </section>

      <section>
        <h2>Our services</h2>
        <p>
          Arc provides design and product services for early-stage teams,
          including product direction, UX/UI design, design systems, landing
          pages, and development. The specific scope, deliverables, and timeline
          for any engagement are agreed with you in advance.
        </p>
      </section>

      <section>
        <h2>The partnership model</h2>
        <p>
          We typically work through a time-based partnership. You commit to a
          block of working time, and we dedicate focused capacity to your
          product during that period. Engagements are structured but flexible,
          and the details of each partnership are confirmed before work begins.
        </p>
      </section>

      <section>
        <h2>Payments and billing</h2>
        <p>
          Fees are agreed before an engagement starts and are invoiced as
          described in your agreement. Unless stated otherwise, payment is due
          in advance of the work it covers. We may pause or hold work on overdue
          accounts.
        </p>
      </section>

      <section>
        <h2>Refunds and pausing</h2>
        <p>
          <strong>
            Payments for the partnership model are non-refundable.
          </strong>{" "}
          Instead of refunds, your time is flexible: you can pause your
          engagement at any time and use any remaining time whenever you’re
          ready to resume. Paused time doesn’t expire — it stays available to
          you until it’s used.
        </p>
      </section>

      <section>
        <h2>Your responsibilities</h2>
        <p>
          To keep work moving, you agree to provide timely feedback, supply the
          materials, content, and access we need, and ensure you have the rights
          to anything you share with us. Delays in feedback or materials may
          affect timelines.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          Upon full payment, ownership of the final deliverables created
          specifically for you transfers to you. We retain ownership of our
          pre-existing tools, methods, and internal materials. Unless you ask us
          in writing not to, we may show completed work in our portfolio and
          marketing.
        </p>
      </section>

      <section>
        <h2>Confidentiality</h2>
        <p>
          We treat non-public information you share with us as confidential and
          use it only to perform our work for you. This doesn’t apply to
          information that is public, that we already had, or that we’re
          required to disclose by law.
        </p>
      </section>

      <section>
        <h2>Disclaimers</h2>
        <p>
          Our services are provided with care and professional skill, but “as
          is” and without warranties of any kind, whether express or implied. We
          don’t guarantee any specific business outcome, metric, or result.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Arc will not be liable for any
          indirect, incidental, or consequential damages. Our total liability
          for any claim relating to an engagement is limited to the amount you
          paid us for that engagement.
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          Either party may end an engagement as described in the applicable
          agreement. Sections that by their nature should survive — including
          payment obligations, intellectual property, confidentiality,
          disclaimers, and limitation of liability — continue after an
          engagement ends. As noted above, ending an engagement doesn’t entitle
          you to a refund of amounts already paid.
        </p>
      </section>

      <section>
        <h2>Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. When we do, we’ll revise
          the “Last updated” date above. Continued use of the Site or our
          services after changes means you accept the updated Terms.
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>
          These Terms are governed by the laws of the jurisdiction in which Arc
          Studio is established, without regard to conflict-of-law principles.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these Terms? Email us at{" "}
          <a href="mailto:hello@witharc.co">hello@witharc.co</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
