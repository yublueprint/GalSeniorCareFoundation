import type { SlideContent } from "@backend/types";

// Extract matching slide content
type TitleCaseStudySlideContent = Extract<SlideContent, { layoutType: "title_case_study" }>;

interface TitleCaseStudySlideProps {
  content: TitleCaseStudySlideContent;
}

export default function TitleCaseStudySlide({ content }: TitleCaseStudySlideProps) {
  return (
    <div className="flex flex-col flex-1 h-full w-full px-8 py-10 md:px-20 md:py-16 bg-white overflow-y-auto">
      {/* Page Title */}
      <h1 className="text-4xl md:text-[44px] font-bold text-gray-900 mb-10">
        {content.title}
      </h1>

      {/* Case Study Content Wrapper */}
      <div className="flex-1 flex flex-col gap-10">
        
        {/* Body Text (Caption) */}
        <div className="text-lg text-gray-800">
          <p className="whitespace-pre-wrap leading-relaxed max-w-4xl">
            {content.caption}
          </p>
        </div>

        {/* Body Text (Point Form) */}
        <div className="text-lg text-gray-800">
          {content.points && content.points.length > 0 ? (
            <ul className="list-disc pl-6 space-y-4 max-w-4xl">
              {content.points.map((point, index) => (
                <li key={index} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

      </div>

      {/* Spacer to align properly with other slides */}
      <div className="mb-24"></div>
    </div>
  );
}