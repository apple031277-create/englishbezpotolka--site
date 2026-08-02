"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/exams", label: "Экзамены" },
  { href: "/olympiads", label: "Олимпиады" },
  { href: "/level-up", label: "Повышение уровня" },
  { href: "/workbook", label: "Воркбук" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/bot", label: "Тест" },
  { href: "/blog", label: "Статьи" },
  { href: "/social", label: "Соцсети" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="nav-brand" href="/">
          Английский без потолка
        </Link>
        <ul className={open ? "nav-links open" : "nav-links"}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="burger"
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
