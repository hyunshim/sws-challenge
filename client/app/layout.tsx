import "../styles/globals.css";
import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-primary text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
