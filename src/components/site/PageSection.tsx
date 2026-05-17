type Props = {
  children: React.ReactNode;
  className?: string;
};

export function PageSection({ children, className }: Props) {
  return (
    <section className={`flipbook__page${className ? ` ${className}` : ""}`}>
      <div className="flipbook__page-inner">{children}</div>
    </section>
  );
}
