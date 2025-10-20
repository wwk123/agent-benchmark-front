import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { ProfileClient } from "./profile-client";

type ProfilePageProps = {
  params: { locale: string };
  searchParams?: { tab?: string };
};

type ProfileTab = {
  id: string;
  label: string;
  heading: string;
  body: string;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const t = await getTranslations("profile");
  const tabs = t.raw("tabs") as ProfileTab[];
  const activeTabId = typeof searchParams?.tab === "string" ? searchParams.tab : undefined;

  return (
    <>
      <PageHero title={t("title")} description={t("description")} />
      <ProfileClient tabs={tabs} initialTab={activeTabId} />
    </>
  );
}
