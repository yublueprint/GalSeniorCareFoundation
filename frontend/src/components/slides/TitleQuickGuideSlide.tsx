import type { SlideContent } from "@backend/types";

// Extract matching slide content
type TitleQuickGuideSlideContent = Extract<SlideContent, { layoutType: "title_quick_guide" }>;

interface TitleQuickGuideSlideProps {
  content: TitleQuickGuideSlideContent;
}

export default function TitleQuickGuideSlide({ content }: TitleQuickGuideSlideProps) {
  return (
    <div className="flex flex-col flex-1 h-full w-full px-8 py-10 md:px-20 md:py-16 bg-white overflow-y-auto">
      {/* Page Title */}
      <h1 className="text-4xl md:text-[44px] font-bold text-gray-900 mb-10">
        {content.title}
      </h1>

      {/* Numbered Body Texts */}
      <div className="text-lg text-gray-800 flex-1">
        {content.points && content.points.length > 0 ? (
          <ol className="list-decimal pl-6 space-y-8 max-w-4xl">
            {content.points.map((point, index) => (
              <li key={index} className="leading-relaxed pl-2">
                {point}
              </li>
            ))}
          </ol>
        ) : null}
      </div>

      {/* Spacer to align properly with other slides */}
      <div className="mb-24"></div>
    </div>
  );
}