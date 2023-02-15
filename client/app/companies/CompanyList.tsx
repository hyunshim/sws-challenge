"use client";

import { Company, CompanyProps, HeaderRow } from "../../typings";
import TableView from "../../components/TableView";
import React from "react";
import Link from "next/link";

/**
 * Generates a company list using TableView
 * @param companies: takes in company data
 * @returns Table View for companies
 */
function CompanyList({ companies }: CompanyProps) {
  const headers: HeaderRow[] = [
    { key: "name", label: "name" },
    { key: "unique_symbol", label: "ticker" },
    { key: "company_score", label: "score" },
    { key: "share_price", label: "price" },
    { key: "volatility", label: "volatility" },
  ];

  const company_view = (company: Company) => {
    return (
      <tr key={company.id}>
        <td className="pl-6 py-4">
          <Link href={`/companies/${company.id}`}>{company.name}</Link>
        </td>
        <td className="px-6 py-4">{company.unique_symbol}</td>
        <td className="px-6 py-4">{company.company_score}</td>
        <td className="px-6 py-4">$ {company.share_price.toFixed(2)}</td>
        <td className="px-6 py-4">{company.volatility.toFixed(2)} %</td>
      </tr>
    );
  };

  const score_filter = (
    company: Company,
    minScore: number,
    maxScore: number
  ) => {
    return (
      minScore <= company.company_score && company.company_score <= maxScore
    );
  };

  const ticker_filter = (company: Company, query: string) => {
    return company.unique_symbol.toLowerCase().includes(query.toLowerCase());
  };

  return (
    <div>
      <TableView
        table_data={companies}
        table_headers={headers}
        table_view={company_view}
        score_filter={score_filter}
        ticker_filter={ticker_filter}
      />
    </div>
  );
}

export default CompanyList;
