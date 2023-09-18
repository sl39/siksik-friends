import Link from "next/link";

export default function nav() {
  return (
    <nav className="back-nav z-6">
      <Link href="/home" className="nav-item active">
        <div className="nav-text">나가기</div>
      </Link>
    </nav>
  );
}
