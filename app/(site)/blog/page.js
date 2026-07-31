import { client } from "@/lib/sanity/client";
import { articleListQuery } from "@/lib/sanity/queries";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 60;

export const metadata = {
  title: "Статьи",
  description:
    "Разборы ошибок, лексика для C1-C2, подготовка к IELTS и Cambridge — статьи «Английский без потолка».",
};

export default async function BlogIndexPage() {
  const articles = await client.fetch(articleListQuery);

  return (
    <section>
      <div className="wrap">
        <div className="eyebrow">Блог</div>
        <h2>Статьи</h2>
        {articles.length === 0 ? (
          <p className="blog-empty">Первая статья скоро появится здесь.</p>
        ) : (
          <div className="blog-grid">
            {articles.map((article) => (
              <ArticleCard article={article} key={article._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
