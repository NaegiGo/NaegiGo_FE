type PagePlaceholderProps = {
  title: string;
};

export function PagePlaceholder({
  title,
}: PagePlaceholderProps) {
  return (
    <main>
      <h1>{title}</h1>
    </main>
  );
}
