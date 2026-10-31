export interface Testimonial {
  /** HTML: the phrase that should stand out, if any, goes in <span class="hl">. */
  text: string;
  name: string;
  role: string;
  /** The author's company's accelerator batch, such as "YC X25", shown after the role where a page wants it. */
  batch?: string;
  /** In public/testimonials/: an 80px square WebP, for a picture that shows at 20px. */
  avatar: string;
}

// Keyed by the author's company.
export const testimonials = {
  vercel: {
    text: "Dude, you guys should join Vercel!",
    name: "Guillermo Rauch",
    role: "Co-Founder & CEO, Vercel",
    avatar: "/testimonials/guillermo-rauch.webp",
  },
  sim: {
    text: 'Ömer and Emir are talented designers with massive potential. They’re <span class="hl">both developers and designers</span>, making their skillset highly valuable for fast-moving teams.',
    name: "Emir Karabeg",
    role: "CEO, Sim",
    batch: "YC X25",
    avatar: "/testimonials/emir-karabeg.webp",
  },
  agentmail: {
    text: 'You guys are the best and thanks for giving our brand so much life and recognition. Was a pleasure working with you and <span class="hl">I’d recommend your service to any founder</span>.',
    name: "Adi Singh",
    role: "CEO, AgentMail",
    batch: "YC S25",
    avatar: "/testimonials/adi-singh.webp",
  },
  feyn: {
    text: 'Arc’s amazing work emphasized the uniqueness of our brand while prioritizing the UX. <span class="hl">Every customer we onboard compliments the style of our app!</span>',
    name: "Shreyash Nigam",
    role: "CEO, Feyn",
    batch: "YC X25",
    avatar: "/testimonials/shreyash-nigam.webp",
  },
  orchid: {
    text: 'Arc brought our brand to life with a world-class site that <span class="hl">went viral on Twitter in a month</span>. A pleasure working with them, and I’d recommend them to any founder.',
    name: "Nizzy Abi Zaher",
    role: "Co-founder, Orchid",
    batch: "YC X25",
    avatar: "/testimonials/nizzy-abi-zaher.webp",
  },
  agentphone: {
    text: 'Arc handled our brand, website, product, and everything in between, <span class="hl">down to hackathon flyers and t-shirts, all on short notice</span>. Work that usually takes several agencies, done by one studio.',
    name: "Meet Modi",
    role: "Co-founder, AgentPhone",
    batch: "YC P26",
    avatar: "/testimonials/meet-modi.webp",
  },
} satisfies Record<string, Testimonial>;

export type TestimonialKey = keyof typeof testimonials;
