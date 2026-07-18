<div align="center">

# 내기고 (NaegiGo)

친구와 함께 목표를 정하고, 못 지키면 벌칙을 받는 내기 챌린지 서비스

</div>

<br/>

## 🙋🏻‍♀️ 내기고의 FE Developer를 소개합니다!

| <a href="https://github.com/seunghyeonKang"><img src="https://avatars.githubusercontent.com/u/101852433?v=4" width="120px;" alt=""/> | <a href="https://github.com/yeon-yeon1"><img src="https://avatars.githubusercontent.com/u/158417764?v=4" width="120px;" alt=""/></a> |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 강승현                                                                                                                               | 노진경                                                                                                                               |

<br>

## 📊 Insights

![Alt](https://repobeats.axiom.co/api/embed/8b05274b54613fda45a3229b91b696df3140dc8b.svg "Repobeats analytics image")

## 📚 서비스 소개

**내기고(NaegiGo)** 는 친구와 함께 목표를 정하고, 못 지키면 벌칙을 받는 내기 챌린지 서비스입니다.
<br>
혼자 하면 흐지부지되는 목표도 친구와의 내기로 강제성을 부여해, 끝까지 해낼 수 있도록 돕습니다.

- 친구를 초대해 함께 지킬 목표·기간·벌칙을 정하고 방을 만들어요
- 기간 동안 양심 인증 또는 사진 인증으로 매일 체크인해요
- 내 현황과 참여자 전체 순위를 실시간으로 확인해요
- 종료 시점에 목표를 못 지킨 사람은 정해둔 벌칙을 받아요

## 💻 기술 스택

| **역할**             | **종류**                                                                                                                                                                                                                           | **선정 이유**                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Framework            | <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">                                                                                                                           | App Router 기반의 파일 시스템 라우팅과 SSR/SSG를 기본 지원해 별도 라우터 설정 없이 빠르게 페이지 구조를 잡을 수 있음 |
| Programming Language | <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>                                                                                                                    | 정적 타입을 제공하여 코드의 안정성과 가독성을 높이고, 개발 중 오류를 사전에 방지할 수 있어 유지보수에 유리           |
| Styling              | <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">                                                                                                                   | 유틸리티 클래스 기반의 스타일링으로 반복되는 CSS 코드 작성을 줄이고, 빠르고 일관된 UI 구현 가능                      |
| Package Manager      | <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white">                                                                                                                                 | 빠른 설치 속도와 디스크 공간을 절약하는 효율적인 의존성 관리로 프로젝트 환경 설정에 용이                             |
| Bundler              | <img src="https://img.shields.io/badge/Turbopack-000000?style=for-the-badge">                                                                                                                                                      | Next.js 기본 번들러로, Rust 기반의 빠른 개발 서버 구동과 빌드 속도를 제공                                            |
| Formatting           | <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-000000?style=for-the-badge&logo=prettier&logoColor=F7B93E">                 | 코드 스타일을 통일하고 잠재적인 오류를 사전에 방지하여 협업 시 효율성을 높임                                         |
| Testing              | <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=FFE05F"> <img src="https://img.shields.io/badge/Testing%20Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white"> | Vite 기반의 빠른 테스트 실행 속도와 사용자 관점의 컴포넌트 단위 테스트를 지원                                        |
| Git Hooks            | <img src="https://img.shields.io/badge/husky-000000?style=for-the-badge"> <img src="https://img.shields.io/badge/lint--staged-000000?style=for-the-badge">                                                                         | 커밋 전 변경된 파일에 대해서만 자동으로 lint/format을 실행해 코드 품질을 일정하게 유지                               |

<br>

## 🧩 Package Manager

- **pnpm 버전**
  - 10.12.1 (`package.json`의 `packageManager` 필드로 고정)

- **pnpm 버전 변경 방법**

```
corepack use pnpm@버전 # 프로젝트 최상위 폴더 위치에서 명령어 입력
```

- **pnpm 명령어 예시**

```
pnpm install # 전체 설치
pnpm add 라이브러리 # 라이브러리 설치
pnpm dev # 개발 서버 실행
pnpm build # 프로덕션 빌드
pnpm lint # ESLint 검사
pnpm format # Prettier 전체 포맷
pnpm test # Vitest 테스트 실행
```

<br>

## 🔗 절대경로 (Import Alias)

`@/*` → `src/*` 로 매핑되어 있습니다 (`tsconfig.json` 참고).

```ts
import { PagePlaceholder } from "@/components/common/PagePlaceholder";
```

<br>

## 🔐 환경변수

`.env.example`을 복사해 `.env.local`을 만들고 실제 값을 채워주세요. `.env.example`만 git에 커밋됩니다.

- `NEXT_PUBLIC_API_BASE_URL` - 백엔드 API 서버 주소

<br>

## ⌨️ Code Styling

- **camelCase**
  - 변수명, 함수명에 적용
  - 첫글자는 소문자로 시작, 띄어쓰기는 붙이고 뒷 단어의 시작을 대문자로
    - ex- handleDelete
  - 언더바 사용 X (클래스명은 허용)

<br>

## 🎨 Design Tokens

디자인 토큰은 [src/app/globals.css](src/app/globals.css)의 `:root`와 `@theme inline` 블록에서 관리합니다. 새 색·타이포는 반드시 이곳에 먼저 등록한 뒤 Tailwind 유틸 클래스로 사용합니다.

### 색상

역할 기반 네이밍(`--color-{역할}-{상태}`). 시맨틱 색은 `base / muted / foreground` 3단 세트로 묶어 뱃지·알림 등을 조합만으로 만들 수 있습니다.

| 그룹   | 토큰                                                                 | 용도                                      |
| ------ | -------------------------------------------------------------------- | ----------------------------------------- |
| 브랜드 | `primary` / `primary-hover` / `primary-muted` / `primary-foreground` | 주 브랜드 색, hover, 톤 배경, 전경 텍스트 |
| 텍스트 | `foreground` / `foreground-secondary` / `foreground-muted`           | 본문 / 서브 / 플레이스홀더                |
| 표면   | `background` / `surface` / `surface-muted`                           | 페이지 / 카드 / 강조 배경                 |
| 보더   | `border` / `border-strong`                                           | 일반 / 강조                               |
| 성공   | `success` / `success-muted` / `success-foreground`                   | 상태 알림·뱃지                            |
| 경고   | `warning` / `warning-muted` / `warning-foreground`                   | 상태 알림·뱃지                            |
| 위험   | `danger` / `danger-muted` / `danger-foreground`                      | 상태 알림·뱃지                            |
| 카카오 | `kakao` / `kakao-foreground`                                         | 카카오 로그인                             |

사용 예:

```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary-hover">시작하기</button>
<div className="bg-success-muted text-success-foreground">체크인 완료</div>
```

### 타이포그래피

- **폰트**: Pretendard 로컬 폰트 통일 (`--font-sans`)
- **웨이트**: 400 / 500 / 600 / 700 네 단계만 사용
- `text-body-lg`가 `<body>`에 기본 적용됨

| 토큰            | 크기 | 웨이트 | 용도                      |
| --------------- | ---- | ------ | ------------------------- |
| `text-display`  | 34px | 700    | 온보딩·환영 화면 hero     |
| `text-title`    | 28px | 700    | 화면 최상단 큰 제목       |
| `text-title-sm` | 22px | 600    | 섹션/카드 헤딩            |
| `text-body-lg`  | 17px | 500    | 주요 본문·버튼 라벨(기본) |
| `text-body`     | 15px | 400    | 일반 본문·서브 텍스트     |
| `text-caption`  | 13px | 400    | 도움말·폼 힌트            |
| `text-footnote` | 11px | 500    | 뱃지·태그·초소형 라벨     |

<br>

## 🎉Git Convention

### 📌 Git Flow

```
develop ← 작업 브랜치
```

- `main branch` : 배포 브랜치
- `develop branch` : 개발 브랜치, feature 브랜치가 merge됨
- `feature branch` : 페이지/기능 브랜치

  <br>

### ✨ Flow

- `develop 브랜치`에서 새로운 브랜치를 생성.
- 작업을 완료하고 커밋 메시지에 맞게 커밋.
- Pull Request 생성
- `develop` 브랜치로 병합.

<br>

### 🔥 Commit Message Convention

- **커밋 유형**
  - 🎉 Init: 프로젝트 세팅
  - ✨ Feat: 새로운 기능 추가
  - 🐛 Fix : 버그 수정
  - 💄 Design : UI(CSS) 수정
  - ✏️ Typing Error : 오타 수정
  - 📝 Docs : 문서 수정
  - 🚚 Mod : 폴더 구조 이동 및 파일 이름 수정
  - 💡 Add : 파일 추가 (ex- 이미지 추가)
  - 🔥 Del : 파일 삭제
  - ♻️ Refactor : 코드 리펙토링
  - 🚧 Chore : 배포, 빌드 등 기타 작업
  - 🔀 Merge : 브랜치 병합

- **형식**: `커밋유형: 상세설명`
- **예시**:
  - 🎉 Init: 프로젝트 초기 세팅
  - ✨ Feat: 메인페이지 개발

<br>

### 🌿 Branch Convention

**Branch Naming 규칙**

- **브랜치 종류**
  - `init`: 프로젝트 세팅
  - `feat`: 새로운 기능 추가
  - `fix` : 버그 수정
  - `refactor` : 코드 리펙토링

- **형식**: `브랜치종류/#이슈번호/상세기능`
- **예시**:
  - init/#1/init
  - fix/#2/splash

<br>

### 📋 Issue Convention

**Issue Title 규칙**

- **태그 목록**:
  - `Init`: 프로젝트 세팅
  - `Feat`: 새로운 기능 추가
  - `Fix` : 버그 수정
  - `Refactor` : 코드 리펙토링

- **형식**: [태그] 작업 요약
- **예시**:
  - [Init] 프로젝트 초기 세팅
  - [Feat] Header 컴포넌트 구현

<br>

## 📂 프로젝트 구조

<!-- 기능이 추가되면서 폴더 구조는 계속 바뀔 수 있음 -->

```
📦NaegiGo_FE
 ┣ 📂public
 ┃ ┗ 📂images                # next/image로 서빙되는 정적 이미지 (로고 등)
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂(auth)            # 로그인 전 화면 (URL에는 영향 없는 라우트 그룹)
 ┃ ┃ ┃ ┣ 📂login            # /login · 카카오 로그인
 ┃ ┃ ┃ ┗ 📂name             # /name · 이름 입력
 ┃ ┃ ┃   ┗ 📂edit            # /name/edit · 이름 수정
 ┃ ┃ ┣ 📂(main)             # 로그인 후 화면
 ┃ ┃ ┃ ┣ 📜page.tsx          # / · 홈 (내 방 목록)
 ┃ ┃ ┃ ┗ 📂rooms
 ┃ ┃ ┃   ┣ 📂new             # /rooms/new · 새 방 만들기
 ┃ ┃ ┃   ┣ 📂join            # /rooms/join · 방 코드 입력
 ┃ ┃ ┃   ┗ 📂[roomId]        # /rooms/[roomId] · 방 상세 (시작 전/진행 중)
 ┃ ┃ ┃     ┣ 📂edit           # /rooms/[roomId]/edit · 규칙 수정
 ┃ ┃ ┃     ┗ 📂checkin        # /rooms/[roomId]/checkin · 체크인(양심/사진 인증)
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┣ 📜globals.css
 ┃ ┃ ┗ 📜icon.png            # 파비콘 (Next.js 파일 컨벤션)
 ┃ ┣ 📂assets                 # 디자인 원천 리소스 (아이콘·폰트 등)
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┃ ┗ 📂pretendard          # Pretendard 로컬 폰트 (next/font/local, 400/500/600/700만 사용)
 ┃ ┃ ┗ 📂icons                # SVG 아이콘 원본 (SVGR로 컴포넌트처럼 import)
 ┃ ┗ 📂components
 ┃   ┗ 📂common              # 여러 화면에서 공통으로 쓰는 UI
 ┣ 📜.editorconfig
 ┣ 📜.env.example
 ┣ 📜.gitignore
 ┣ 📜.lintstagedrc.json
 ┣ 📜.nvmrc                  # Node 버전 고정
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc.json
 ┣ 📜eslint.config.mjs
 ┣ 📜next.config.ts
 ┣ 📜package.json
 ┣ 📜pnpm-lock.yaml
 ┣ 📜postcss.config.mjs
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┣ 📜vitest.config.mts
 ┗ 📜vitest.setup.ts
```

- public
  - images - 로고 등 `next/image`로 최적화되는 정적 이미지
- src
  - app - App Router 진입점, `(auth)`/`(main)` 라우트 그룹별로 화면을 분리
  - assets - 디자인 원천 리소스
    - fonts - `next/font/local`로 불러오는 로컬 폰트 (Pretendard)
    - icons - SVG 아이콘 원본. SVGR로 React 컴포넌트처럼 import해서 Tailwind로 색·크기 제어
  - components - 여러 화면에서 공통으로 쓰는 UI (`common` 등)
  - (추후 기능이 늘어나면 `hooks`, `apis`, `types`, `utils` 등을 `src` 하위에 추가)
