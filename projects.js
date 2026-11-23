const PROJECTS = [
  {
    id: "daily-grid",
    title: "데일리 3x3 그리드 퍼즐",
    description: "매일 자정 갱신되는 조건에 맞춰 9칸을 채우는 웹 퍼즐 게임.",
    category: "게임",
    type: "web", // "web" | "local"
    url: "https://kivotos-grid.slpi.uk/",
    repo: "https://github.com/username/daily-grid", // 생략 가능
    thumb: "assets/thumbs/daily-grid.webp",
    tags: ["퍼즐", "데일리", "웹앱"],
    updated: "2026-11"
  },
  {
    id: "tier-maker",
    title: "커스텀 티어 랭킹기",
    description: "다중 피벗 비교 알고리즘으로 빠르게 순위를 매기고 결과 이미지를 저장.",
    category: "유틸리티",
    type: "web",
    url: "https://schaletier.slpi.uk/",
    repo: "https://github.com/username/tier-maker",
    thumb: "assets/thumbs/tier-maker.webp",
    tags: ["정렬", "랭킹", "PNG저장"],
    updated: "2026-11"
  },
  {
    id: "image-merger",
    title: "로컬 이미지 병합 유틸리티",
    description: "PNG/SVG 이미지를 투명 여백 조절과 함께 합쳐주는 데스크톱 GUI 도구.",
    category: "도구",
    type: "local",
    url: "https://github.com/username/image-merger/releases",
    repo: "https://github.com/username/image-merger",
    thumb: "assets/thumbs/image-merger.webp",
    tags: ["Python", "GUI", "이미지"],
    updated: "2026-08"
  }
];