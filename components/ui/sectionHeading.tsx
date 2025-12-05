export default function SectionHeading({
  title,
  subtitle,
  description,
  className,
}: {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`mb-1 lg:mb-24 animate-in fade-in duration-700 slide-in-from-bottom-4 ${className}`}
    >
      <p className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
        {subtitle}
      </p>
      <h1 className="text-text-main text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
        {title}
      </h1>
      <p className="text-text-muted text-lg md:text-xl font-normal leading-normal mt-4 max-w-3xl">
        {description}
      </p>
    </div>
  );
}
