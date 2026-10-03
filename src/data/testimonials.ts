export interface Testimonial {
  /** HTML: the phrase that should stand out goes in <span class="hl">. */
  text: string;
  name: string;
  role: string;
  /** In public/testimonials/: an 80px square WebP, for a picture that shows at 20px. */
  avatar: string;
}

// Keyed by the author's company.
export const testimonials = {
  vercel: {
    text: '<span class="hl">Dude, you should join Vercel!</span>',
    name: "Guillermo Rauch",
    role: "Co-Founder & CEO, Vercel",
    avatar: "/testimonials/guillermo-rauch.webp",
  },
  sim: {
    text: 'Emir is a talented designer with massive potential. He’s both a developer and designer, making his skillset <span class="hl">highly valuable for fast-moving teams.</span>',
    name: "Emir Karabeg",
    role: "CEO, Sim (YC X25)",
    avatar: "/testimonials/emir-karabeg.webp",
  },
  agentmail: {
    text: 'You’re the best dude and thanks for <span class="hl">giving our brand so much life and recognition.</span> Was a pleasure working with you and I’d recommend your service to any founder.',
    name: "Adi Singh",
    role: "CEO, AgentMail (YC S25)",
    avatar: "/testimonials/adi-singh.webp",
  },
  feyn: {
    text: 'Arc’s amazing work emphasized the uniqueness of our brand while prioritizing the UX. <span class="hl">Every customer we onboard compliments the style of our app!</span>',
    name: "Shreyash Nigam",
    role: "CEO, Feyn (YC X25)",
    avatar: "/testimonials/shreyash-nigam.webp",
  },
  orchid: {
    text: 'Arc brought our brand to life with <span class="hl">a world-class site that went viral on Twitter in a month.</span> A pleasure working with them, and I’d recommend them to any founder.',
    name: "Nizzy Abi Zaher",
    role: "Co-founder, Orchid (YC X25)",
    avatar: "/testimonials/nizzy-abi-zaher.webp",
  },
  agentphone: {
    text: 'Arc handled our brand, website, product, and everything in between, down to hackathon flyers and t-shirts, all on short notice. <span class="hl">Work that usually takes several agencies, done by one studio.</span>',
    name: "Meet Modi",
    role: "Co-founder, AgentPhone (YC P26)",
    avatar: "/testimonials/meet-modi.webp",
  },
} satisfies Record<string, Testimonial>;

export type TestimonialKey = keyof typeof testimonials;
