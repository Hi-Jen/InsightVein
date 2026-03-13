# InsightVein 💡
> AI-Powered Automated Technology Research & Insight Generator

InsightVein은 Tavily Search API와 Google Gemini 1.5 Flash를 결합하여 복잡한 기술 리서치 과정을 자동화하는 웹 애플리케이션입니다. 사용자가 입력한 키워드를 바탕으로 최신 정보를 수집, 요약하고 시각화된 인사이트 리포트를 제공합니다.

## ✨ Key Features
- **Real-time Research Pipeline**: 수집 → 요약 → 인사이트 → 리포트 생성 과정을 실시간 스트리밍으로 중계.
- **Tavily Web Search**: 최신 웹 데이터를 직접 크롤링하여 정확한 시장 트렌드 반영.
- **Visualized Insights**: Mermaid.js를 활용한 아키텍처 및 흐름도 자동 생성.
- **Export to PDF/Markdown**: 프리미엄 디자인의 리포트를 다양한 포맷으로 소장 가능.
- **Modern UI/UX**: Next.js 14, Tailwind CSS 4, Framer Motion 기반의 글래스모피즘 디자인.

## 🛠 Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS, Framer Motion
- **AI/Backend**: Google Gemini API, Tavily Search API, Node.js (Edge Runtime)
- **Utilities**: Lucide React, react-markdown, mermaid.js, html2pdf.js

## 🚀 Getting Started

### 1. Close the repository
```bash
git clone https://github.com/[YOUR_USERNAME]/InsightVein.git
cd InsightVein
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
`.env.local` 파일을 생성하고 다음 키를 설정하세요:
```env
GEMINI_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
```

### 4. Run Development Server
```bash
npm run dev
```

## 📄 License
MIT License
