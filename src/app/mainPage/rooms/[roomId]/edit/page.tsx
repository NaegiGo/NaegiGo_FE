import { PagePlaceholder } from "@/components/common/PagePlaceholder";

export default async function RoomEditPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return (
    <PagePlaceholder
      screenRef="04b"
      title="규칙 수정 페이지"
      description={`roomId: ${roomId} · 시작 전에만 수정 가능`}
    />
  );
}
