const API_BASE = "https://api.yookassa.ru/v3";

function authHeader() {
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;
  return "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64");
}

export async function createYookassaPayment({ amountValue, description, returnUrl, idempotenceKey, email }) {
  const res = await fetch(`${API_BASE}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
      "Idempotence-Key": idempotenceKey,
    },
    body: JSON.stringify({
      amount: { value: amountValue, currency: "RUB" },
      capture: true,
      description,
      confirmation: { type: "redirect", return_url: returnUrl },
      metadata: { token: idempotenceKey, email },
      receipt: {
        customer: { email },
        items: [
          {
            description,
            quantity: "1.00",
            amount: { value: amountValue, currency: "RUB" },
            vat_code: 1,
            payment_mode: "full_payment",
            payment_subject: "commodity",
          },
        ],
      },
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`ЮKassa create payment failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}

export async function getYookassaPayment(paymentId) {
  const res = await fetch(`${API_BASE}/payments/${paymentId}`, {
    headers: { Authorization: authHeader() },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`ЮKassa get payment failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}
