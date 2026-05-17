import { ContactsPageContent } from "@/components/site/ContactsPageContent";
import { PageSection } from "@/components/site/PageSection";
import { getSiteTheme } from "@/lib/theme";

export default async function ContactsPage() {
  const theme = await getSiteTheme();

  return (
    <PageSection className="flipbook__page--screen flipbook__page--contacts">
      <ContactsPageContent
        contactEmail={theme.contactEmail}
        contactPhone={theme.contactPhone}
        contactAddress={theme.contactAddress}
      />
    </PageSection>
  );
}
