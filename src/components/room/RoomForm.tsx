"use client";

import {
  FieldGroup,
  FieldHelp,
  FieldLabel,
  TextArea,
  TextField,
} from "@/components/common/Field";
import { Segmented } from "@/components/common/Segmented";
import { DayChips } from "@/components/room/DayChips";
import type { VerificationMethod } from "@/types/room";
import {
  ROOM_NAME_MAX_LENGTH,
  type RoomFormErrors,
  type RoomFormValues,
} from "@/utils/roomForm";

const METHOD_OPTIONS: { value: VerificationMethod; label: string }[] = [
  { value: "honor", label: "양심 인증" },
  { value: "photo", label: "사진 인증" },
];

// 날짜 입력은 flex 안에서 쓰므로 min-w-0으로 축소를 허용한다.
// (flex 아이템의 min-width 기본값이 auto라 이게 없으면 가로를 넘친다.)
// 네이티브 날짜 피커 아이콘까지 한 줄에 들어가도록 본문보다 한 단계 작은 글자를 쓴다.
const DATE_FIELD_CLASS =
  "w-full min-w-0 rounded-md border border-border bg-background px-3 py-3.5 text-body text-foreground outline-none transition focus:border-primary focus:shadow-focus";

type RoomFormProps = {
  values: RoomFormValues;
  onChange: (values: RoomFormValues) => void;
  errors: RoomFormErrors;
};

/** 방 생성·규칙 수정에서 함께 쓰는 입력 묶음 */
export function RoomForm({ values, onChange, errors }: RoomFormProps) {
  const update = <K extends keyof RoomFormValues>(
    key: K,
    value: RoomFormValues[K],
  ) => onChange({ ...values, [key]: value });

  return (
    <>
      <FieldGroup>
        <FieldLabel htmlFor="room-name">방 이름</FieldLabel>
        <TextField
          id="room-name"
          value={values.name}
          maxLength={ROOM_NAME_MAX_LENGTH}
          placeholder="예: 매일 아침 6시 기상"
          onChange={(event) => update("name", event.target.value)}
        />
        <FieldHelp counter={`${values.name.length} / ${ROOM_NAME_MAX_LENGTH}`}>
          최대 {ROOM_NAME_MAX_LENGTH}자
        </FieldHelp>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel htmlFor="room-goal">목표 내용</FieldLabel>
        <TextArea
          id="room-goal"
          value={values.goal}
          placeholder="예: 평일 매일 아침 6시까지 일어나서 인증샷 올리기"
          onChange={(event) => update("goal", event.target.value)}
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel htmlFor="room-start">기간</FieldLabel>
        <div className="flex items-center gap-2">
          <input
            id="room-start"
            type="date"
            className={DATE_FIELD_CLASS}
            value={values.startDate}
            aria-label="시작일"
            onChange={(event) => update("startDate", event.target.value)}
          />
          <span className="shrink-0 text-foreground-secondary">—</span>
          <input
            type="date"
            className={DATE_FIELD_CLASS}
            value={values.endDate}
            min={values.startDate || undefined}
            aria-label="종료일"
            onChange={(event) => update("endDate", event.target.value)}
          />
        </div>
        {errors.dateRange && values.startDate !== "" && (
          <p className="px-0.5 text-caption text-danger">{errors.dateRange}</p>
        )}
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>인증 요일</FieldLabel>
        <DayChips
          value={values.days}
          onChange={(days) => update("days", days)}
        />
        <FieldHelp>
          {errors.days ?? "인증이 필요한 요일을 모두 선택하세요"}
        </FieldHelp>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>인증 방식</FieldLabel>
        <Segmented
          label="인증 방식"
          options={METHOD_OPTIONS}
          value={values.method}
          onChange={(method) => update("method", method)}
        />
        <FieldHelp>양심 인증은 버튼 한 번, 사진 인증은 이미지 업로드</FieldHelp>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel htmlFor="room-penalty">벌칙 내용</FieldLabel>
        <TextArea
          id="room-penalty"
          value={values.penalty}
          className="min-h-[72px]"
          placeholder="예: 꼴찌가 모두에게 커피 한 잔씩"
          onChange={(event) => update("penalty", event.target.value)}
        />
        <FieldHelp>시작 후엔 수정할 수 없어요</FieldHelp>
      </FieldGroup>
    </>
  );
}
