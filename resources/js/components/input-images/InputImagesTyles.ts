export interface filesUploaderProps {
  onFilesUpload: (files: File[],previews: string[]) => void
    multiple?: boolean;
    accept?: string; 
    label?: string;
  }
