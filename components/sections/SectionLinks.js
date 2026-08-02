const links = [
  {
    href: "/exams",
    title: "Экзамены",
    text: "IELTS, TOEFL, Cambridge (FCE, CAE, CPE) — подготовка под формат каждого.",
  },
  {
    href: "/olympiads",
    title: "Олимпиады",
    text: "Системная подготовка к олимпиадам университетского уровня.",
  },
  {
    href: "/level-up",
    title: "Повышение уровня",
    text: "Как выйти с B2 на C1-C2 — метод, а не ещё один список слов.",
  },
  {
    href: "/workbook",
    title: "Воркбук",
    text: "5 юнитов лексики с коллокациями и упражнениями — 590 ₽.",
  },
  {
    href: "/reviews",
    title: "Отзывы",
    text: "Что говорят и чего добиваются ученики.",
  },
  {
    href: "/bot",
    title: "Тест",
    text: "Какой вы ученик английского — 7 вопросов и личный разбор.",
  },
  {
    href: "/blog",
    title: "Статьи",
    text: "Разборы ошибок, лексика для C1-C2, подготовка к экзаменам.",
  },
  {
    href: "/social",
    title: "Соцсети",
    text: "Telegram, ВКонтакте, Дзен и другие площадки.",
  },
];

export default function SectionLinks() {
  return (
    <section className="alt">
      <div className="wrap">
        <div className="eyebrow">Разделы</div>
        <h2>Куда дальше</h2>
        <div className="section-links-grid">
          {links.map((link) => (
            <a className="section-link-card" href={link.href} key={link.href}>
              <h3>{link.title}</h3>
              <p>{link.text}</p>
              <span className="arrow">Подробнее →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
