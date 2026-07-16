export type HistoryItem = {
  id: number;
  name: string;
  url: string;
  result?: string | undefined;
  summary?: string;
  score?: number;
  created_at: string;
};
