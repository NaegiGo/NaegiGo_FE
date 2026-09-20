import { notFound } from "next/navigation";
import { ScreenBody } from "@/components/common/AppShell";
import { NavHeader } from "@/components/common/NavHeader";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Chip } from "@/components/common/Chip";
import {
  FieldGroup,
  FieldHelp,
  FieldLabel,
  TextArea,
  TextField,
} from "@/components/common/Field";
import { ModalDemo } from "./ModalDemo";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 border-t border-border pt-5">
      <h2 className="text-caption font-semibold text-foreground-secondary">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** 공통 컴포넌트 눈으로 확인하는 개발용 페이지. 프로덕션에서는 노출되지 않는다. */
export default function ComponentGalleryPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <NavHeader
        title="공통 컴포넌트"
        back
        right={<Button variant="text">저장</Button>}
      />
      <ScreenBody className="flex flex-col gap-6 pt-2">
        <Section title="Button · variant">
          <div className="flex flex-wrap items-center gap-2">
            <Button>방 만들기</Button>
            <Button variant="secondary">취소</Button>
            <Button variant="ghost">URL 공유하기</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="danger">삭제</Button>
            <Button variant="dangerGhost">방 나가기</Button>
            <Button variant="text">기본 이미지로 변경</Button>
          </div>
          <Button variant="kakao" block>
            카카오로 시작하기
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="secondary">
              복사
            </Button>
            <Button disabled>비활성</Button>
          </div>
          <Button block>참여 확정하기</Button>
        </Section>

        <Section title="Chip · tone">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="active" withDot>
              진행 중
            </Chip>
            <Chip tone="pending">시작 전 · D-2</Chip>
            <Chip tone="ended">종료</Chip>
            <Chip tone="host">방장</Chip>
            <Chip tone="warn">경고</Chip>
            <Chip tone="danger">위험</Chip>
          </div>
        </Section>

        <Section title="Card · variant">
          <Card>
            <p className="text-body-lg font-semibold">아침 6시 기상</p>
            <p className="text-body text-foreground-secondary tabular-nums">
              D-12 · 67% 달성 · 4명
            </p>
          </Card>
          <Card variant="soft">soft — 방 코드 카드</Card>
          <Card variant="emphasis">emphasis — 편집 중 안내</Card>
          <Card variant="dark">dark — 꼴찌가 모두에게 커피 한 잔씩</Card>
        </Section>

        <Section title="Avatar · size / tint">
          <div className="flex items-center gap-3">
            <Avatar name="미니" size="sm" tint={0} />
            <Avatar name="준호" size="md" tint={1} />
            <Avatar name="하늘" size="lg" tint={2} />
            <Avatar name="지우" size="xl" tint={3} />
            <Avatar name="예린" tint={4} />
          </div>
        </Section>

        <Section title="Field">
          <FieldGroup>
            <FieldLabel htmlFor="room-name">방 이름</FieldLabel>
            <TextField id="room-name" placeholder="예: 매일 아침 6시 기상" />
            <FieldHelp counter="8 / 20">최대 20자</FieldHelp>
          </FieldGroup>
          <FieldGroup>
            <FieldLabel htmlFor="goal">목표 내용</FieldLabel>
            <TextArea
              id="goal"
              placeholder="예: 평일 매일 아침 6시까지 일어나서 인증샷 올리기"
            />
          </FieldGroup>
        </Section>

        <Section title="Modal">
          <ModalDemo />
        </Section>
      </ScreenBody>
    </>
  );
}
