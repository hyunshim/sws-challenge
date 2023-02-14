import React, { Suspense } from "react";

function Home() {
  //   console.log("@@@@@@@@@@@@@", process.env.BASE_URL);
  return (
    <Suspense fallback={<p>Loading Companies...</p>}>
      <div className="flex justify-center my-12">
        <div className="max-w-screen-xl w-full"></div>
      </div>
    </Suspense>
  );
}

export default Home;
