import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants/seo";

export function OrganizationSchema() {
  const url = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url,
    email: "vibudhrathore8@gmail.com",
    areaServed: "India",
    knowsAbout: [
      "Digital marketing",
      "Search engine optimization",
      "Web design",
      "Paid advertising",
      "Marketing automation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
