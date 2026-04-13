1. Code Splitting
하나의 큰 JS 번들을 여러 개의 작은 청크로 나누는 방식
초기 로딩 성능 개선

2. React.lazy
컴포넌트를 필요할 때 동적으로 로드하는 기능
코드 스플리팅을 구현하는 방법

3. Suspense
lazy 로딩 중일 때 보여줄 fallback UI를 처리하는 기능

4. React Query 캐싱
staleTime
데이터를 “신선한 상태”로 유지하는 시간
해당 시간 동안 재요청 없이 캐시 사용
gcTime
사용되지 않는 캐시 데이터를 메모리에 유지하는 시간

5. API Warm-up
서버 초기 응답 지연을 줄이기 위해 미리 요청을 보내는 전략
실행 시점 최적화 중요

6. Memoization
useMemo
연산 결과를 캐싱하여 불필요한 재계산 방지

7. 데이터 구조 최적화
Map
key 기반 조회 성능이 빠른 자료구조
반복 탐색 비용 감소

8. 이미지 로딩 최적화
loading="eager"
즉시 로드 (중요 이미지)
loading="lazy"
지연 로드 (비핵심 이미지)
fetchPriority="high"
다운로드 우선순위 증가
decoding="async"
이미지 디코딩을 비동기로 처리

9. Web Vitals
FCP (First Contentful Paint)
첫 콘텐츠가 화면에 표시되는 시점
LCP (Largest Contentful Paint)
가장 큰 콘텐츠가 렌더링되는 시점

10. Vite 번들 최적화
manualChunks
라이브러리를 특정 청크로 분리하는 설정

11. 렌더링 최적화
불필요한 연산 및 반복 탐색 제거
컴포넌트 렌더 비용 감소

12. 캐싱 전략
네트워크 요청 최소화
재방문 시 빠른 응답 제공

staleTime: 1000 * 60 * 5, => 5분마다 데이터를 신선하게 유지