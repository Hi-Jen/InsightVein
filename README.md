# InsightVein

**InsightVein**은 최신 기술 데이터를 실시간으로 발굴하여 전문적인 리포트로 가공해주는 리서치 자동화 서비스입니다. Tavily Search API와 Google Gemini 1.5 Flash를 결합하여 데이터 수집부터 요약, 인사이트 도출, 그리고 시각화 다이어그램이 포함된 리포트 생성까지의 과정을 자동화합니다.

## 🌟 Key Features

- **Tavily AI Search**: 실시간 웹 검색을 통해 최신 기술 동향 및 데이터를 수집합니다.
- **AI-Powered Analysis**: Gemini 1.5 Flash 모델이 수집된 데이터를 분석하여 요약 및 심층 인사이트를 도출합니다.
- **Real-time Streaming**: `ReadableStream`을 통해 리서치의 각 단계(검색 -> 요약 -> 분석 -> 리포트)를 실시간으로 중계합니다.
- **Mermaid.js Diagram**: 기술 구조나 흐름을 이해하기 쉽게 도와주는 아키텍처 다이어그램을 자동으로 생성합니다.
- **Export to PDF/Markdown**: 완성된 리포트를 다양한 포맷으로 다운로드할 수 있습니다.
- **References section**: 리서치에 사용된 원문 출처를 자동으로 리스트업하여 신뢰성을 확보합니다.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4, Framer Motion (Glassmorphism UI)
- **AI APIs**: Google Gemini API, Tavily Search API
- **Icons**: Lucide React
- **Dependencies**: react-markdown, mermaid.js, html2pdf.js

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+
- API Keys: [Gemini API Key](https://aistudio.google.com/), [Tavily API Key](https://tavily.com/)

### 2. Installation
```bash
git clone https://github.com/your-username/InsightVein.git
cd InsightVein
npm install
```

### 3. Environment Variables
`.env.local` 파일을 생성하고 아래 키를 입력하세요:

```env
GEMINI_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
```

### 4. Run Development Server
```bash
npm run dev
```
이제 `http://localhost:3000`에서 서비스를 이용할 수 있습니다.

## 📝 License
This project is licensed under the MIT License.
