import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Связаться",
  description: "Напишите — обсудим уровень, цели и формат занятий.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Связаться | Английский без потолка",
    description: "Напишите — обсудим уровень, цели и формат занятий.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <section>
      <div className="wrap">
        <div className="page-header">
          <div className="eyebrow">Связаться</div>
          <h1>Напишите мне</h1>
          <p className="lede">
            Про индивидуальные занятия, подготовку к экзаменам или олимпиадам —
            расскажите коротко, и я отвечу.
          </p>
        </div>
        <ContactForm source="general" messagePlaceholder="Расскажите коротко о вашей цели" />
      </div>
    </section>
  );
}
