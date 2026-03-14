import type { SlideContent } from "@backend/types";

// Extract matching slide content
type TitleBodySlideContent = Extract<SlideContent, { layoutType: "title_body" }>;

interface TitleBodySlideProps {
  content: TitleBodySlideContent;
}

export default function TitleBodySlide({ content }: TitleBodySlideProps) {
  // Parsing bullet point text
  const bulletItems = content.body
    .split("\n")
    .map((line) => line.replace(/^[•\-\s]+/, "").trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col flex-1 h-full w-full px-8 py-10 md:px-20 md:py-16 bg-white overflow-y-auto">
      {/* Page Title */}
      <h1 className="text-4xl md:text-[44px] font-bold text-gray-900 mb-10">
        {content.title}
      </h1>

      {/* Body Text as list (or fallback to standard paragraph of text) */}
      <div className="text-lg text-gray-800 flex-1">
        {bulletItems.length > 0 ? (
          <ul className="list-disc pl-6 space-y-3">
            {bulletItems.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed">{content.body}</p>
        )}
      </div>

      {/* H2 - Caption (Optional) */}
      {content.caption && (
        <h2 className="text-[22px] md:text-[24px] font-bold text-gray-900 mt-12 mb-24">
          {content.caption}
        </h2>
      )}
    </div>
  );
}