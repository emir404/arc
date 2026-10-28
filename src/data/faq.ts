import { ACCELERATOR_CHECK, AVAILABILITY, LAUNCH_CAPACITY_PER_MONTH, PARTNERSHIP_TURNAROUND, PARTNERSHIP_VIDEOS, PRICES, WHO_YOU_WORK_WITH } from "./site";
import { dealName, dollars, type Audience } from "./plans";

/*
  The questions on the main, YC, speedrun and launch pages. Answers about capacity, installments, turnaround and
  video read src/data/site.ts, so they change with it. An answer is a line of text, or parts of one where
  { book: "words" } is a link to book a call.
*/

export type Answer = string | (string | { book: string })[];

export interface Question {
  /** Its address on the page, #faq-<id>, which opens it. */
  id: string;
  question: string;
  answer: Answer;
}

const capitalized = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** The questions as a page for this audience asks them: the YC and speedrun pages name only their own price. */
export function questions(audience: Audience = "default"): Question[] {
  const deal = dealName[audience] ?? "YC or speedrun price";
  const dealQuestion = audience === "default" ? "YC / speedrun price" : dealName[audience];
  const installment = (price: number) => dollars(price / PRICES.launchInstallments);
  return [
    {
      id: "how-fast",
      question: "How fast is Launch?",
      answer: "One month from kickoff to launch, then two weeks of fixes. We set the launch date on the first call.",
    },
    {
      id: "unlimited-requests",
      question: "What does “unlimited requests” mean?",
      answer: `Send as many requests as you want. We work through them in order. Turnaround: ${PARTNERSHIP_TURNAROUND}.`,
    },
    {
      id: "video",
      question: "Is video included in Partnership?",
      answer: `Yes. ${capitalized(PARTNERSHIP_VIDEOS)}.`,
    },
    {
      id: "installments",
      question: "How do the installments work?",
      answer: `Launch is paid in ${PRICES.launchInstallments} installments of ${installment(PRICES.launch)} (${installment(PRICES.launchAccelerator)} each with the ${deal}).`,
    },
    {
      id: "accelerator-price",
      question: `How do you verify the ${dealQuestion}?`,
      answer: ACCELERATOR_CHECK,
    },
    {
      id: "capacity",
      question: "How many clients do you take?",
      answer: `We take ${LAUNCH_CAPACITY_PER_MONTH} Launch projects a month so each one gets the full team. ${AVAILABILITY}.`,
    },
    {
      id: "start",
      question: "When can we start?",
      // Says when, so it changes with AVAILABILITY in site.ts.
      answer: ["This week. ", { book: "Book a call" }, " and we’ll set the start date on it."],
    },
    {
      id: "after-launch",
      question: "What happens after Launch?",
      answer: "Most teams roll into Partnership so the same people keep shipping. No new onboarding.",
    },
    {
      id: "pause",
      question: "Can I pause or cancel Partnership?",
      answer: "Yes, anytime.",
    },
    {
      id: "who",
      question: "Who will I work with?",
      answer: WHO_YOU_WORK_WITH,
    },
    {
      id: "one-piece",
      question: "Do you do just one piece, like only a site?",
      answer: "Yes. Custom projects are scoped on a call.",
    },
  ];
}

/** An answer as plain text, for structured data. */
export function plainAnswer(answer: Answer) {
  return typeof answer === "string" ? answer : answer.map((part) => (typeof part === "string" ? part : part.book)).join("");
}
