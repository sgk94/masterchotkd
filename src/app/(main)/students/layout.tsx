import { MembersTabBar } from "@/components/members/members-tab-bar";

export default function StudentsLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <MembersTabBar />
      {children}
    </div>
  );
}
