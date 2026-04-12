# Frontend Optimization Changes

## Summary

이번 작업에서는 `front-do1`의 초기 로딩 속도와 페이지 전환 성능을 개선하기 위해 다음 항목들을 최적화했습니다.

- 라우트 단위 코드 스플리팅 적용
- React Query 캐시 기본값 추가
- API 워밍업 요청 시점 조정
- 리스트/캘린더 데이터 요청 캐싱
- 캘린더 렌더링 비용 감소
- 이미지 로딩 우선순위 최적화
- Vite 청크 분리 설정 추가

## Key Concepts

### `lazy`란?

`React.lazy`는 컴포넌트를 "처음부터 전부 같이 다운로드하지 않고, 실제로 필요할 때 불러오는 방식"입니다.

예시:

- 기존 방식: 로그인 페이지, 메인 페이지, 캘린더 페이지 코드를 앱 시작 시 한 번에 모두 다운로드
- `lazy` 적용 후: 사용자가 해당 페이지로 이동할 때 그 페이지 코드만 다운로드

장점:

- 첫 진입 번들 크기 감소
- 초기 로딩 속도 개선
- 사용하지 않는 페이지 코드 때문에 첫 화면이 느려지는 문제 완화

### `Suspense`란?

`Suspense`는 `lazy`로 불러오는 컴포넌트가 아직 다운로드되지 않았을 때 잠시 보여줄 대체 UI를 지정하는 기능입니다.

이번 프로젝트에서는 빈 화면과 비슷한 최소 fallback을 넣어서 페이지 전환 중 구조가 깨지지 않게 했습니다.

### `loading="eager"`란?

브라우저에게 이 이미지는 "바로 로드해야 하는 중요한 이미지"라고 알려주는 속성입니다.

보통 첫 화면에서 바로 보이는 핵심 이미지에 사용합니다.

### `loading="lazy"`란?

브라우저에게 이 이미지는 "지금 당장 안 보여도 되니 나중에 로드해도 되는 이미지"라고 알려주는 속성입니다.

보통 아래쪽에 있거나, 장식용이거나, 첫 렌더에 꼭 필요하지 않은 이미지에 사용합니다.

장점:

- 초기 네트워크 요청 수 감소
- 첫 화면 렌더 속도 개선

### `fetchPriority="high"`란?

브라우저에게 특정 이미지를 "우선순위 높게 다운로드"하라고 알려주는 속성입니다.

보통 LCP 후보가 되는 큰 대표 이미지에 사용합니다.

### `decoding="async"`란?

브라우저가 이미지를 화면에 그리기 전에 수행하는 디코딩 작업을 가능한 한 비동기로 처리하도록 힌트를 주는 속성입니다.

쉽게 말하면:

- 이미지 파일을 받아온 뒤
- 브라우저가 그 이미지를 화면에 표시할 수 있는 형태로 해석하는 과정이 있는데
- 이 작업이 메인 렌더를 너무 오래 막지 않도록 돕는 옵션입니다

장점:

- 렌더링 블로킹 가능성 감소
- 여러 이미지가 있을 때 화면 반응성 개선에 도움

주의:

- `decoding="async"`는 "항상 큰 체감 향상"을 보장하는 옵션은 아니고, 브라우저에게 주는 힌트에 가깝습니다

### `staleTime`이란?

React Query에서 데이터를 "얼마 동안 신선한 데이터로 간주할지"를 정하는 값입니다.

예시:

- `staleTime: 5분`이면 한 번 받아온 데이터는 5분 동안 다시 요청하지 않고 캐시를 재사용할 수 있음

장점:

- 중복 API 호출 감소
- 페이지 재방문 시 속도 개선

### `gcTime`이란?

React Query 캐시 데이터를 메모리에 얼마나 오래 보관할지 정하는 값입니다.

예시:

- `gcTime: 30분`이면 사용하지 않는 캐시도 30분 동안 유지될 수 있음

장점:

- 짧은 시간 안에 다시 방문할 때 재요청 감소

### `manualChunks`란?

Vite/Rollup이 번들을 나눌 때 어떤 라이브러리를 어떤 청크로 분리할지 직접 지정하는 설정입니다.

예시:

- `react`, `react-dom`, `react-router-dom`을 `react` 청크로 분리
- `react-calendar`, `date-fns`를 `calendar` 청크로 분리

장점:

- 초기 엔트리 JS 크기 감소
- 무거운 라이브러리가 필요한 페이지에서만 추가 다운로드

### Code Splitting이란?

하나의 큰 JS 파일로 다 묶지 않고, 페이지나 기능별로 작은 파일 여러 개로 나누는 최적화 방식입니다.

`lazy`는 React에서 code splitting을 쉽게 적용하는 대표 방법입니다.

### LCP, FCP와 이미지 최적화 관계

- `FCP`: 사용자가 처음으로 화면에 콘텐츠를 보는 시점
- `LCP`: 화면에서 가장 큰 주요 콘텐츠가 보이는 시점

첫 화면의 큰 이미지가 늦게 로드되면 LCP가 느려질 수 있습니다.

그래서 이번에는:

- 중요한 이미지는 더 빨리 로드
- 덜 중요한 이미지는 늦게 로드

하도록 조정했습니다.

## 1. Route Lazy Loading

파일: `src/App.jsx`

변경 내용:

