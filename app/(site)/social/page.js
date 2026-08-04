export const metadata = {
  title: "Соцсети",
  description: "Все соцсети «Английский без потолка»: Telegram, ВКонтакте, Дзен и другие.",
  alternates: { canonical: "/social" },
  openGraph: {
    title: "Соцсети | Английский без потолка",
    description: "Все соцсети «Английский без потолка».",
    url: "/social",
    type: "website",
  },
};

const links = [
  { label: "Telegram-канал", href: "https://t.me/englishbezpotolka" },
  { label: "ВКонтакте", href: "https://vk.ru/englishbezpotolka" },
  { label: "Дзен", href: "https://dzen.ru/englishbezpotolka" },
  { label: "Макс", href: "https://max.ru/channel_englishbezpotolka" },
  { label: "Pinterest", href: "#" },
  { label: "VC.ru", href: "#" },
];

export default function SocialPage() {
  return (
    <section>
      <div className="wrap">
        <div className="page-header">
          <div className="eyebrow">Где ещё меня найти</div>
          <h1>Соцсети</h1>
        </div>
        <div className="social-grid">
          {links.map((link) => (
            <a className="social-pill" href={link.href} key={link.label}>
              <span>
                <span className="dot" />
                {link.label}
              </span>
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
