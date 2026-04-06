import Link from "next/link";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Student Resources" });

const resources = [
  { title: "Curriculum", description: "Belt requirements and testing criteria for each rank.", href: "/students/curriculum" },
  { title: "Poomsae Forms", description: "Video library of all forms organized by belt level.", href: "/students/forms" },
  { title: "Resources", description: "Additional training materials and documents.", href: "/students/resources" },
];

export default function StudentsPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-4xl text-brand-black">Student Resources</h1>
      <p className="mt-3 text-brand-black/60">Access curriculum guides, practice videos, and training materials.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {resources.map((resource) => (
          <Link key={resource.href} href={resource.href} className="group rounded-card bg-brand-cream p-6 transition-colors hover:bg-brand-sand">
            <h2 className="font-heading text-xl text-brand-black group-hover:text-brand-red transition-colors">{resource.title}</h2>
            <p className="mt-2 text-sm text-brand-black/60">{resource.description}</p>
            <span className="mt-4 inline-block text-sm font-medium text-brand-red">View →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
