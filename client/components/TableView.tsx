"use client";
import { useState } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import { TableProps, HeaderRow } from "../typings";
function TableView({
  table_data,
  table_headers,
  table_view,
  score_filter,
  ticker_filter,
}: TableProps) {
  const [data, setData] = useState(table_data);
  const [order, setOrder] = useState("ASC");
  const [sortedKey, setSortedKey] = useState("name");
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(20);
  const [query, setQuery] = useState("");

  const sortData = (sortKey: string) => {
    let sortedData;

    if (sortKey !== sortedKey || order === "ASC") {
      sortedData = [...data].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
    } else if (order === "DESC") {
      sortedData = [...data].sort((a, b) => (a[sortKey] < b[sortKey] ? 1 : -1));
    }
    setOrder(order === "ASC" ? "DESC" : "ASC");
    setSortedKey(sortKey);
    setData(sortedData);
  };

  const filterByScore = (minScore: number, maxScore: number) => {
    setMinScore(minScore);
    setMaxScore(maxScore);
  };

  const filterByTicker = (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-row items-center py-6 h-30">
        <p className="mr-6">Filters</p>
        <div className="flex flex-row bg-secondary rounded-full px-4 py-1 mr-6 w-2/7">
          <p className="mr-3">Score</p>
          <MultiRangeSlider
            min={0}
            max={20}
            onChange={({ min, max }: { min: number; max: number }) =>
              filterByScore(min, max)
            }
          />
          <p className="ml-3">
            {minScore} - {maxScore}
          </p>
        </div>
        <div className="flex flex-row bg-secondary rounded-full px-4 py-1 mr-6 w-1/3">
          <p className="mr-3">Ticker</p>
          <input
            data-testid="ticker-filter"
            onChange={filterByTicker}
            className="bg-transparent focus:outline-none w-full"
            placeholder="Filter by ticker..."
          />
        </div>
      </div>

      {/* Company View */}
      <div className="rounded-lg bg-secondary">
        <table className="min-w-full text-sm divide-y">
          <thead className="text-xs uppercase font-medium">
            <tr>
              {table_headers.map((row: HeaderRow) => {
                return (
                  <th
                    key={row.key}
                    onClick={() => sortData(row.key)}
                    className="px-6 py-3 text-left tracking-wider cursor-pointer"
                  >
                    {row.label} {sortedKey === row.key ? "▼" : "▲"}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody data-testid="table-body" className="divide-y divide-white/10">
            {data
              .filter((row: Object) => score_filter(row, minScore, maxScore))
              .filter((row: Object) => ticker_filter(row, query))
              .map(table_view)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableView;
