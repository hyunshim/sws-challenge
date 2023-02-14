export type Price = {
  company_id: string;
  date: Date;
  price: number;
};

export type Score = {
  id: number;
  dividend: number;
  future: number;
  health: number;
  management: number;
  past: number;
  value: number;
  misc: number;
  total: number;
  company_id: string;
};

export type Company = {
  id: string;
  name: string;
  unique_symbol: string;
  scores: Score[];
  prices: Price[];
  share_price: number;
  company_score: number;
  volatility: number;
};

export type HeaderRow = {
  key: string;
  label: string;
};

export interface CompanyProps {
  companies: Company[];
}

export interface TableProps {
  table_data: Any;
  table_headers: HeaderRow[];
  table_view: Any;
  score_filter: Any;
  ticker_filter: Any;
}
