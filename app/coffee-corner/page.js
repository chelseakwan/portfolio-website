import CoffeeSign from "@/components/CoffeeSign";

export const metadata = {
  title: "Coffee Corner",
  description:
    "A little corner of the site that's still brewing — the Coffee Corner opens soon.",
  openGraph: {
    title: "Coffee Corner — Chelsea Kwan",
    description: "Still brewing. The Coffee Corner opens soon.",
  },
};

// Coffee Corner easter-egg room (v4 spec): an otherwise empty overlay pinned
// below the nav, with the hand-drawn sign swinging in the center. The swing
// animation itself lives on .coffee__sign in globals.css (and is disabled under
// prefers-reduced-motion by the global motion reset).
export default function CoffeeCornerPage() {
  return (
    <div className="coffee">
      <CoffeeSign />
    </div>
  );
}
