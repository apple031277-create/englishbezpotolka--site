const units = [
  "Work & Study",
  "Family & Friends",
  "Food",
  "Hobbies & Free Time",
  "Health",
];

export default function Workbook() {
  return (
    <section id="workbook">
      <div className="wrap wb-layout">
        <div>
          <div className="eyebrow">Воркбук</div>
          <h2>Английский без потолка</h2>
          <p className="lede">
            Система, которую я использую на занятиях: слово запоминается не само
            по себе, а сразу с коллокацией, контекстом и упражнением, которое
            доводит его до автоматизма.
          </p>
          <ul className="wb-list">
            {units.map((unit, i) => (
              <li key={unit}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                {unit}
              </li>
            ))}
          </ul>
        </div>
        <div className="wb-card">
          <span className="wb-badge">5 юнитов · 41 страница</span>
          <div>10 слов + 7 упражнений на юнит, с ответами для самопроверки</div>
          <div className="wb-price">590 ₽</div>
          <div className="wb-price-note">
            Оплата переводом, PDF — сразу после подтверждения
          </div>
          <a className="btn btn-primary" href="https://t.me/englishbezpotolka/13">
            Получить воркбук
          </a>
        </div>
      </div>
    </section>
  );
}
