import { requirePlatform } from "@/lib/auth/dal";
import { ReviewerTabs } from "./ReviewerTabs";

/** The Review centre: a dedicated area for qualified reviewers to check and sign off lessons. */
export default async function ReviewerLayout({ children }: { children: React.ReactNode }) {
  await requirePlatform("platform.content.review");
  return (
    <>
      <ReviewerTabs />
      {children}
    </>
  );
}
