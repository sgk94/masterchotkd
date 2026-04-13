export default function AuthLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-white">
      {children}
    </div>
  );
}
