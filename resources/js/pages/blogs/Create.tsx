import InputError from "@/components/input-error";
import ImageUploader from "@/components/input-images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm, Link } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Block',
        href: '/block/create'
    },
];

export default function Create() {
    const { data, setData, post, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        cover_image: '',
        images: [] as File[],
        videos: [] as string[],
        seo_meta: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("description", data.description);
        formData.append("cover_image", data.cover_image);
        formData.append("seo_meta", data.seo_meta);

        // Agregar archivos de imágenes al FormData
        data.images.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });
        post(route("block.store"), {
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Block" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <Link
                        href={route('block.index')}
                        className='px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800'
                    >
                        <span className="text-gray-500 hover:text-gray-800">
                            Back to Blocks
                        </span>
                    </Link>
                </div>
                <form onSubmit={submit} className='space-y-6'>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input 
                            id='title'
                            className='mt-1 block w-full'
                            value={data.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('title', e.target.value)}
                            autoComplete='title'
                            placeholder='Block title'
                        />
                        <InputError message={errors.title} className='mt-2' />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input 
                            id='slug'
                            className='mt-1 block w-full'
                            value={data.slug}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('slug', e.target.value)}
                            autoComplete='slug'
                            placeholder='Block slug'
                        />
                        <InputError message={errors.slug} className='mt-2' />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input 
                            id='description'
                            className='mt-1 block w-full'
                            value={data.description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('description', e.target.value)}
                            autoComplete='description'
                            placeholder='Block description'
                        />
                        <InputError message={errors.description} className='mt-2' />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="cover_image">Cover Image</Label>
                        <Input 
                            id='cover_image'
                            className='mt-1 block w-full'
                            value={data.cover_image}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('cover_image', e.target.value)}
                            autoComplete='cover_image'
                            placeholder='Cover image URL'
                        />
                        <InputError message={errors.cover_image} className='mt-2' />
                    </div>
                    <ImageUploader onImagesUpload={(files) => setData('images', files)} />
                    <div className="grid gap-2">
                        <Label htmlFor="videos">Videos</Label>
                        <Input 
                            id='videos'
                            type='text'
                            className='mt-1 block w-full'
                            value={data.videos.join(', ')}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('videos', e.target.value.split(', '))}
                            autoComplete='videos'
                            placeholder='Enter video URLs separated by commas'
                        />
                        <InputError message={errors.videos} className='mt-2' />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="seo_meta">SEO Meta</Label>
                        <Input 
                            id='seo_meta'
                            className='mt-1 block w-full'
                            value={data.seo_meta}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('seo_meta', e.target.value)}
                            autoComplete='seo_meta'
                            placeholder='SEO meta description'
                        />
                        <InputError message={errors.seo_meta} className='mt-2' />
                    </div>



                    <div>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
