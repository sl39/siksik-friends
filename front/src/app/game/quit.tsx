import Link from "next/link";

export default function BackNav() {
  return (
    <nav className="back-nav z-4">
      <Link href="/home" className="nav-item active">
        <div className="nav-text">나가기</div>
      </Link>
    </nav>
  );
}
