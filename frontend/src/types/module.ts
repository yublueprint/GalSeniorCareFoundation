export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  imageUrl?: string;
  isCompleted?: boolean;
  objectives?: string[];
}

export interface ModuleCardProps {
  module: Module;
  onStartModule: (moduleId: string) => void;
}
