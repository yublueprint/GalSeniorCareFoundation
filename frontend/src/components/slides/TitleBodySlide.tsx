import type { SlideContent } from "@backend/types";

// Extract matching slide content
type TitleBodySlideContent = Extract<SlideContent, { layoutType: "title_body" }>;

interface TitleBodySlideProps {
  content: TitleBodySlideContent;
}

export default function TitleBodySlide({ content }: TitleBodySlideProps) {
  return (
    <div className="flex flex-col flex-1 h-full w-full px-8 py-10 md:px-20 md:py-16 bg-white overflow-y-auto">
      {/* Page Title */}
      <h1 className="text-4xl md:text-[44px] font-bold text-gray-900 mb-10">
        {content.title}
      </h1>

      {/* Body Text as paragraph */}
      <div className="text-lg text-gray-800 flex-1">
        <p className="whitespace-pre-wrap leading-relaxed">{content.body}</p>
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