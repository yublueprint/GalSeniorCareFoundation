import type { SlideContent } from "@backend/types";

// Extract matching slide content
type TitleBodyPointFormSlideContent = Extract<SlideContent, { layoutType: "title_body_point_form" }>;

interface TitleBodyPointFormSlideProps {
  content: TitleBodyPointFormSlideContent;
}

export default function TitleBodyPointFormSlide({ content }: TitleBodyPointFormSlideProps) {
  return (
    <div className="flex flex-col flex-1 h-full w-full px-8 py-10 md:px-20 md:py-16 bg-white overflow-y-auto">
      {/* Page Title */}
      <h1 className="text-4xl md:text-[44px] font-bold text-gray-900 mb-10">
        {content.title}
      </h1>

      {/* Body Text (Point Form) */}
      <div className="text-lg text-gray-800 flex-1">
        {content.points && content.points.length > 0 ? (
          <ul className="list-disc pl-6 space-y-4">
            {content.points.map((point, index) => (
              <li key={index} className="leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      
      {/* Spacer to align properly with other slides */}
      <div className="mb-24"></div>
    </div>
  );
}