- `React.lazy`와 `Suspense`를 사용해 페이지 컴포넌트를 지연 로딩하도록 변경
- `WelcomePage`, `LoginPage`, `SignupPage`, `MainPage`, `MissionPage`, `ListPage`, `CalenderPage`, `ProfilePage`를 각각 분리 로드

목적:

- 앱 첫 진입 시 모든 페이지 코드를 한 번에 받지 않도록 함
- 초기 JS 번들 크기를 줄여 첫 로딩 속도 개선

관련 개념:

- `lazy`
- `Suspense`
- code splitting

## 2. React Query Default Cache Options

파일: `src/App.jsx`

변경 내용:

- `QueryClient`에 기본 옵션 추가
- `staleTime: 5분`
- `gcTime: 30분`
- `refetchOnWindowFocus: false`
- `retry: 1`

목적:

- 같은 데이터를 짧은 시간 안에 반복 요청하지 않도록 함
- 탭 전환 시 불필요한 재요청 방지

관련 개념:

- `staleTime`
- `gcTime`

## 3. API Warm-up Timing Optimization

파일: `src/api/user.js`

변경 내용:

- 기존에는 모듈 로드 직후 바로 `/health` 요청 실행
- 현재는 `requestIdleCallback` 또는 `setTimeout`으로 브라우저가 한가할 때 워밍업 수행
- `sessionStorage`의 `api_warmed` 값을 사용해 세션당 1회만 실행

목적:

- 첫 화면 렌더 시점의 네트워크 경쟁 감소
- 콜드 스타트 완화 효과는 유지하면서 초기 렌더 방해 최소화

## 4. Mission Query Cache Tuning

파일: `src/hooks/useGetMission.js`

변경 내용:

- `staleTime: 10분`
- `refetchOnWindowFocus: false`

목적:

- 동일 세션에서 미션 데이터를 불필요하게 다시 받아오지 않도록 조정

## 5. List Page Optimization

파일: `src/pages/ListPage/ListPageComponent/ListPageComponent.jsx`

변경 내용:

- `useEffect + useState` 방식에서 `useQuery` 방식으로 변경
- 리스트 데이터를 캐시해 재방문 시 재요청 감소
- 필터링 결과를 `useMemo`로 계산
- 리스트 key를 안전한 문자열 기반으로 조정

목적:

- 리스트 페이지 재진입 시 속도 개선
- 필터 변경 시 불필요한 계산 감소

관련 개념:

- 캐시
- memoization

## 6. Calendar Page Optimization

파일: `src/pages/CalenderPage/CalenderComponent/CalenderComponent.jsx`

변경 내용:

- `useEffect + useState` 방식에서 `useQuery`로 변경
- `missionRecord`를 `Map`으로 변환해 날짜 lookup 비용 감소
- 성공 개수 계산을 `useMemo`로 최적화
- 연속 성공 계산을 `useMemo`로 최적화
- 각 타일 렌더 시 배열 전체를 `find()` 하던 구조 제거

목적:

- 캘린더 렌더링 성능 개선
- 데이터가 많아질수록 반복 탐색 비용이 커지는 문제 완화

관련 개념:

- `useMemo`
- `Map`
- 렌더링 비용 감소

## 7. Image Loading Optimization

변경 파일:

- `src/pages/WelcomePage/WelcomeComponent/WelcomeComponent.jsx`
- `src/components/Main/Main.jsx`
- `src/components/Header/Header.jsx`
- `src/components/Footer/Footer.jsx`
- `src/pages/LoginPage/LoginForm/LoginForm.jsx`
- `src/pages/SignupPage/SignupForm/SignupForm.jsx`
- `src/pages/MissionPage/GetMission/GetMission.jsx`

변경 내용:

- 첫 화면 핵심 이미지:
  - `fetchPriority="high"`
  - `loading="eager"`
  - `decoding="async"`
- 장식성 이미지 및 비핵심 이미지:
  - `loading="lazy"`
  - `decoding="async"`

목적:

- LCP 후보 이미지는 더 빨리 로드
- 비핵심 이미지는 뒤로 미뤄 초기 네트워크 부담 감소

관련 개념:

- `loading="eager"`
- `loading="lazy"`
- `fetchPriority="high"`
- `decoding="async"`

주의:

- 이번 변경은 이미지 "파일 크기" 자체를 줄인 것은 아님
- PNG를 WebP/AVIF로 바꾸는 추가 최적화는 아직 별도 작업이 필요함

## 8. Removed Unused Import

파일: `src/pages/MainPage/MainPage.jsx`

변경 내용:

- 사용되지 않던 `TimerStart` import 제거

목적:

- 불필요한 코드 정리

## 9. Vite Manual Chunk Splitting

파일: `vite.config.js`

변경 내용:

- `manualChunks` 설정 추가
- `react`: `react`, `react-dom`, `react-router-dom`
- `query`: `@tanstack/react-query`
- `calendar`: `react-calendar`, `date-fns`

목적:

- 자주 바뀌지 않는 라이브러리 청크 분리
- 초기 엔트리 번들 크기 감소
- 라우트별 다운로드 분산

관련 개념:

- `manualChunks`
- code splitting

## Build Result


효과:
- 메인 엔트리 JS 크기가 이전보다 줄어듦
- 페이지별 JS/CSS 청크가 분리되어 초기 로딩 부담 완화

## Remaining High-Impact Next Step

아직 남아 있는 가장 큰 최적화 포인트는 이미지 파일 자체의 용량 축소입니다.



