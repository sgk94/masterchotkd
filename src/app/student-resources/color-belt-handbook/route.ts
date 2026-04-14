import { serveProtectedPdf } from "../_lib/serve-protected-pdf";

export async function GET(request: Request): Promise<Response> {
  return serveProtectedPdf(request, "Color Belt Handbook.pdf");
}
