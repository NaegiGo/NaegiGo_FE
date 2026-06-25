import { PagePlaceholder } from "@/components/common/PagePlaceholder";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return (
    <PagePlaceholder
      screenRef="04-06"
      title="방 상세 페이지"
      description={`roomId: ${roomId} · 시작 전/진행 중 상태에 따라 분기`}
    />
  );
}
