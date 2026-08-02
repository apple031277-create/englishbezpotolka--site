import ExamsTabs from "@/components/sections/ExamsTabs";

export const metadata = {
  title: "Экзамены",
  description:
    "Подготовка к IELTS, TOEFL и Cambridge English (FCE, CAE, CPE) — от B2 до C2, с преподавателем с 26-летним стажем.",
  alternates: { canonical: "/exams" },
  openGraph: {
    title: "Подготовка к международным экзаменам | Английский без потолка",
    description:
      "Подготовка к IELTS, TOEFL и Cambridge English (FCE, CAE, CPE) — от B2 до C2.",
    url: "/exams",
    type: "website",
  },
};

export default function ExamsPage() {
  return (
    <section>
      <div className="wrap">
        <div className="page-header">
          <div className="eyebrow">Экзамены</div>
          <h1>Международные языковые экзамены</h1>
          <p className="lede">
            Пять экзаменов, один принцип: не натаскивание на формат, а реальный
            рост уровня, который потом виден и на самом экзамене, и в жизни.
          </p>
        </div>
        <ExamsTabs />
      </div>
    </section>
  );
}
