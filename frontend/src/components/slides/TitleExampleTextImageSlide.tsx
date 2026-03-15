import type { SlideContent } from "@backend/types";

// Extract matching slide content
type TitleExampleTextImageSlideContent = Extract<SlideContent, { layoutType: "title_example_text_image" }>;

interface TitleExampleTextImageSlideProps {
  content: TitleExampleTextImageSlideContent;
}

export default function TitleExampleTextImageSlide({ content }: TitleExampleTextImageSlideProps) {
  return (
    <div className="flex flex-col flex-1 h-full w-full px-8 py-10 md:px-20 md:py-16 bg-white overflow-y-auto">
      {/* Page Title */}
      <h1 className="text-4xl md:text-[44px] font-bold text-gray-900 mb-6">
        {content.title}
      </h1>

      {/* Two-Column Content Area */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24 flex-1">
        
        {/* Left Column: Subtitle & Body Text */}
        <div className="flex-1 max-w-2xl flex flex-col pt-2">
          <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6">
            {content.subtitle}
          </h2>
          <div className="text-lg text-gray-800">
            <p className="whitespace-pre-wrap leading-relaxed">
              {content.exampleText}
            </p>
          </div>
        </div>

        {/* Right Column: Image Box */}
        <div className="flex-1 flex justify-start items-start">
          <div className="w-full max-w-[600px] aspect-[4/3] border border-gray-400 bg-white relative overflow-hidden flex items-center justify-center">
            {content.imageUrl ? (
              <img 
                src={content.imageUrl} 
                alt="Example visual" 
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
        </div>

      </div>

      {/* Spacer to align properly with other slides */}
      <div className="mb-24"></div>
    </div>
  );
}