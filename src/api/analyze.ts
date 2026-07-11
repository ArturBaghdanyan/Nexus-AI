import axios from "axios";

export const analyzeRepository = async (
  mode: "url" | "code",
  prompt: string,
  language: string,
) => {
  try {
    const response = await axios.post(
      "/api/generate",
      {
        mode,
        prompt,
        language,
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    console.log("API response:", response.data);
    return response.data.result;
  } catch (error) {
    console.error("Error analyzing repository:", error);
    throw error;
  }
};
