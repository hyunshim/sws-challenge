import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex justify-center border-b border-white/25">
      <header className="py-5 max-w-screen-xl w-full">
        <Link href="/" className="text-white rounded-lg pr-6">
          Simply Wall St
        </Link>
        <Link href="/companies" className="text-white rounded-lg">
          Stocks Page
        </Link>
      </header>
    </div>
  );
}

export default Navbar;
