import React, { Suspense } from "react";

function Home() {
  return (
    <div className="flex justify-center my-12">
      <div className="max-w-screen-xl w-full">
        <h1 className="text-3xl pb-4">Home Page</h1>
        <p>This is the entry-point to the web application.</p>
        <p>
          A table view of the companies can be accessed in the Stocks Page
          navigable via the navigation bar.
        </p>
      </div>
    </div>
  );
}

export default Home;
