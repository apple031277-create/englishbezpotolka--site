import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Воркбук",
  description:
    "Воркбук «Английский без потолка»: 5 юнитов, коллокации с контекстом и упражнениями для перехода с B2 на C1-C2.",
  alternates: { canonical: "/workbook" },
  openGraph: {
    title: "Воркбук «Английский без потолка» | B2 → C2",
    description:
      "5 юнитов, коллокации с контекстом и упражнениями для перехода с B2 на C1-C2.",
    url: "/workbook",
    type: "website",
  },
};

const units = ["Work & Study", "Family & Friends", "Food", "Hobbies & Free Time", "Health"];

export default function WorkbookPage() {
  return (
    <section>
      <div className="wrap wb-layout">
        <div>
          <div className="eyebrow">Воркбук</div>
          <h1>Английский без потолка</h1>
          <p className="lede">
            Система, которую я использую на занятиях: слово запоминается не само по
            себе, а сразу с коллокацией, контекстом и упражнением, которое доводит
            его до автоматизма.
          </p>
          <p className="lede">
            Каждый юнит — не список слов, а тема из реальной жизни (работа, семья,
            еда, хобби, здоровье), внутри которой лексика встречается в естественных
            сочетаниях, а не по одному слову за раз.
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
        <div>
          <div className="wb-card" style={{ marginBottom: 20 }}>
            <span className="wb-badge">5 юнитов · 41 страница</span>
            <div>10 слов + 7 упражнений на юнит, с ответами для самопроверки</div>
            <div className="wb-price">590 ₽</div>
            <div className="wb-price-note">
              Оплата переводом, PDF — сразу после подтверждения
            </div>
          </div>
          <ContactForm
            source="workbook"
            messagePlaceholder="Например: хочу купить воркбук"
            submitLabel="Хочу воркбук"
          />
        </div>
      </div>
    </section>
  );
}
