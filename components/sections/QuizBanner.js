export default function QuizBanner() {
  return (
    <section id="quiz">
      <div className="wrap">
        <div className="quiz-banner">
          <div>
            <div className="eyebrow">Тест</div>
            <h2>Какой вы ученик английского?</h2>
            <p>
              7 вопросов — и вы узнаете свой тип и получите персональный
              PDF-разбор с рекомендациями.
            </p>
          </div>
          <a
            className="btn btn-primary"
            href="https://t.me/englishbezpotolka_quiz_bot"
          >
            Пройти тест
          </a>
        </div>
      </div>
    </section>
  );
}
