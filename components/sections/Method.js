const items = [
  {
    title: "Коллокации, а не слова поодиночке",
    text: "«Accountable for» запоминается сразу целиком — не «accountable», а потом отдельно нужный предлог.",
  },
  {
    title: "Ваши реальные ошибки",
    text: "Разбираем то, что конкретно мешает именно вам — не абстрактные примеры из учебника.",
  },
  {
    title: "Нюансы для C1–C2",
    text: "Hedging-фразы, оговорки, интонация — то, что отличает «правильно» от «убедительно».",
  },
];

export default function Method() {
  return (
    <section className="alt">
      <div className="wrap">
        <div className="eyebrow">Как я учу</div>
        <h2>Не ещё один список слов</h2>
        <div className="method-grid">
          {items.map((item) => (
            <div className="method-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
