import { Button } from "@/components/ui/button";

export default function NotFound(): React.ReactElement {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span className="font-heading text-8xl text-brand-gold/30">404</span>
      <h1 className="mt-4 font-heading text-3xl text-brand-black">Page not found</h1>
      <p className="mt-3 max-w-md text-brand-black/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8">
        <Button variant="primary" href="/">Back to home</Button>
      </div>
    </div>
  );
}
