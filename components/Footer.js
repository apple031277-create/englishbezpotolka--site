import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="watermark">Английский без потолка | B2 → C2</div>
      <div className="watermark" style={{ marginTop: 8 }}>
        <Link href="/privacy">Обработка персональных данных</Link>
        {" · "}
        <Link href="/oferta">Публичная оферта</Link>
      </div>
    </footer>
  );
}
