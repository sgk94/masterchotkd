type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageContainer({
  children,
  className = "",
}: PageContainerProps): React.ReactElement {
  return (
    <div className={`mx-auto max-w-7xl px-6 py-16 lg:py-24 ${className}`}>
      {children}
    </div>
  );
}
