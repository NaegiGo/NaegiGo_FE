import { PagePlaceholder } from "@/components/common/PagePlaceholder";

export default async function RoomCheckinPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return (
    <PagePlaceholder
      screenRef="06c-06d"
      title="체크인 페이지"
      description={`roomId: ${roomId} · 양심 인증 / 사진 인증`}
    />
  );
}
