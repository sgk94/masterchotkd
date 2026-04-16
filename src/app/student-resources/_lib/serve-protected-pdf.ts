import { readFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "@clerk/nextjs/server";

const SAFE_FILENAME = /^[A-Za-z0-9 ._-]+\.pdf$/;

export async function serveProtectedPdf(
  request: Request | undefined,
  fileName: string,
): Promise<Response> {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!SAFE_FILENAME.test(fileName)) {
    return new Response("Not Found", { status: 404 });
  }

  const root = path.resolve(process.cwd(), "student-resources");
  const filePath = path.resolve(root, fileName);
  if (!filePath.startsWith(root + path.sep)) {
    return new Response("Not Found", { status: 404 });
  }

  try {
    const download = request
      ? new URL(request.url).searchParams.get("download") === "1"
      : false;
    const file = await readFile(filePath);

    const encoded = encodeURIComponent(fileName);
    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename*=UTF-8''${encoded}`,
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
