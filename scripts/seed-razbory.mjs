// Разовый скрипт: заливает первые 4 разбора (article + tags:["разбор"]) в Sanity.
// Текст и обложки согласованы с автором в D:\ClaudeShared\САЙТ\тз_4_razbora_2026-08-07.md
//
// Запуск: node scripts/seed-razbory.mjs
// Нужен .env.local с NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN (write-токен).

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";

config({ path: ".env.local" });

const COVERS_DIR = "D:\\ClaudeShared\\САЙТ\\обложки_разборов";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function key() {
  return Math.random().toString(36).slice(2, 12);
}

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

function example(kind, text, { tag, translation } = {}) {
  return { _type: "example", _key: key(), kind, tag, text, translation };
}

const RAZBORY = [
  {
    file: "get-under-your-skin.jpg",
    slug: "get-under-your-skin",
    title: "to get under someone's skin",
    excerpt: "На B2 переведут как «раздражать» — и ошибутся наполовину.",
    seoTitle: "to get under someone's skin — что значит на самом деле",
    leadMagnetSlug: "nositeli-30-fraz",
    body: [
      block("На B2 переведут как «раздражать» — и будут правы лишь наполовину."),
      example("bad", "He gets under my skin.", { tag: "Только один смысл", translation: "он меня раздражает" }),
      example("good", "I don't know why, but this show has really got under my skin.", {
        tag: "На самом деле, C1",
        translation: "Не знаю почему, но этот сериал меня полностью захватил",
      }),
      block(
        "«She'd only known him a week, but he'd already got under her skin.» — Она знала его всего неделю, но он уже занял все её мысли."
      ),
      block(
        "Именно этот второй смысл делает фразу живой: не факт раздражения, а признание, что что-то проникло внутрь и осталось.",
        "closingThought"
      ),
    ],
  },
  {
    file: "going-through-the-motions.jpg",
    slug: "going-through-the-motions",
    title: "going through the motions",
    excerpt: "Присутствовать телом, но не душой — фраза из каждой второй британской драмы.",
    seoTitle: "going through the motions — что значит эта фраза",
    leadMagnetSlug: "nositeli-30-fraz",
    body: [
      block(
        "The motions — физические шаги действия. Going through the motions значит присутствовать телом, но не душой, имитировать жизнь."
      ),
      example("bad", "I've been doing things automatically.", { tag: "B2, плоско" }),
      example("good", "Their relationship felt hollow. They were just going through the motions.", {
        tag: "C1, точно",
        translation: "Их отношения были пустыми, они просто существовали по инерции",
      }),
      block(
        "«I don't want to go through the motions. I want to actually mean what I say.» — Не хочу просто отбывать номер, хочу говорить то, что действительно имею в виду."
      ),
      block(
        "Фраза бьёт точно, потому что описывает не лень и не усталость, а более тонкое состояние: утрату смысла при сохранении внешней формы.",
        "closingThought"
      ),
    ],
  },
  {
    file: "read-the-room.jpg",
    slug: "read-the-room",
    title: "read the room",
    excerpt: "Три фразы из одной сцены сериала — и ни одну нельзя перевести дословно.",
    seoTitle: "read the room — что значит и как использовать",
    leadMagnetSlug: "nositeli-30-fraz",
    body: [
      block(
        "Дословный перевод «прочитать комнату» ничего не объясняет. На самом деле — считать настроение и контекст ситуации, прежде чем что-то сказать или сделать."
      ),
      example("good", "He kept cracking jokes at the funeral — clearly failed to read the room.", {
        translation: "Он продолжал шутить на похоронах, явно не считал настроение момента",
      }),
      block(
        "«Everyone had gone quiet after the news, but she kept talking about her vacation — she really can't read the room.» — Все замолчали после новости, а она продолжала болтать про отпуск, она совсем не считывает обстановку."
      ),
      block(
        "Рядом по смыслу: the room went quiet (тишина как результат) и throw someone under the bus (подставить кого-то)."
      ),
      block(
        "Это разница между тем, что учат по учебнику, и тем, что реально говорят: такие фразы нельзя перевести, только распознать в моменте, по сцене, по интонации, по контексту.",
        "closingThought"
      ),
    ],
  },
  {
    file: "affect-vs-effect.jpg",
    slug: "affect-vs-effect",
    title: "affect vs effect",
    excerpt: "Путают даже на C1 — в русском у обоих слов один перевод.",
    seoTitle: "affect vs effect — как не путать",
    leadMagnetSlug: "putanitsa-10-par",
    body: [
      block("Путают даже на продвинутом уровне, потому что в русском у обоих слов один перевод — «влияние»."),
      block("affect — почти всегда глагол (X affects Y). effect — почти всегда существительное (the effect of X)."),
      example("bad", "Climate change has a serious affect on agriculture."),
      example("good", "Climate change has a serious effect on agriculture. / Climate change affects agriculture."),
      block("The delay affected our schedule. — но: The delay had a big effect on our schedule."),
      block(
        "Та же логика работает и с другими похожими парами: не зубрить словарь, а слышать, какую роль слово играет в предложении.",
        "closingThought"
      ),
    ],
  },
];

async function seed() {
  for (const razbor of RAZBORY) {
    const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, {
      slug: razbor.slug,
    });
    if (existing) {
      console.log(`уже есть, пропускаю: ${razbor.title}`);
      continue;
    }

    const leadMagnet = await client.fetch(`*[_type == "leadMagnet" && slug.current == $slug][0]{_id}`, {
      slug: razbor.leadMagnetSlug,
    });
    if (!leadMagnet) {
      console.warn(`лид-магнит не найден (${razbor.leadMagnetSlug}), пропускаю привязку для: ${razbor.title}`);
    }

    const coverPath = path.join(COVERS_DIR, razbor.file);
    console.log(`загружаю обложку: ${razbor.file}`);
    const asset = await client.assets.upload("image", fs.createReadStream(coverPath), {
      filename: razbor.file,
    });

    await client.create({
      _type: "article",
      title: razbor.title,
      slug: { _type: "slug", current: razbor.slug },
      excerpt: razbor.excerpt,
      seoTitle: razbor.seoTitle,
      tags: ["разбор"],
      publishedAt: new Date("2026-08-07T12:00:00.000Z").toISOString(),
      coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      body: razbor.body,
      ...(leadMagnet
        ? { leadMagnet: { _type: "reference", _ref: leadMagnet._id } }
        : {}),
    });
    console.log(`создан разбор: ${razbor.title}`);
  }
  console.log("Готово.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
