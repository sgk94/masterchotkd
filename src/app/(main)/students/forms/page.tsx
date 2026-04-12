import { createMetadata } from "@/lib/metadata";
import { FormsLibrary } from "./forms-library";

export const metadata = createMetadata({ title: "Poomsae Forms" });

export default function FormsPage(): React.ReactElement {
  return <FormsLibrary />;
}
