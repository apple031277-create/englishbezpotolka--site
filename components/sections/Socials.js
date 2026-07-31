const links = [
  { label: "Telegram-канал", href: "https://t.me/englishbezpotolka" },
  { label: "ВКонтакте", href: "https://vk.ru/englishbezpotolka" },
  { label: "Дзен", href: "https://dzen.ru/englishbezpotolka" },
  { label: "Нельзяграм", href: "https://instagram.com/englishbezpotolka" },
  { label: "Pinterest", href: "#" },
  { label: "VC.ru", href: "#" },
];

export default function Socials() {
  return (
    <section id="socials" className="alt">
      <div className="wrap">
        <div className="eyebrow">Где ещё меня найти</div>
        <h2>Соцсети</h2>
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
