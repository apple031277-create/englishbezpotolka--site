"use client";

import { useState } from "react";

const questions = [
  {
    q: "Вы сказали фразу и поняли, что ошиблись в грамматике. Что делаете?",
    a: {
      A: "Мысленно отматываю назад и стараюсь сказать правильно, даже если это займёт время",
      B: "Иду дальше — ошибка не главное, главное чтобы поняли",
      C: "Сильно смущаюсь и в следующий раз, скорее всего, промолчу",
      D: "Замечаю, но не зацикливаюсь — разберу её позже",
    },
  },
  {
    q: "Сколько вы в среднем говорите на английском вслух за неделю?",
    a: {
      A: "Почти не говорю — жду, пока буду увереннее в грамматике",
      B: "Говорю при любой возможности, даже если получается коряво",
      C: "Почти не говорю — зато много слушаю и читаю",
      D: "Говорю регулярно и осознанно — например, на занятиях или созвонах",
    },
  },
  {
    q: "Как вы обычно запоминаете новые слова?",
    a: {
      A: "Записываю и зубрю списки слов и правил",
      B: "Запоминаю из разговора — если слово прозвучало в контексте, оно осело",
      C: "Смотрю фильмы, сериалы, подкасты — слова оседают сами",
      D: "Веду систему (карточки, таблицы) и повторяю по расписанию",
    },
  },
  {
    q: "Что вы чувствуете перед разговором на английском с незнакомым человеком?",
    a: {
      A: "Волнение — вдруг скажу что-то неправильно",
      B: "Любопытство — интересно, что получится",
      C: "Тревогу настолько сильную, что чаще предпочту избежать разговора",
      D: "Спокойствие — я примерно знаю свой уровень и над чем работаю",
    },
  },
  {
    q: "Какая ситуация вам ближе всего?",
    a: {
      A: "Знаю правило (например, Third Conditional), но путаюсь в моменте живой речи",
      B: "Использую одни и те же простые связки — «also, also, also»",
      C: "Хорошо понимаю на слух и при чтении, но сам почти не формулирую мысли",
      D: "Речь разнообразная, но иногда не хватает уверенности выйти на новый уровень",
    },
  },
  {
    q: "Вам указали на ошибку. Что делаете дальше?",
    a: {
      A: "Иду и разбираю правило заново — по учебнику или с преподавателем",
      B: "Пробую сказать ещё раз, по-другому, «на живую»",
      C: "Мысленно соглашаюсь, но редко возвращаюсь, чтобы это исправить",
      D: "Записываю и включаю в следующую тренировку",
    },
  },
  {
    q: "Что ближе всего описывает вашу мечту про английский?",
    a: {
      A: "Говорить без ошибок, как по учебнику",
      B: "Свободно болтать в любой ситуации, не задумываясь",
      C: "Понимать всё — фильмы, книги, подкасты — без словаря и субтитров",
      D: "Выйти на C1 системно, шаг за шагом, без хаоса",
    },
  },
];

