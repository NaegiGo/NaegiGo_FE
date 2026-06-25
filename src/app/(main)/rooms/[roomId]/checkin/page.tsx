import { PagePlaceholder } from "@/components/common/PagePlaceholder";

export default async function RoomCheckinPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return <PagePlaceholder title={`체크인 페이지 ${roomId}`} />;
}
