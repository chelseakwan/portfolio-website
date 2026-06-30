import Hero from "@/components/hero/Hero";

// Home (PRD §5.1). The animated hero is only imported here, so its client
// bundle ships with the home route alone (PRD §8.1).
export default function HomePage() {
  return <Hero />;
}
