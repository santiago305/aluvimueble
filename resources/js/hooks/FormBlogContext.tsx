import React, { createContext, useContext, useState } from "react";
import { router } from "@inertiajs/react";

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
  submitForm: (
    routeName: string,
    method: "post" | "put",
    formData: FormData,
    options?: {
      onSuccess?: () => void;
      onError?: (errors: Record<string, string>) => void;
    }
  ) => void;
  reset: () => void;
  errors: Partial<Record<keyof BlogData, string>>;
}

const BlogFormContext = createContext<BlogFormContextProps | undefined>(undefined);

export const BlogFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setDataState] = useState<BlogData>({
    title: "",
    slug: "",
    description: "",
    seo_meta: "",
    cover_image: [],
    images: [],
    image_previews: [],
    videos: [],
    video_previews: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BlogData, string>>>({});

  const setData = <K extends keyof BlogData>(field: K, value: BlogData[K]) => {
    setDataState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const reset = () => {
    setDataState({
      title: "",
      slug: "",
      description: "",
      seo_meta: "",
      cover_image: [],
      images: [],
      image_previews: [],
      videos: [],
      video_previews: [],
    });
    setErrors({});
  };

  const submitForm = (
    routeName: string,
    method: "post" | "put",
    formData: FormData,
    { onSuccess, onError }: { onSuccess?: () => void; onError?: (errors: any) => void } = {}
  ) => {
    if (method === "put") {
      formData.append("_method", "put");
    }

    router.post(routeName, formData, {
      onSuccess: () => {
        reset();
        if (onSuccess) onSuccess();
      },
      onError: (errs) => {
        setErrors(errs);
        if (onError) onError(errs);
      },
    });
  };

  return (
    <BlogFormContext.Provider value={{ data, setData, submitForm, reset, errors }}>
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
