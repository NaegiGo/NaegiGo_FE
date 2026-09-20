import type { RoomDetail, VerificationMethod } from "@/types/room";

export const ROOM_NAME_MAX_LENGTH = 20;

export type RoomFormValues = {
  name: string;
  goal: string;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
  /** 인증 요일 인덱스 (0=월 ~ 6=일) */
  days: number[];
  method: VerificationMethod;
  penalty: string;
};

export type RoomFormField = "name" | "goal" | "dateRange" | "days" | "penalty";

export type RoomFormErrors = Partial<Record<RoomFormField, string>>;

export const EMPTY_ROOM_FORM: RoomFormValues = {
  name: "",
  goal: "",
  startDate: "",
  endDate: "",
  days: [0, 1, 2, 3, 4],
  method: "honor",
  penalty: "",
};

export function validateRoomForm(values: RoomFormValues): RoomFormErrors {
  const errors: RoomFormErrors = {};

  if (values.name.trim() === "") {
    errors.name = "방 이름을 입력해주세요";
  } else if (values.name.length > ROOM_NAME_MAX_LENGTH) {
    errors.name = `방 이름은 최대 ${ROOM_NAME_MAX_LENGTH}자예요`;
  }

  if (values.goal.trim() === "") {
    errors.goal = "목표 내용을 입력해주세요";
  }

  if (values.startDate === "" || values.endDate === "") {
    errors.dateRange = "기간을 선택해주세요";
  } else if (values.endDate < values.startDate) {
    // YYYY-MM-DD는 문자열 비교로도 날짜 순서가 맞는다.
    errors.dateRange = "종료일은 시작일보다 빠를 수 없어요";
  }

  if (values.days.length === 0) {
    errors.days = "인증 요일을 하나 이상 선택해주세요";
  }

  if (values.penalty.trim() === "") {
    errors.penalty = "벌칙 내용을 입력해주세요";
  }

  return errors;
}

export function isRoomFormValid(values: RoomFormValues) {
  return Object.keys(validateRoomForm(values)).length === 0;
}

/** 방 상세 데이터를 수정 폼의 초기값으로 바꾼다. */
export function toRoomFormValues(room: RoomDetail): RoomFormValues {
  return {
    name: room.name,
    goal: room.goal,
    startDate: room.startDate,
    endDate: room.endDate,
    days: room.days,
    method: room.method,
    penalty: room.penalty,
  };
}
