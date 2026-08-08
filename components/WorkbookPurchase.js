"use client";

import { useState } from "react";

export default function WorkbookPurchase() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | err

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("request failed");
      const data = await res.json();
      if (!data.confirmationUrl) throw new Error("no confirmation url");
      window.location.href = data.confirmationUrl;
    } catch {
      setStatus("err");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="wb-email">Email — на него придёт ссылка на PDF</label>
      <input
        id="wb-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        {status === "loading" ? "Переходим к оплате…" : "Оплатить 590 ₽"}
      </button>
      {status === "err" && (
        <p className="leadmagnet-status err">Что-то пошло не так, попробуйте ещё раз.</p>
      )}
    </form>
  );
}
