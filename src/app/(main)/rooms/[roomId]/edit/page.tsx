import { PagePlaceholder } from "@/components/common/PagePlaceholder";

export default async function RoomEditPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return <PagePlaceholder title={`규칙 수정 페이지 ${roomId}`} />;
}
