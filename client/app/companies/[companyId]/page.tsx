import React from "react";
import { Company, CompanyPageProps } from "../../../typings";

/**
 * Fetch data for a company using its id. Uses Static Site Generation to optimise speed.
 * @param companyId id of the company we want to get the data for
 * @returns A company object with the required data
 */
const fetchCompany = async (companyId: string) => {
  const response = await fetch(
    `${process.env.BASE_URL}/company/summaries/${companyId}?show_prices`
  );
  const company: Company = await response.json();
  return company;
};

async function CompanyPage({ params: { companyId } }: CompanyPageProps) {
  const company = await fetchCompany(companyId);
  return (
    <div className="flex justify-center my-12">
      <div className="max-w-screen-xl w-full">
        <h1 className="text-3xl pb-4">{company.name}</h1>
        <p>
          This page was created to show extensibility of a company page that
          includes a chart of prices.
        </p>
      </div>
    </div>
  );
}

export default CompanyPage;

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.BASE_URL}/company/summaries?show_prices`
  );
  const companies: Company[] = await response.json();
  return companies.map((company) => ({
    companyId: company.id,
  }));
}
