export default function Testimonial() {
  return (
    <section className="alt">
      <div className="wrap testimonial">
        <div className="eyebrow">Результат</div>
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
    </section>
  );
}
