import { useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler } from "react";
import ImageUploader from "../input-images/input-images";
import { Button } from "../ui/button";
import Input from "../Form/input/Input";
import InputForm from "../Form/input/Input";
import { PreviewBlogsPros } from "@/types/blogs";
import { Label } from "../ui/label";
import InputError from "../input-error";
import { cn } from "@/lib/utils";

const formatSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') 
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-'); 
};

export default function FormCreateBlog ({onPreviewBlogs , onFormChange, className}: PreviewBlogsPros & React.ComponentProps<"input">){
    const { data, setData, post, errors } = useForm<{
        title: string;
        slug: string;
        description: string;
        cover_image:  File[];
        images: File[];
        videos: File[];
        seo_meta: string;
    }>({
        title: '',
        slug: '',
        description: '',
        cover_image: [],
        images: [],
        videos: [],
        seo_meta: '',
    });

    const handleChange = (field: keyof typeof data) => <T extends HTMLInputElement | HTMLTextAreaElement>(e: React.ChangeEvent<T>)  => {
        const value = e.target.value;
        setData(field, value);
        onFormChange(field, value);
    };
    const updatePreview = () => {
        onPreviewBlogs(
          data.title,
          data.description,
          data.seo_meta,
          data.cover_image.map(URL.createObjectURL),
          data.images.map(URL.createObjectURL),
          data.videos.map(URL.createObjectURL)
        );
    };
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("description", data.description);
        formData.append("seo_meta", data.seo_meta);
        
        data.images.forEach((file, index) => {
            formData.append(`cover_image[${index}]`, file);
        });
        data.cover_image.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });
        data.videos.forEach((file, index) => {
            formData.append(`videos[${index}]`, file);
        });
        post(route("blogs.store"), {
            body: formData
        });
    };
    
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setData('title', newTitle);
        setData('slug', formatSlug(newTitle)); 
        onFormChange('title', newTitle);
    };

    const handleCoverUpload = (files: File[]) => {
        if (files.length > 0) {
            setData("cover_image", files);
            setTimeout(updatePreview, 0);
        }
    };

    const handleImagesUpload = (files: File[]) => {
        setData('images', files); 
        setTimeout(updatePreview, 0);
    };
    const handleVideosUpload = (files: File[]) => {
        setData("videos", files);
        setTimeout(updatePreview, 0);
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
                    onChange={(e) => handleChange("description")(e)}
                    
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
                onChange={handleChange("seo_meta")}
            />

            <ImageUploader 
            label="Subir Imagenes del proyecto"
            multiple={true} 
            id="images"
            onFilesUpload={handleImagesUpload} 
            error={errors.images}
            />
            
            <ImageUploader 
            label="Subir portada del proyecto"
            id="cover"
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
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
