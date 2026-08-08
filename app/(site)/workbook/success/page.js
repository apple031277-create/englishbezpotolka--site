"use client";

import { useEffect, useState } from "react";

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 30000;

export default function WorkbookSuccessPage() {
  const [state, setState] = useState("checking"); // checking | paid | timeout | not_found

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setState("not_found");
      return;
    }

    let cancelled = false;
    const startedAt = Date.now();

    async function poll() {
      try {
        const res = await fetch(`/api/payment-status?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (cancelled) return;

        if (data.status === "paid") {
          setState("paid");
          return;
        }
        if (res.status === 404) {
          setState("not_found");
          return;
        }
        if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
          setState("timeout");
          return;
        }
        setTimeout(poll, POLL_INTERVAL_MS);
      } catch {
        if (!cancelled) setTimeout(poll, POLL_INTERVAL_MS);
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <div className="wrap">
        <div className="page-header">
          <div className="eyebrow">Воркбук</div>
          <h1>
            {state === "paid" && "Оплата прошла"}
            {state === "checking" && "Проверяем оплату…"}
            {(state === "timeout" || state === "not_found") && "Не нашли оплату"}
          </h1>
        </div>
        <div className="article-body">
          {state === "checking" && <p>Обычно это занимает несколько секунд.</p>}
          {state === "paid" && (
            <p>
              Спасибо за покупку!{" "}
              <a href="/downloads/workbook-b2c2-vol1.pdf" target="_blank" rel="noopener noreferrer">
                Скачать воркбук (PDF)
              </a>
            </p>
          )}
          {(state === "timeout" || state === "not_found") && (
            <p>
              Если деньги списались, а ссылка не появилась — напишите на{" "}
              <a href="mailto:natalia.bobrova03@yandex.ru">natalia.bobrova03@yandex.ru</a> или в{" "}
              <a href="https://t.me/englishbezpotolka" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
              , пришлю файл вручную.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