const archetypes = {
  A: {
    name: "Отличник-теоретик",
    description:
      "Вы знаете правила лучше многих носителей — но в моменте речи будто стираются из памяти. Вы из тех, кто выучил формулу Third Conditional наизусть, но в разговоре всё равно скажет «if I would have known». Проблема не в знаниях — в паузе между «знаю правило» и «использую его на автомате».",
    need: "Перестать ждать стопроцентной уверенности перед тем как заговорить. Точность приходит из практики, а не из ещё одного правила в тетради.",
    cta: "Отличникам-теоретикам обычно не хватает не теории, а закреплённой практики — конкретных слов и конструкций, доведённых до автоматизма. Именно для этого я сделала воркбук «Английский без потолка»: 10 слов + 7 упражнений на юнит, чтобы правило превращалось в рефлекс, а не оставалось в тетради.",
  },
  B: {
    name: "Смелый практик",
    description:
      "Вы не боитесь говорить — и это половина успеха, которой не хватает многим на B2. Но есть цена: одни и те же ошибки повторяются месяцами, потому что вы идёте дальше, не останавливаясь их закрепить. Предлоги «depend on», «interested in» — то, что должно быть на автомате, до сих пор требует внимания.",
    need: "Не бояться замедлиться на секунду и закрепить закономерность, а не просто проговорить её один раз.",
    cta: "Смелым практикам вроде вас не хватает не смелости, а системы — способа закрепить то, что уже звучит естественно. Воркбук «Английский без потолка» построен именно так: коллокации и предлоги, которые не выводятся логически, а запоминаются целиком, плюс упражнения на закрепление.",
  },
  C: {
    name: "Молчаливый наблюдатель",
    description:
      "Вы пассивно знаете английский лучше, чем сами думаете — фильмы, подкасты, книги дались вам легко. Но между «понимаю» и «говорю» — пропасть, которую вы пока не перешли. Проблема в том, что пассивное владение само по себе не конвертируется в активное, сколько бы контента вы ни потребляли.",
    need: "Начать производить язык, а не только потреблять — даже если результат сначала будет хуже, чем в голове.",
    cta: "Молчаливым наблюдателям обычно не хватает не понимания, а маленьких, безопасных поводов заговорить и написать. Воркбук «Английский без потолка» устроен как раз так — 10 слов и 7 упражнений на юнит, с ответами, чтобы можно было тренироваться без страха ошибиться.",
  },
  D: {
    name: "Стратег на подъёме",
    description:
      "Вы занимаетесь системно, дисциплинированно, и это видно: базовые ошибки давно позади. Но именно на этом этапе застревают многие — грамотно, правильно, без единой явной ошибки, и всё равно предсказуемо. Не хватает того самого последнего шага от B2 к C1: нюансов, hedging-фраз, живых оговорок вместо учебниковых конструкций.",
    need: "Не больше грамматики — а больше тонкости. Именно это отличает C1 от хорошего B2.",
    cta: "Стратегам на подъёме обычно не хватает последнего слоя — той самой тонкости в словах и конструкциях, которая превращает «правильно» в «убедительно». Именно на этот переход рассчитан воркбук «Английский без потолка» — лексика и упражнения без «учебниковой» простоты.",
  },
};

function computeArchetype(answers) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const letter of answers) counts[letter]++;
  return ["A", "B", "C", "D"].reduce((best, letter) =>
    counts[letter] > counts[best] ? letter : best
  );
}

export default function QuizApp() {
  const [phase, setPhase] = useState("intro"); // intro | quiz | email | result
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle");
  const [archetype, setArchetype] = useState(null);

  function selectAnswer(letter) {
    const next = [...answers, letter];
    setAnswers(next);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setArchetype(computeArchetype(next));
      setPhase("email");
    }
  }

  async function submitEmail(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/quiz-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, archetype }),
      });
      if (!res.ok) throw new Error("failed");
      setPhase("result");
    } catch {
      setStatus("err");
    }
  }

  if (phase === "intro") {
    return (
      <div className="quiz-box quiz-intro">
        <p className="lede">7 вопросов, пара минут — и личный разбор с рекомендациями.</p>
        <button className="btn btn-primary" onClick={() => setPhase("quiz")}>
          Начать тест
        </button>
      </div>
    );
  }

  if (phase === "quiz") {
    const question = questions[step];
    return (
      <div className="quiz-box">
        <div className="quiz-progress">
          Вопрос {step + 1} из {questions.length}
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="quiz-question">
          <h2>{question.q}</h2>
          <div className="quiz-answers">
            {Object.entries(question.a).map(([letter, text]) => (
              <button
                key={letter}
                className="quiz-answer-btn"
                onClick={() => selectAnswer(letter)}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "email") {
    return (
      <div className="quiz-box">
        <div className="contact-form" style={{ maxWidth: "100%" }}>
          <h3>Почти готово</h3>
          <p>Куда прислать разбор?</p>
          <form onSubmit={submitEmail}>
            <label htmlFor="quiz-email">Email</label>
            <input
              id="quiz-email"
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
              {status === "loading" ? "Считаю…" : "Показать результат"}
            </button>
            {status === "err" && (
              <p className="leadmagnet-status err">Что-то пошло не так, попробуйте ещё раз.</p>
            )}
          </form>
        </div>
      </div>
    );
  }

  const result = archetypes[archetype];
  return (
    <div className="quiz-box">
      <div className="quiz-result-card">
        <div className="eyebrow">Ваш результат</div>
        <h2>{result.name}</h2>
        <p>{result.description}</p>
        <div className="quiz-result-need">
          <strong>Что нужно:</strong> {result.need}
        </div>
        <p>{result.cta}</p>
        <a className="btn btn-primary" href="/workbook">
          Получить воркбук
        </a>
      </div>
    </div>
  );
}
