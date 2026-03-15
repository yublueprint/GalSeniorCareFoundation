import type { SlideContent } from "@backend/types";

// Extract matching slide content
type TitleExampleTextSlideContent = Extract<SlideContent, { layoutType: "title_example_text" }>;

interface TitleExampleTextSlideProps {
  content: TitleExampleTextSlideContent;
}

export default function TitleExampleTextSlide({ content }: TitleExampleTextSlideProps) {
  return (
    <div className="flex flex-col flex-1 h-full w-full px-8 py-10 md:px-20 md:py-16 bg-white overflow-y-auto">
      {/* Page Title */}
      <h1 className="text-4xl md:text-[44px] font-bold text-gray-900 mb-6">
        {content.title}
      </h1>

      {/* Subtitle */}
      <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6">
        {content.subtitle}
      </h2>
        
      {/* Body Text - Paragraph */}
      <div className="text-lg text-gray-800">
        <p className="whitespace-pre-wrap leading-relaxed">
          {content.exampleText}
        </p>
      </div>

      {/* Spacer to align properly with other slides */}
      <div className="mb-24"></div>
    </div>
  );
}