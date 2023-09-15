export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="book-cover">
      <div className="book-page1" />
      <div className="book-page2" />
      <div className="book-page">
        <div className="main-container">{children}</div>
      </div>
    </div>
  );
}
