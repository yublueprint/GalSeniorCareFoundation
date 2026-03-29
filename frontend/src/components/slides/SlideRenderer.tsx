import type { SlideContent } from "@backend/types";

// Import slide layout components
import TitleBodySlide from "./TitleBodySlide";
import TitleBodyTipSlide from "./TitleBodyTipSlide";
import TitleBodyPointFormSlide from "./TitleBodyPointFormSlide";
import TitleExampleTextSlide from "./TitleExampleTextSlide";
import TitleExampleTextImageSlide from "./TitleExampleTextImageSlide";
import TitleCaseStudySlide from "./TitleCaseStudySlide";
import TitleQuickGuideSlide from "./TitleQuickGuideSlide";

interface SlideRendererProps {
  content: SlideContent;
}

export default function SlideRenderer({ content }: SlideRendererProps) {
  // Render the correct component based on the layoutType
  switch (content.layoutType) {
    case "title_body":
      return <TitleBodySlide content={content} />;

    case "title_body_tip":
      return <TitleBodyTipSlide content={content} />;
      
    case "title_body_point_form":
      return <TitleBodyPointFormSlide content={content} />;
      
    case "title_example_text":
      return <TitleExampleTextSlide content={content} />;
      
    case "title_example_text_image":
      return <TitleExampleTextImageSlide content={content} />;
      
    case "title_case_study":
      return <TitleCaseStudySlide content={content} />;
      
    case "title_quick_guide":
      return <TitleQuickGuideSlide content={content} />;
      
    default:
      // Unknown layoutType
      return (
        <div className="flex h-full w-full items-center justify-center text-red-500 font-bold p-8 text-center bg-gray-50 border border-red-200">
          Error: The layoutType provided to SlideRenderer.tsx doesn't exist.
        </div>
      );
  }
}