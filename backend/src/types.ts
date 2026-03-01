// ─── Modules ─────────────────────────────────────────────────────────────────

export interface Module {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  objectives?: string[];
}

// ─── Slides ──────────────────────────────────────────────────────────────────

export type SlideContent =
  | { layoutType: "title_body"; title: string; body: string; caption?: string }
  | { layoutType: "title_body_tip"; title: string; body: string; tipTitle: string; tipText: string }
  | { layoutType: "title_body_point_form"; title: string; points: string[] }
  | { layoutType: "title_example_text"; title: string; subtitle: string; exampleText: string }
  | { layoutType: "title_example_text_image"; title: string; subtitle: string; exampleText: string; imageUrl: string }
  | { layoutType: "title_case_study"; title: string; caption: string; points: string[] }
  | { layoutType: "title_quick_guide"; title: string; points?: string[] };

export type Slide = SlideContent & {
  id: string;
  moduleId: string;
  order: number;
};

// ─── Quizzes ─────────────────────────────────────────────────────────────────

export interface Option {
  text: string;
  explanation: string;
}

export interface Question {
  id: string;
  quizId: string;
  order: number;
  scenarioText: string;
  scenarioImageUrl?: string;
  options: Option[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
}

// ─── Progress ────────────────────────────────────────────────────────────────

export type ModuleStatus = "not_started" | "in_progress" | "quiz" | "completed";

export interface ModuleProgress {
  id: string;
  userId: string;
  moduleId: string;
  status: ModuleStatus;
  currentSlideId?: string;
  completedSlides: number;
  totalSlides: number;
  startedAt: Date;
  completedAt?: Date;
  lastAccessedAt: Date;
}

export type QuizAttemptStatus = "not_started" | "in_progress" | "completed";

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  status: QuizAttemptStatus;
  questionsAnswered: number;
  totalQuestions: number;
  currentQuestionIndex: number;
  startedAt: Date;
  completedAt?: Date;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ModuleListItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  objectives?: string[];
  progress: number;
  isCompleted: boolean;
}

export type ModuleRedirectTo =
  | "welcome"
  | `slide/${string}`
  | `quiz/${string}/question/${string}`
  | "completed";

export interface ModuleEntryResponse {
  module: Module;
  redirectTo: ModuleRedirectTo;
}
