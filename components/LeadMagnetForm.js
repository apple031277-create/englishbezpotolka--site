"use client";

import { useState } from "react";

export default function LeadMagnetForm({ leadMagnetSlug, title, description }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | ok | err
  const [downloadUrl, setDownloadUrl] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, leadMagnetSlug }),
      });
      if (!res.ok) throw new Error("request failed");
      const data = await res.json();
      setDownloadUrl(data.downloadUrl);
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  return (
    <div className="leadmagnet">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {status === "ok" ? (
        <p className="leadmagnet-status ok">
          Готово —{" "}
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            скачать гайд (PDF)
          </a>
          .
        </p>
      ) : (
        <form className="leadmagnet-row" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Отправляю…" : "Получить гайд"}
          </button>
        </form>
      )}
      {status === "err" && (
        <p className="leadmagnet-status err">Что-то пошло не так, попробуйте ещё раз.</p>
      )}
      <p className="leadmagnet-note">Без спама, отписаться можно в любой момент.</p>
    </div>
  );
}
