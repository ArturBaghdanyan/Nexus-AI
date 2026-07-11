"use client";
import HistoryAnalyze from "./SideBar/HistoryAnalyze";
import { Analyze } from "./Analyze/Analyze";
import ReviewResult from "./Result/ReviewResult";
import { useEffect, useState } from "react";
import { analyzeRepository } from "../api/analyze";
import { supabase } from "../lib/supabase";
import { fetchHistory } from "../hooks/useFetch";

type HistoryItem = {
  name: string;
  url: string;
  createdAt: number;
};
const Index = () => {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"url" | "code">("url");
  const [language] = useState("English");
  const [list, setList] = useState<HistoryItem[]>([]);

  const loadHistory = async () => {
    const data = await fetchHistory();
    console.log("Fetched history:", data);
    setList(data);
  };

  useEffect(() => {
    const initHistory = async () => {
      const data = await fetchHistory();
      setList(data);
    };

    initHistory();
  }, []);

  const handleAnalyze = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error } = await supabase
      .from("history")
      .insert([{ name: url.split("/").pop() || url, url: url }]);

    if (error) console.error("Error inserting:", error);
    else loadHistory();

    analyzeRepository(mode, mode === "url" ? url : code, language)
      .then((res) => setResult(res))
      .catch((err) => console.error("Error:", err));
  };
  return (
    <>
      <HistoryAnalyze data={list} />
      <Analyze
        url={url}
        language={language}
        setUrl={setUrl}
        handleAnalyze={(e) => handleAnalyze(e)}
        code={code}
        setCode={setCode}
        mode={mode}
        setMode={setMode}
      />
      <ReviewResult result={result} />
    </>
  );
};

export default Index;
