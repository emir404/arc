"use client"

import React from 'react'
import Link from 'next/link'

function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-500">Last updated: February 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">Introduction</h2>
            <p className="text-gray-600 mb-4">
              At Arc Studio, we take your privacy seriously. This policy describes how we collect, use, and handle your information when you use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Contact information (name, email, phone number)</li>
              <li>Project requirements and preferences</li>
              <li>Communication history</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide and improve our services</li>
              <li>Communicate with you about projects</li>
              <li>Send updates and marketing communications</li>
              <li>Analyze and improve our website performance</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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

export default PrivacyPolicy
