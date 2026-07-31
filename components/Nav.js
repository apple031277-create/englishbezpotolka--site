import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="nav-brand" href="/">
          Английский без потолка
        </Link>
        <ul className="nav-links">
          <li><Link href="/#about">Обо мне</Link></li>
          <li><Link href="/#workbook">Воркбук</Link></li>
          <li><Link href="/blog">Статьи</Link></li>
          <li><Link href="/#quiz">Тест</Link></li>
          <li><Link href="/#socials">Соцсети</Link></li>
        </ul>
      </div>
    </nav>
  );
}
