// BlogFormContext.tsx
import React, { createContext, useContext } from "react";
import { useForm, InertiaFormProps } from "@inertiajs/react";

// Add an index signature
interface BlogData {
  title: string;
  slug: string;
  description: string;
  seo_meta: string;
  cover_image: File[];
  images: File[];
  image_previews: string[];
  videos: File[];
  video_previews: string[];
  [key: string]: any;
}

interface BlogFormContextProps {
  data: BlogData;
  setData: <K extends keyof BlogData>(field: K, value: BlogData[K]) => void;
  post: InertiaFormProps<BlogData>["post"];
  reset: () => void; 
  errors: Partial<Record<keyof BlogData, string>>;
}

const BlogFormContext = createContext<BlogFormContextProps | undefined>(undefined);

export const BlogFormProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, setData, post, reset, errors } = useForm<BlogData>({
    title: '',
    slug: '',
    description: '',
    cover_image: [],
    images: [],
    image_previews: [],
    videos: [],
    video_previews: [],
    seo_meta: '',
  });

  return (
    <BlogFormContext.Provider value={{ data, setData, post, reset, errors }}>
      {children}
    </BlogFormContext.Provider>
  );
};

export const useBlogForm = () => {
  const context = useContext(BlogFormContext);
  if (!context) {
    throw new Error("useBlogForm must be used within a BlogFormProvider");
  }
  return context;
};
