import LeadMagnetForm from "@/components/LeadMagnetForm";
import { client } from "@/lib/sanity/client";
import { leadMagnetBySlugQuery } from "@/lib/sanity/queries";

export const revalidate = 60;

export const metadata = {
  title: "Подготовка к олимпиадам",
  description:
    "Подготовка школьников к олимпиадам по английскому языку (в т.ч. олимпиады ВШЭ, РАНХиГС) — системно, с 26-летним опытом преподавания.",
  alternates: { canonical: "/olympiads" },
  openGraph: {
    title: "Подготовка к олимпиадам по английскому | Английский без потолка",
    description:
      "Подготовка школьников к олимпиадам по английскому языку — системно, не за месяц до отбора.",
    url: "/olympiads",
    type: "website",
  },
};

export default async function OlympiadsPage() {
  const leadMagnet = await client.fetch(leadMagnetBySlugQuery, { slug: "apgreid-30-slov" });

  return (
    <section>
      <div className="wrap">
        <div className="page-header">
          <div className="eyebrow">Олимпиады</div>
          <h1>Подготовка к олимпиадам по английскому</h1>
          <p className="lede">
            Готовлю школьников к олимпиадам университетского уровня — например,
            олимпиаде ВШЭ и олимпиаде РАНХиГС по английскому языку.
          </p>
        </div>
        <div className="article-body" style={{ marginBottom: 48 }}>
          <p>
            Олимпиадные задания устроены не так, как школьная программа: тексты
            сложнее и абстрактнее, лексика — на уровне C1-C2 даже там, где формально
            ожидается B2, а на Writing и Speaking жюри оценивает не «правильно», а
            «убедительно и точно». Готовиться к этому за месяц до отбора почти
            невозможно — нужен системный запас: лексика, академический стиль,
            умение работать со сложным текстом.
          </p>
          <p>
            Поэтому подготовка строится постепенно, а не спринтом: сначала —
            крепкая база (лексика, грамматика, работа с текстами выше школьного
            уровня), и только когда база есть — прицельная подготовка под конкретный
            формат олимпиады, разбор заданий прошлых лет, тренировка Writing и
            Speaking под критерии жюри.
          </p>
          <p>
            Если у ребёнка ещё нет олимпиадного опыта, но есть хороший уровень
            языка — это нормальная точка старта. Раньше начали — увереннее пройдёт
            отбор.
          </p>
        </div>

        <div className="testimonial" style={{ marginBottom: 48 }}>
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

        {leadMagnet && (
          <LeadMagnetForm
            leadMagnetSlug={leadMagnet.slug}
            title={leadMagnet.title}
            description={leadMagnet.description}
          />
        )}
      </div>
    </section>
  );
}
