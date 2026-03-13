# InsightVein 🧠💎

> **AI-Powered Technical Research Automation Engine**

InsightVein은 Tavily Search API를 사용하여 실시간 기술 데이터를 수집하고, Google Gemini 1.5/2.0 엔진을 통해 심층 분석 및 구조화된 마크다운 리포트를 생성하는 차세대 기술 리서치 자동화 툴입니다.

---

## ✨ 주요 기능 (Key Features)

- **🔍 Tavily AI Search**: 최신 웹 데이터를 실시간으로 수집하여 환각(Hallucination) 없는 실제 정보를 기반으로 분석합니다.
- **⚡ 실시간 스트리밍(Streaming)**: 백엔드 분석 과정을 사용자에게 즉각적으로 중계하여 리서치 단계별 진행 상황을 실시간으로 확인할 수 있습니다.
- **📊 Mermaid.js 자동 시각화**: 복잡한 기술 구조나 흐름도를 Gemini가 직접 Mermaid 문법으로 설계하고 UI에서 시각화해 줍니다.
- **📝 전문 마크다운 리포트**: 요약, 인사이트, 다이어그램, 그리고 실제 출처(References)를 모두 포함한 완결성 있는 기술 리포트를 제공합니다.
- **💎 프리미엄 디자인**: Next.js 15와 Tailwind CSS 4를 기반으로 한 세련된 다크 글래스모피즘(Glassmorphism) UI를 자랑합니다.

## 🚀 시작하기 (Getting Started)

### 기술 스택
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4, Framer Motion
- **AI Engine**: Google Gemini API (@google/generative-ai)
- **Search**: Tavily Search API
- **Rendering**: React Markdown, Mermaid.js

### 설치 및 로컬 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/사용자계정/InsightVein.git
   cd InsightVein
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   `.env.local` 파일을 루트 디렉토리에 생성하고 아래 키를 입력하세요.
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   TAVILY_API_KEY=your_tavily_api_key
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```

## 📸 주요 화면 (Screenshots)

*(여기에 실제 실행 화면 캡처 이미지를 추가하면 좋습니다!)*
- 리서치 진행 애니메이션 뷰
- Mermaid 다이어그램이 포함된 리포트 상세 페이지

## 📜 라이선스 (License)

이 프로젝트는 MIT 라이선스를 따릅니다.

---

**InsightVein** - 기술의 핵심을 꿰뚫는 가장 스마트한 방법.
