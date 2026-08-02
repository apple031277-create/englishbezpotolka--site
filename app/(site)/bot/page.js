export const metadata = {
  title: "Тест: какой вы ученик английского",
  description:
    "Пройдите тест из 7 вопросов, подпишитесь на Telegram-канал «Английский без потолка» и получите персональный PDF-разбор.",
  alternates: { canonical: "/bot" },
  openGraph: {
    title: "Какой вы ученик английского? | Английский без потолка",
    description:
      "Тест из 7 вопросов → подписка на канал → персональный PDF-разбор с рекомендациями.",
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
        <div className="quiz-banner">
          <div>
            <div className="eyebrow">Как это работает</div>
            <h2>3 шага до результата</h2>
            <p>
              1. Отвечаете на 7 вопросов прямо в Telegram-боте.
              <br />
              2. Бот попросит подписаться на канал «Английский без потолка» — это
              условие получения результата.
              <br />
              3. После подписки — жмёте «Проверить» и получаете PDF со своим
              архетипом и рекомендациями.
            </p>
          </div>
          <a className="btn btn-primary" href="https://t.me/englishbezpotolka_quiz_bot">
            Пройти тест
          </a>
        </div>
      </div>
    </section>
  );
}
