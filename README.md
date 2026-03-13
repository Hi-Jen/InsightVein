# InsightVein 🔍

**InsightVein**은 최신 기술 동향을 자동으로 탐색하고, 깊이 있는 인사이트와 시각화된 아키텍처 다이어그램을 제공하는 AI 기반 기술 리서치 자동화 웹 애플리케이션입니다.

![InsightVein Preview](https://via.placeholder.com/1200x600?text=InsightVein+Preview)

## ✨ 주요 기능

- **실시간 웹 데이터 수집**: Tavily Search API를 통합하여 최신 기술 문서를 실시간으로 검색합니다.
- **실시간 리서치 스트리밍**: `ReadableStream`을 통해 데이터 수집부터 리포트 완성까지의 과정을 실시간으로 중계합니다.
- **AI 기반 인사이트 도출**: Google Gemini 1.5 Flash 모델이 방대한 데이터를 요약하고 핵심 기술적 가치를 분석합니다.
- **Mermaid.js 아키텍처 시각화**: 복잡한 기술 구조를 한눈에 볼 수 있도록 다이어그램을 자동으로 생성하고 렌더링합니다.
- **전문적인 리포트 내보내기**: 완성된 리서치 결과를 Markdown 및 PDF 포맷으로 다운로드할 수 있습니다.
- **자동 출처 표기**: 리서치에 사용된 모든 웹 리소스를 'References' 섹션에 자동으로 기록합니다.

## 🚀 시작하기

### 필수 요구사항

- [Node.js](https://nodejs.org/) (v18+)
- [Gemini API Key](https://aistudio.google.com/)
- [Tavily API Key](https://tavily.com/)

### 설치 및 로컬 실행

1. 저장소 클론:
```bash
git clone https://github.com/사용자계정/InsightVein.git
cd InsightVein
```

2. 의존성 설치:
```bash
npm install
```

3. 환경 변수 설정 (`.env.local` 생성):
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
```

4. 개발 서버 실행:
```bash
npm run dev
```

이제 `http://localhost:3000`에서 InsightVein을 경험할 수 있습니다!

## 🛠 기술 스택

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **AI**: [Google Gemini Pro/Flash](https://deepmind.google/technologies/gemini/), [Tavily AI](https://tavily.com/)
- **UI/UX**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Visuals**: [Mermaid.js](https://mermaid.js.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📄 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다.

---
Built with ❤️ by [Your Name/Team]
