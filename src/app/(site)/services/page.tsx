import { PageSection } from "@/components/site/PageSection";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { SITE_SERVICES } from "@/data/site-services";
import { prisma } from "@/lib/prisma";

export default async function ServicesPage() {
  let services: Awaited<ReturnType<typeof prisma.service.findMany>> = [];
  try {
    services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    services = [];
  }

  const items =
    services.length > 0
      ? services.map((s) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          icon: s.icon,
        }))
      : SITE_SERVICES.map((s, i) => ({
          id: `fallback-${i}`,
          title: s.title,
          description: s.description,
          icon: s.icon,
        }));

  return (
    <PageSection className="flipbook__page--scroll">
      <h1 className="flipbook__title flipbook__reveal">
        <span className="flipbook__title-accent">Услуги</span>
      </h1>
      <p className="flipbook__lead flipbook__reveal flipbook__reveal--delay-1">
        От лендингов до сложных веб-платформ — под ключ и с заботой о деталях.
      </p>
      <ServicesGrid services={items} />
    </PageSection>
  );
}
