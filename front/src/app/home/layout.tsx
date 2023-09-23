import Menu from "./menu";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="book-cover">
      <Menu />
      <div className="book-page1" />
      <div className="book-page2" />
      <div className="book-page">
        <div className="main-container z-5">{children}</div>
      </div>
    </div>
  );
}
