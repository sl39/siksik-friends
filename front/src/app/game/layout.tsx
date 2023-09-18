import Exit from "./nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="book-cover z-1">
      <Exit />
      <div className="book-page1 z-2" />
      <div className="book-page2 z-3" />
      <div className="book-page z-5">
        <div className="main-container">{children}</div>
      </div>
    </div>
  );
}
