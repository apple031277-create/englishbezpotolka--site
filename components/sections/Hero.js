import Image from "next/image";
import heroImage from "@/public/images/hero-raspberry.jpg";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-wave" />
      <div className="hero-wave two" />
      <div className="wrap">
        <div className="hero-inner">
          <div>
            <div className="eyebrow">Английский без потолка · B2 → C2</div>
            <h1>Английский, на котором вас слышно</h1>
            <p className="lede">
              Преподаю тем, кто уже на B2 и хочет говорить и писать по-настоящему
              свободно — без зубрёжки, но с системой.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#workbook">
                Воркбук — 590 ₽
              </a>
              <a className="btn btn-ghost" href="https://t.me/englishbezpotolka">
                Telegram-канал
              </a>
            </div>
          </div>
          <div className="avatar-circle">
            <Image src={heroImage} alt="" fill sizes="200px" priority />
          </div>
        </div>
      </div>
    </header>
  );
}
