type Props = {
    questionsAnswered: number;
    totalQuestions: number;
  };
  
  export default function QuizProgressBar({
    questionsAnswered,
    totalQuestions,
  }: Props) {
    const progress = Math.round((questionsAnswered / totalQuestions) * 100);
  
    return (
    <div>
      {/* Progress Bar */}
      <div className="flex justify-center"> 
        <div className="w-full h-[13px] bg-[#D9D9D9] rounded-[22px] border border-[#A8A8A8]">
          <div
            className="h-full bg-[#FBC176] rounded-[22px] transition-all "
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Progress Text */}
      <div className="text-[#121212]" style={{fontFamily: 'Inter', fontWeight: 500, fontSize: '16px',  lineHeight: '24px',  letterSpacing: '-0.011em' }}>
        {progress}% complete
      </div>
    </div>
    
    );
  }