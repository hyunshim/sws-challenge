import React, { Suspense } from "react";
import CompanyList from "./CompanyList";
import { Company } from "../../typings";

/**
 * Fetches company data from the back-end
 * @returns List of company entities
 */
const fetchCompanies = async () => {
  const response = await fetch(
    `${process.env.BASE_URL}/company/summaries?show_prices`
  );
  const companies: Company[] = await response.json();
  return companies;
};

async function Companies() {
  const companies: Company[] = await fetchCompanies();
  return (
    <Suspense fallback={<p>Loading Companies...</p>}>
      <div className="flex justify-center my-10">
        <div className="max-w-screen-xl w-full">
          <h1 className="text-3xl">Stocks Information</h1>
          <p className="text-slate-100/60">
            Click on table headers to sort by the corresponding attribute
          </p>
          <CompanyList companies={companies} />
        </div>
      </div>
    </Suspense>
  );
}

export default Companies;
