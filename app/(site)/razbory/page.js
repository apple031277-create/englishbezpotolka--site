import { client } from "@/lib/sanity/client";
import { razboryListQuery } from "@/lib/sanity/queries";
import RazborCard from "@/components/RazborCard";

export const revalidate = 60;

export const metadata = {
  title: "Разборы",
  description:
    "Короткие разборы слов, фраз и типичных ошибок — «Английский без потолка».",
  alternates: { canonical: "/razbory" },
  openGraph: {
    title: "Разборы | Английский без потолка",
    description: "Короткие разборы слов, фраз и типичных ошибок.",
    url: "/razbory",
    type: "website",
  },
};

export default async function RazboryIndexPage() {
  const razbory = await client.fetch(razboryListQuery);

  return (
    <section>
      <div className="wrap">
        <div className="eyebrow">Разборы</div>
        <h1>Слово или фраза за раз</h1>
        <p className="lede" style={{ marginBottom: 24 }}>
          Короткие разборы — термин, объяснение, пример ❌/✅. Для больших статей
          есть отдельный раздел «Статьи».
        </p>
        {razbory.length === 0 ? (
          <p className="blog-empty">Первый разбор скоро появится здесь.</p>
        ) : (
          <div className="razbor-grid">
            {razbory.map((item) => (
              <RazborCard article={item} key={item._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
