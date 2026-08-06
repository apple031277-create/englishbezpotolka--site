import QuizApp from "@/components/QuizApp";

export const metadata = {
  title: "Тест: какой вы ученик английского",
  description:
    "Пройдите тест из 7 вопросов прямо на сайте и получите персональный разбор с рекомендациями — без Telegram.",
  alternates: { canonical: "/bot" },
  openGraph: {
    title: "Какой вы ученик английского? | Английский без потолка",
    description: "7 вопросов → личный архетип и рекомендации, прямо на сайте.",
    url: "/bot",
    type: "website",
  },
};

export default function BotPage() {
  return (
    <section>
      <div className="wrap">
        <div className="page-header">
          <div className="eyebrow">Тест</div>
          <h1>Какой вы ученик английского?</h1>
          <p className="lede">
            7 вопросов о том, как вы учите язык — и в конце личный архетип с
            конкретными рекомендациями, что делать дальше, чтобы сдвинуться с
            места.
          </p>
        </div>
        <QuizApp />
        <p className="lede" style={{ textAlign: "center", marginTop: 40 }}>
          Тест есть также в{" "}
          <a href="https://t.me/englishbezpotolka_quiz_bot">Telegram-боте</a>, если
          удобнее там.
        </p>
      </div>
    </section>
  );
}
