export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  imageUrl?: string;
  isCompleted?: boolean;
}

export interface ModuleCardProps {
  module: Module;
  onStartModule: (moduleId: string) => void;
}
