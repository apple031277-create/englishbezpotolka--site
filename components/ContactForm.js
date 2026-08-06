"use client";

import { useState } from "react";

export default function ContactForm({ source = "general", messagePlaceholder, submitLabel = "Отправить" }) {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | ok | err

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="contact-form">
        <p className="leadmagnet-status ok">
          Заявка отправлена — свяжусь с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="cf-name">Имя</label>
      <input id="cf-name" required value={form.name} onChange={update("name")} />

      <label htmlFor="cf-contact">Telegram, email или телефон</label>
      <input id="cf-contact" required value={form.contact} onChange={update("contact")} />

      <label htmlFor="cf-message">Сообщение</label>
      <textarea
        id="cf-message"
        rows={4}
        placeholder={messagePlaceholder}
        value={form.message}
        onChange={update("message")}
      />

      <label className="consent-row">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          Согласен(на) на{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            обработку персональных данных
          </a>
        </span>
      </label>
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Отправляю…" : submitLabel}
      </button>
      {status === "err" && (
        <p className="leadmagnet-status err">Что-то пошло не так, попробуйте ещё раз.</p>
      )}
    </form>
  );
}
