# InsightVein 🔍

**InsightVein**은 AI를 활용하여 복잡한 기술 리서치 과정을 자동화하고, 심도 있는 인사이트 리포트를 실시간으로 생성해주는 프리미엄 웹 도구입니다.

## ✨ 주요 기능

- **실시간 웹 데이터 수집**: [Tavily Search API](https://tavily.com/)를 연동하여 최신 기술 정보를 검색합니다.
- **AI 기반 분석 & 요약**: Google의 **Gemini 2.0 / 1.5 Flash** 모델을 사용하여 방대한 데이터를 핵심 요약하고 인사이트를 도출합니다.
- **지능형 리포트 생성**: Markdown 형식의 구조화된 리포트와 함께 시스템 아키텍처를 보여주는 **Mermaid.js** 다이어그램을 자동 생성합니다.
- **실시간 스트리밍 UI**: 리서치의 모든 단계를 `ReadableStream`을 통해 실시간으로 중계하며, 시각적인 애니메이션을 제공합니다.
- **내보내기 기능**: 완성된 리포트를 Markdown 혹은 PDF 파일로 즉시 다운로드할 수 있습니다.

## 🛠 기술 스택

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4
- **Animation**: Framer Motion
- **AI/Backend**: Google Gemini API, Tavily API, Node.js Edge Runtime
- **Tools**: Lucide React, Mermaid.js, React Markdown, html2pdf.js

## 🚀 시작하기

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 키를 입력하세요:

```env
GEMINI_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
```

### 2. 의존성 설치 및 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 접속 후 리서치하고자 하는 기술 주제를 입력하세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
