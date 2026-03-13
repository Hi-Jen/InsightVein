import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // Streaming works best with edge runtime

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const sendStep = (step: number, message: string, data?: any) => {
          controller.enqueue(encoder.encode(JSON.stringify({ step, message, data }) + "\n"));
        };

        try {
          // 1단계: Tavily 검색
          sendStep(1, "최신 기술 동향 검색 중 (Tavily)...");

          let searchResults = [];
          if (TAVILY_API_KEY) {
            const searchResponse = await fetch("https://api.tavily.com/search", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                api_key: TAVILY_API_KEY,
                query: topic,
                search_depth: "advanced",
                max_results: 5,
              }),
            });
            const searchData = await searchResponse.json();
            searchResults = searchData.results || [];
          } else {
            sendStep(1, "TAVILY_API_KEY가 없어 가상 검색 엔진을 사용합니다...");
            // Fallback or dummy data for simulation if key is missing
            searchResults = [
              { title: `${topic} 개요`, content: `${topic}에 대한 최신 트렌드와 기술적 특징을 분석합니다.`, url: "#" }
            ];
          }

          const context = searchResults.map((r: { url: string, title: string, content: string }) => `Source: ${r.url}\nTitle: ${r.title}\nContent: ${r.content}`).join("\n\n");
          const references = searchResults.map((r: { title: string, url: string }) => ({ title: r.title, url: r.url }));

          // 2단계: Gemini 요약
          sendStep(2, "검색 결과 요약 중 (Gemini)...");
          const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

          const summaryPrompt = `다음 검색 결과를 바탕으로 "${topic}"의 핵심 내용을 3-5문장으로 요약해줘.\n\n${context}`;
          const summaryResult = await model.generateContent(summaryPrompt);
          const summary = summaryResult.response.text();

          // 3단계: 인사이트 및 Mermaid 다이어그램 도출
          sendStep(3, "기술 인사이트 및 아키텍처 다이어그램 생성 중...");
          const insightPrompt = `
            주제: ${topic}
            검색 결과: ${context}
            
            요구사항:
            1. 이 기술의 핵심 트렌드, 장점, 단점을 분석해줘.
            2. 이 기술의 작동 원리나 구조를 설명하는 Mermaid.js 다이어그램 코드(sequenceDiagram 또는 graph TD 등)를 하나 생성해줘. 
               다이어그램 코드는 \`\`\`mermaid 내부에 작성해줘.
            
            한국어로 답변해줘.
          `;
          const insightResult = await model.generateContent(insightPrompt);
          const insights = insightResult.response.text();

          // 4단계: 최종 마크다운 리포트 생성
          sendStep(4, "최종 리포트 구성 및 References 추가 중...");
          const reportPrompt = `
            기술 리포트 작성: ${topic}
            요약내용: ${summary}
            인사이트 및 다이어그램: ${insights}
            
            위 조각들을 합쳐서 전문적인 마크다운 형식의 리포트를 만들어줘.
            마지막에는 '## References' 섹션을 만들고 다음 사이트들을 리스트업해줘:
            ${references.map((r: { title: string, url: string }) => `- [${r.title}](${r.url})`).join("\n")}
            
            한국어로 작성해줘.
          `;
          const reportResult = await model.generateContent(reportPrompt);
          const report = reportResult.response.text();

          // 최종 데이터 전송
          sendStep(5, "완료", { summary, insights, report });
          controller.close();
        } catch (error: any) {
          controller.enqueue(encoder.encode(JSON.stringify({ error: error.message }) + "\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
