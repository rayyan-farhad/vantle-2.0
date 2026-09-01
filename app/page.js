import VantleExperience from "../components/VantleExperience";

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vantle",
    url: "https://vantle-2-0.vercel.app",
    description:
      "Operational intelligence for supermarket demand, stock, procurement, and waste.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <VantleExperience />
    </>
  );
}
