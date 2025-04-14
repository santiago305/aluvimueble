import { ChangeEvent, FormEventHandler, useEffect, useState} from "react";
import ImageUploader from "../input-images/input-images";
import { Button } from "../ui/button";
import Input from "../Form/input/Input";
import InputForm from "../Form/input/Input";
import { Label } from "../ui/label";
import InputError from "../input-error";
import { cn } from "@/lib/utils";
import {  useBlogForm } from "@/hooks/FormBlogContext";
import { BlogsProps } from "@/types/blogs";

const formatSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') 
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-'); 
};

export default function FormCreateBlog ({ className, mode, blogs }: BlogsProps & React.ComponentProps<"input">){

    
    const { data, setData, errors, submitForm } = useBlogForm();
    const [globalError, setGlobalError] = useState<string | null>(null);

    useEffect(() => {
        if (mode === "put" && blogs) {
          setData("title", blogs.title);
          setData("slug", blogs.slug);
          setData("description", blogs.description);
          setData("seo_meta", blogs.seo_meta);
          setData("image_previews", blogs.images || []);
          setData("video_previews", blogs.videos || []);
          setData("cover_image", []); 
          setData("images", []);
          setData("videos", []);
        }
      }, [mode, blogs]);
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("description", data.description);
        formData.append("seo_meta", data.seo_meta);
        
        data.cover_image.forEach((file, index) => {
            formData.append(`cover_image[${index}]`, file);
        });
        data.images.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });
        data.videos.forEach((file, index) => {
            formData.append(`videos[${index}]`, file);
        });
        const routeName = mode === "put" && blogs
        ? route("blogs.update", blogs.slug)
        : route("blogs.store");

        submitForm(routeName, mode, formData, {
            onSuccess: () => {
              setGlobalError(null);
            },
            onError: (errors) => {
              if (errors.slug) {
                setGlobalError(errors.slug);
                window.dispatchEvent(
                  new CustomEvent("flash:error", {
                    detail: errors.slug,
                  })
                );
              }
            },
        });
    };
    
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setData('title', newTitle);
        setData('slug', formatSlug(newTitle)); 
    };

    const handleCoverUpload = (files: File[]) => {
        if (files.length > 0) {
            setData("cover_image", files); 
        }
    };

    const handleImagesUpload = (files: File[],urls: string[]) => {
        setData('images', files);
        setData('image_previews', urls); 

    };
    const handleVideosUpload = (files: File[],urls: string[]) => {
        setData("videos", files);
        setData("video_previews", urls);
    }

    return (
        <form onSubmit={submit} className='w-full sm:max-w-[300px] sm:min-w-[300px] space-y-6 select-none'>
            <InputForm
                id="title"
                label="Title"
                value={data.title}
                placeholder="Block title"
                autoComplete="title"
                error={errors.title}
                onChange={handleTitleChange} 
            />
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                    id="description"
                    className={cn(
                            "min-h-[120px] border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive resize-none",
                            className || ""
                        )}
                    value={data.description}
                    placeholder="Block description"
                    onChange={(e) => {
                        const value = e.target.value;
                        setData("description", value);
                    }
                    }
                    
                />
                {errors.description && <InputError message={errors.description} className="mt-2" />}
            </div>

            
            <Input
                id="seo_meta"
                label="SEO Meta"
                value={data.seo_meta}
                placeholder="SEO meta description"
                autoComplete="seo_meta"
                error={errors.seo_meta}
                onChange={(e) => setData("seo_meta", e.target.value)}
            />

            <ImageUploader 
            label="Subir Imagenes del proyecto"
            multiple={true} 
            id="images"
            accept="image/webp, image/svg+xml"
            onFilesUpload={handleImagesUpload} 
            error={errors.images}
            />
            
            <ImageUploader 
            label="Subir portada del proyecto"
            id="cover"
            accept="image/webp, image/svg+xml" 
            onFilesUpload={handleCoverUpload} 
            error={errors.cover_image}
            />

            <ImageUploader
            label="Subir video del proyecto"
            id="video" 
            onFilesUpload={handleVideosUpload} 
            accept="video/mp4,video/webm" 
            error={errors.videos}
            />
            <div>
                <Button type="submit" className="cursor-pointer mt-1">Save</Button>
            </div>
        </form>
    );
}
