import type { SlideContent } from "@backend/types";

// Extract matching slide content
type TitleBodyTipSlideContent = Extract<SlideContent, { layoutType: "title_body_tip" }>;

interface TitleBodyTipSlideProps {
  content: TitleBodyTipSlideContent;
}

export default function TitleBodyTipSlide({ content }: TitleBodyTipSlideProps) {
  return (
    <div className="flex flex-col flex-1 h-full w-full px-8 py-10 md:px-20 md:py-16 bg-white overflow-y-auto">
      {/* Page Title */}
      <h1 className="text-4xl md:text-[44px] font-bold text-gray-900 mb-10">
        {content.title}
      </h1>

      {/* Body Text - Paragraph */}
      <div className="text-lg text-gray-800 flex-1">
        <p className="whitespace-pre-wrap leading-relaxed">{content.body}</p>
      </div>

      {/* Tip Section */}
      <div className="mt-12 mb-24 flex flex-col gap-2">
        <h2 className="text-2xl md:text-[24px] font-bold text-gray-900">
          {content.tipTitle}
        </h2>
        <p className="text-lg text-gray-800 whitespace-pre-wrap leading-relaxed">
          {content.tipText}
        </p>
      </div>
    </div>
  );
}