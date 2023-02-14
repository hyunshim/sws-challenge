import React from "react";
import { Company } from "../../../typings";

type CompanyPageProps = {
  params: {
    companyId: string;
    prices: number[];
  };
};

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
    <div className="flex justify-center my-10">
      <div className="max-w-screen-xl w-full">
        CompanyPage: {company.id} {company.name}
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
