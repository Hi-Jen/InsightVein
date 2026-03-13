"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Download, FileText, Sparkles, BrainCircuit, LineChart, FileOutput, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Mermaid from "./components/Mermaid";
// html2pdf is imported dynamically inside downloadPDF to avoid SSR issues

interface ResearchData {
  search: string;
  summary: string;
  insights: string;
  report: string;
}

export default function Home() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0: Idle, 1: Search, 2: Summarize, 3: Insights, 4: Report
  const [data, setData] = useState<ResearchData | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const steps = [
    { title: "데이터 수집", icon: Search, description: "웹에서 기술 정보를 검색하고 수집 중입니다..." },
    { title: "핵심 요약", icon: BrainCircuit, description: "수집된 정보를 바탕으로 핵심 내용을 요약 중입니다..." },
    { title: "인사이트 도출", icon: LineChart, description: "기술적 트렌드와 장단점을 분석하여 인사이트를 생성 중입니다..." },
    { title: "리포트 완성", icon: FileOutput, description: "최종 마크다운 리포트를 구성하는 중입니다..." },
  ];

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setData(null);
    setStep(1);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!response.body) throw new Error("ReadableStream not supported");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const chunk = JSON.parse(line);
          
          if (chunk.error) throw new Error(chunk.error);
          
          if (chunk.step) setStep(chunk.step);
          if (chunk.data) {
             setData(chunk.data);
          }
        }
      }
      
      setStep(4);
    } catch (error: any) {
      console.error(error);
      alert(`리서치 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const downloadMarkdown = () => {
    if (!data) return;
    const blob = new Blob([data.report], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic}_insightvein_report.md`;
    a.click();
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    
    // Dynamic import to avoid "self is not defined" error in SSR
    const html2pdf = (await import("html2pdf.js")).default;
    
    const element = reportRef.current;
    const opt = {
      margin: 1,
      filename: `${topic}_report.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="min-h-screen bg-mesh text-zinc-100 flex flex-col items-center">
      {/* Search Header */}
      <header className="w-full max-w-5xl px-6 py-12 flex flex-col items-center text-center gap-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-primary font-bold tracking-widest text-sm uppercase"
        >
          <Sparkles className="w-4 h-4" />
          Powered by Gemini 1.5 Pro
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent"
        >
          InsightVein
        </motion.h1>
        
        <motion.p 
          className="text-zinc-400 max-w-lg text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          복잡한 기술 리서치를 자동화하고, 구조화된 인사이트 리포트를 즉시 생성하세요.
        </motion.p>

        <motion.form 
          onSubmit={handleResearch} 
          className="relative w-full max-w-2xl mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative group">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="궁금한 기술 주제를 입력하세요 (예: Next.js 15, AI Agents)"
              className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-zinc-500 glass transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-3 bottom-3 px-6 bg-primary hover:bg-blue-600 disabled:bg-zinc-700 text-white rounded-xl transition-all flex items-center gap-2 font-medium"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? "분석 중..." : "리서치 시작"}
            </button>
          </div>
        </motion.form>
      </header>

      {/* Content Area */}
      <main className="w-full max-w-5xl px-6 pb-24">
        {loading && (
          <div className="flex flex-col gap-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((s, i) => {
                const isActive = step === i + 1;
                const isCompleted = step > i + 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-2xl border flex flex-col items-center text-center gap-4 transition-all ${
                      isActive ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(59,130,246,0.2)]" : 
                      isCompleted ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/5 border-white/5"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isActive ? "bg-primary text-white animate-pulse" : 
                      isCompleted ? "bg-emerald-500 text-white" : "bg-zinc-800 text-zinc-500"
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isActive ? "text-primary" : isCompleted ? "text-emerald-500" : "text-zinc-400"}`}>
                        {s.title}
                      </h3>
                      {isActive && <p className="text-xs text-zinc-500 mt-2">{s.description}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence>
          {data && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-8"
            >
              {/* Stats / Summary Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl glass-card border-white/10 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                    <BrainCircuit className="w-4 h-4" /> 리서치 요약
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">
                    {String(data.summary)}
                  </p>
                </div>
                <div className="p-8 rounded-3xl glass-card border-white/10 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-wider">
                    <LineChart className="w-4 h-4" /> 핵심 인사이트
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">
                    {String(data.insights)}
                  </p>
                </div>
              </div>

              {/* Main Report Section */}
              <div className="relative p-10 md:p-16 rounded-[40px] glass-card border-white/10 overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
                
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <FileText className="w-5 h-5" />
                    <span className="font-mono text-sm uppercase tracking-widest">{topic} Insight Report</span>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={downloadMarkdown}
                      className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-zinc-300 flex items-center gap-2 group"
                    >
                      <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                      Markdown
                    </button>
                    <button 
                      onClick={downloadPDF}
                      className="p-3 bg-primary/20 hover:bg-primary/30 border border-primary/20 rounded-xl transition-all text-primary flex items-center gap-2 group"
                    >
                      <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                      PDF 리포트
                    </button>
                  </div>
                </div>

                <div ref={reportRef} className="prose prose-invert prose-zinc max-w-none">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-mermaid/.exec(className || "");
                        return !inline && match ? (
                          <Mermaid chart={String(children).replace(/\n$/, "")} />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {data.report}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full max-w-5xl px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 text-sm">
        <div>© 2026 InsightVein. All rights reserved.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Github</a>
          <a href="#" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
        </div>
      </footer>
    </div>
  );
}
