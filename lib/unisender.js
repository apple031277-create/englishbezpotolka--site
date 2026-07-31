// Best-effort отправка контакта в Unisender. Если UNISENDER_API_KEY не задан
// или запрос падает — просто ничего не делаем: email уже сохранён в Sanity
// (см. app/api/subscribe/route.js), это не блокирует выдачу гайда.
export async function pushToUnisender(email, listId) {
  const apiKey = process.env.UNISENDER_API_KEY;
  if (!apiKey || !listId) return;

  const params = new URLSearchParams({
    format: "json",
    api_key: apiKey,
    list_ids: listId,
    "fields[email]": email,
    double_optin: "0",
  });

  try {
    await fetch("https://api.unisender.com/ru/api/v5/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
  } catch {
    // best-effort — молча игнорируем, email уже в Sanity
  }
}
