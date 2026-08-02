export const metadata = {
  title: "Отзывы",
  description: "Отзывы и результаты учеников «Английский без потолка».",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Отзывы учеников | Английский без потолка",
    description: "Отзывы и результаты учеников «Английский без потолка».",
    url: "/reviews",
    type: "website",
  },
};

export default function ReviewsPage() {
  return (
    <section>
      <div className="wrap">
        <div className="page-header">
          <div className="eyebrow">Отзывы</div>
          <h1>Что говорят и чего добиваются ученики</h1>
        </div>

        <div className="testimonial" style={{ marginBottom: 48 }}>
          <blockquote>
            «Когда ко мне пришла эта ученица, ей было 12 лет. Мы шли постепенно:
            лексика, академический стиль, сложные тексты. В 10 классе решили
            попробовать олимпиады — полгода целенаправленной подготовки».
          </blockquote>
          <cite>— из практики «Английский без потолка»</cite>
          <div className="result-pills">
            <span className="result-pill">Победитель олимпиады ВШЭ</span>
            <span className="result-pill">Призёр олимпиады РАНХиГС</span>
          </div>
        </div>

        <p className="lede">Скриншоты отзывов учеников — скоро здесь.</p>
      </div>
    </section>
  );
}
