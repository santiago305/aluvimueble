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
  images: string[];
  videos: string[];
  [key: string]: any; // This makes BlogData compatible with FormDataType
}

interface BlogFormContextProps {
  data: BlogData;
  setData: <K extends keyof BlogData>(field: K, value: BlogData[K]) => void;
  post: InertiaFormProps<BlogData>["post"];
  errors: Partial<Record<keyof BlogData, string>>;
}

const BlogFormContext = createContext<BlogFormContextProps | undefined>(undefined);

export const BlogFormProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, setData, post, errors } = useForm<BlogData>({
    title: '',
    slug: '',
    description: '',
    cover_image: [],
    images: [],
    videos: [],
    seo_meta: '',
  });

  return (
    <BlogFormContext.Provider value={{ data, setData, post, errors }}>
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
