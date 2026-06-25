import { PagePlaceholder } from "@/components/common/PagePlaceholder";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return <PagePlaceholder title={`방 상세 페이지 ${roomId}`} />;
}
