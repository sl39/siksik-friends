import Link from "next/link";
import "@/styles/globals.css";

export default function NotFound() {
  return (
    <div className="book-cover">
      <div className="book-page1" />
      <div className="book-page2" />
      <div className="book-page">
        <div className="main-container">
          <h2>NotFound</h2>
          <Link href="/">메인페이지로</Link>
        </div>
      </div>
    </div>
  );
}
