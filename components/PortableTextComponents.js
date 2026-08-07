import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

function dimensionsFromRef(ref) {
  // Sanity asset _ref: image-<id>-<width>x<height>-<format>
  const match = /-(\d+)x(\d+)-\w+$/.exec(ref || "");
  if (!match) return { width: 1200, height: 900 };
  return { width: Number(match[1]), height: Number(match[2]) };
}

export const portableTextComponents = {
  types: {
    image: ({ value }) => {
      const { width, height } = dimensionsFromRef(value?.asset?._ref);
      const url = urlForImage(value).width(1200).fit("max").url();
      return (
        <Image
          src={url}
          alt={value.alt || ""}
          width={width}
          height={height}
          sizes="(max-width: 720px) 100vw, 720px"
        />
      );
    },
    example: ({ value }) => (
      <div className={value.kind === "bad" ? "example-bad" : "example-good"}>
        {value.tag && <span className="tag">{value.tag}</span>}
        {value.text}
        {value.translation && (
          <>
            {" — "}
            <em>{value.translation}</em>
          </>
        )}
      </div>
    ),
  },
  block: {
    closingThought: ({ children }) => <p className="closing-thought">{children}</p>,
  },
};
