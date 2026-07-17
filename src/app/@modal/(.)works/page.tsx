import WorksOverlay from "@/components/works/works-overlay";

// Intercepts client-side navigations to /works and shows them as a dialog
// over the current page. Hard loads still render the full /works page.
export default function InterceptedWorksPage() {
  return <WorksOverlay />;
}
