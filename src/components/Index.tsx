"use client";
import { useEffect, useState } from "react";
import { fetchHistory } from "../hooks/useFetch";
import { analyzeRepository } from "../api/analyze";
import HistoryAnalyze from "./SideBar/HistoryAnalyze";
import { Analyze } from "./Analyze/Analyze";
import ReviewResult from "./Result/ReviewResult";
import { HistoryItem } from "../types/historyType";

const Index = () => {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"url" | "code">("url");
  const [language] = useState("English");
  const [list, setList] = useState<HistoryItem[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchHistory();
        setList(data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };
    loadHistory();
  }, []);

  const handleAnalyze = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (analyzing) return;

    setAnalyzing(true);
    setError("");
    try {
      const res = await analyzeRepository(
        mode,
        mode === "url" ? url : code,
        language,
      );
      setResult(res);
      const data = await fetchHistory();
      setList(data);
    } catch (err: any) {
      const message =
        err?.response?.data?.details ||
        err?.response?.data?.error ||
        "Something went wrong while analyzing. Please try again.";
      setError(message);
      console.error("Error analyzing:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleOpen = (id: number) => {
    const selectedItem = list.find((item) => item.id === id);
    if (selectedItem && selectedItem.result) {
      setResult(selectedItem.result);
      setOpenItemId(id);
    } else {
      console.error("Item not found or result is empty");
    }
  };

  return (
    <>
      <HistoryAnalyze data={list} handleOpen={handleOpen} />
      <ReviewResult result={result} key={openItemId ?? "default"} />
      <Analyze
        url={url}
        language={language}
        setUrl={setUrl}
        handleAnalyze={handleAnalyze}
        code={code}
        setCode={setCode}
        mode={mode}
        setMode={setMode}
      />
      {error && (
        <p style={{ color: "#f87171", textAlign: "center", margin: "12px 0" }}>
          {error}
        </p>
      )}
    </>
  );
};

export default Index;
