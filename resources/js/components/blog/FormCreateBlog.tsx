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
        cover_image: string;
        images: File[];
        videos: string[];
        seo_meta: string;
    }>({
        title: '',
        slug: '',
        description: '',
        cover_image: '',
        images: [],
        videos: [],
        seo_meta: '',
    });

    const handleChange = (field: keyof typeof data) => <T extends HTMLInputElement | HTMLTextAreaElement>(e: React.ChangeEvent<T>)  => {
        const value = e.target.value;
        setData(field, value);
        onFormChange(field, value);
    };

    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("description", data.description);
        formData.append("cover_image", data.cover_image);
        formData.append("seo_meta", data.seo_meta);
        
        data.images.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        post(route("block.store"), {
            body: formData
        });
    };
    
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setData('title', newTitle);
        setData('slug', formatSlug(newTitle)); 
        onFormChange('title', newTitle);
    };

    const handleImagesUpload = (files: File[], previews: string[]) => {
        setData('images', files); 
        onPreviewBlogs(
            data.title,
            data.description,
            data.cover_image,
            data.seo_meta,
            previews,
            data.videos,
        );
    };

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

            <Input
                id="cover_image"
                label="Cover Image"
                value={data.cover_image}
                placeholder="Cover image URL"
                autoComplete="cover_image"
                error={errors.cover_image}
                onChange={handleChange('cover_image')}
            />

            <Input
                id="videos"
                label="Videos"
                value={data.videos.join(', ')}
                placeholder="Enter video URLs separated by commas"
                autoComplete="videos"
                error={errors.videos}
                onChange={(e) => {
                    const value = e.target.value
                        .split(/\s*,\s*/)
                        .map(v => v.trim())
                        .filter(v => v !== '');
                    setData('videos', value);
                    onFormChange("videos", value);
                }}
            />


            <ImageUploader onImagesUpload={handleImagesUpload} />

            <div>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
