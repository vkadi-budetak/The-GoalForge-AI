async function askGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // 1. СПОЧАТКУ ПЕРЕВІРКА НА 503 (ПЕРЕВАНТАЖЕННЯ)
    if (response.status === 503) {
      console.warn(
        "Сервер Google перевантажений (503). Пробую ще раз через 3 секунди...",
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return await askGemini(prompt); // Повторюємо цей же запит
    }

    // 2. ЯКЩО СТАТУС НЕ OK (І ЦЕ НЕ 503)
    if (!response.ok) {
      // Спробуємо прочитати деталі помилки, якщо це можливо
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = "No JSON error data";
      }

      console.error("Error details:", errorData);

      // Якщо модель не знайдена (404), йдемо на запасний варіант
      if (response.status === 404) {
        console.warn("Gemini 3 is unavailable via API, trying 1.5 Flash...");
        return await askGeminiFallback(prompt);
      }
      return null;
    }

    // 3. ЯКЩО ВСЕ ДОБРЕ (СТАТУС 200)
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Помилка запиту:", error);
    return null;
  }
}

// Резервний варіант (стабільна модель)
async function askGeminiFallback(prompt) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Fallback failed too:", error);
    return null;
  }
}
