import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(): Promise<Response> {
  const filePath = path.join(
    process.cwd(),
    "student-resources",
    "Tiny Tiger Handbook.pdf",
  );

  const file = await readFile(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Tiny Tiger Handbook.pdf"',
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
