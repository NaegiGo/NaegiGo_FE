type PagePlaceholderProps = {
  screenRef: string;
  title: string;
  description?: string;
};

export function PagePlaceholder({
  screenRef,
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
        {screenRef}
      </span>
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      {description && (
        <p className="max-w-xs text-sm text-zinc-500">{description}</p>
      )}
    </main>
  );
}
