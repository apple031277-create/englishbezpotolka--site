// Разовый скрипт: грузит уже готовые PDF-гайды из D:\ClaudeShared\Материалы\
// в Sanity как документы leadMagnet. sendpulseListId оставляем пустым —
// его нужно вписать в Studio после того, как в SendPulse созданы списки.
//
// Запуск: node scripts/seed-lead-magnets.mjs
// Нужен .env.local с NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN (write-токен).

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";

config({ path: ".env.local" });

const MATERIALS_DIR = "D:\\ClaudeShared\\Материалы";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const MAGNETS = [
  {
    file: "Лид-магнит_АПГРЕЙД_30_слов.pdf",
    slug: "apgreid-30-slov",
    title: "30 слов-апгрейдов B2→C1",
    description:
      "30 пар слов, где обычное B2-слово меняется на точное C1-слово — с живым примером из жизни, а не из учебника.",
  },
  {
    file: "Лид-магнит_ДУМАЮ_10_замен.pdf",
    slug: "dumayu-10-zamen",
    title: "10 живых замен для I think",
    description:
      "У носителя на каждый уровень уверенности своя фраза — от осторожного it seems to me до твёрдого I'd argue. 10 замен с пометкой, для какой степени уверенности каждая подходит.",
  },
  {
    file: "Лид-магнит_ЖИВОЙ_10_фраз.pdf",
    slug: "zhivoy-10-fraz",
    title: "10 живых фраз, которых не даст AI",
    description:
      "Фразы, которые ни один чат-бот не предложит первым — потому что они не «правильные» с точки зрения грамматики, а настоящие.",
  },
  {
    file: "Лид-магнит_НОСИТЕЛИ_30_фраз.pdf",
    slug: "nositeli-30-fraz",
    title: "30 фраз, как правда говорят носители",
    description:
      "30 живых фраз против 10 состояний, которые мы обычно описываем одним плоским способом — по три варианта на каждое, с пометкой, где что уместно.",
  },
  {
    file: "Лид-магнит_ОБЯЗАНА_10_пар.pdf",
    slug: "obyazana-10-par",
    title: "10 пар модальных глаголов, которые меняют смысл фразы",
    description:
      "Mustn't, don't have to, needn't, may not, ought to — 10 пар, где смысл расходится на 180 градусов. Что означает каждый глагол и живой пример на каждый.",
  },
  {
    file: "Лид-магнит_ПУТАНИЦА_10_пар.pdf",
    slug: "putanitsa-10-par",
    title: "10 пар C1-слов, которые путают даже на CPE",
    description:
      "economic/economical, historic/historical, considerate/considerable и ещё семь пар, которые путают не потому что вы плохо знаете английский, а потому что в русском разница часто стёрта.",
  },
  {
    file: "Лид-магнит_РЕАКЦИЯ_20_слов.pdf",
    slug: "reaktsiya-20-slov",
    title: "20 слов-ложных друзей переводчика",
    description:
      "Actually ≠ актуально. Magazine ≠ магазин. Biscuit ≠ бисквит. 20 слов, которые звучат почти как русские, а значат совсем другое.",
  },
  {
    file: "Лид-магнит_СЕРИАЛ_15_фраз.pdf",
    slug: "serial-15-fraz",
    title: "15 фраз из сериалов, которые не гуглятся",
    description:
      "throw someone under the bus, get cold feet, catch feelings — фразы, которые не переводят, а считывают по контексту. Для тех, кто смотрит сериалы в оригинале.",
  },
  {
    file: "Лид-магнит_СТАНДАРТ_7_правил.pdf",
    slug: "standart-7-pravil",
    title: "7 правил учебника, которые нарушает живая речь",
    description:
      "Что говорит учебник, что реально делает носитель, и живой пример на каждое правило — специально для Speaking.",
  },
];

async function seed() {
  for (const magnet of MAGNETS) {
    const filePath = path.join(MATERIALS_DIR, magnet.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`пропускаю (файл не найден): ${filePath}`);
      continue;
    }

    const existing = await client.fetch(
      `*[_type == "leadMagnet" && slug.current == $slug][0]{_id}`,
      { slug: magnet.slug }
    );
    if (existing) {
      console.log(`уже есть, пропускаю: ${magnet.title}`);
      continue;
    }

    console.log(`загружаю PDF: ${magnet.file}`);
    const asset = await client.assets.upload("file", fs.createReadStream(filePath), {
      filename: magnet.file,
    });

    await client.create({
      _type: "leadMagnet",
      title: magnet.title,
      slug: { _type: "slug", current: magnet.slug },
      description: magnet.description,
      pdfFile: { _type: "file", asset: { _type: "reference", _ref: asset._id } },
    });
    console.log(`создан документ: ${magnet.title}`);
  }
  console.log("Готово. sendpulseListId для каждого гайда впишите в Studio (/studio) после создания списков в SendPulse.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
