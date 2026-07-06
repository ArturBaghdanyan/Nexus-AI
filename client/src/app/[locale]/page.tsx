"use client";

import { useState } from "react";
import axios from "axios";
import ReviewResult from "@/src/components/Result/ReviewResult";
import { Analyze } from "../../components/Analyze";
import Header from "@/src/components/Header/Header";

export default function LocalePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [language] = useState("English");

  const handleAnalyze = async () => {
    console.log("Analyzing repository:", url);
    console.log("Selected language:", language);

    try {
      const response = await axios.post(
        "/api/generate",
        { prompt: url, language },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;
      console.log("AI Response:", data.result);
      setResult(data.result);
    } catch (error) {
      console.error("Error analyzing repository:", error);
      // handle error state here, e.g. setError(...)
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Header />
      <Analyze
        url={url}
        language={language}
        setUrl={setUrl}
        handleAnalyze={handleAnalyze}
      />
      <ReviewResult result={result} />
    </div>
  );
}
