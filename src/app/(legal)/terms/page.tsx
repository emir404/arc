"use client"

import React from 'react'
import Link from 'next/link'

function TermsOfService() {
  return (
    <div className="min-h-screen bg-white pt-48 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8 inline-block"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-500">Last updated: February 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using Arc Studio's services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">2. Services</h2>
            <p className="text-gray-600 mb-4">
              Arc Studio provides digital design and development services. We reserve the right to withdraw or amend our service without notice. We will not be liable if our services are unavailable at any time or for any period.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">3. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              The intellectual property rights of all content and materials produced as part of our services remain with Arc Studio until full payment is received, after which specific rights will be transferred as outlined in the project agreement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">4. Payment Terms</h2>
            <p className="text-gray-600 mb-4">
              Payment terms are outlined in individual project agreements. We reserve the right to pause or terminate services if payment terms are not met.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Arc Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">6. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. We will notify clients of any material changes via email or through our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">Contact</h2>
            <p className="text-gray-600 mb-4">
              For any questions about these Terms of Service, please contact us at{' '}
              <a 
                href="mailto:hello@witharc.co" 
                className="text-black hover:text-gray-600 transition-colors"
              >
                hello@witharc.co
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService 