import FormCreateBlog from "@/components/blog/FormCreateBlog";
import PreviewBlog from "@/components/blog/PrewiewBlog";
import { BlogFormProvider} from "@/hooks/FormBlogContext.tsx";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Block',
        href: route('blogs.create')
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Blogs" />
            <BlogFormProvider>
              <div 
              className="flex h-full flex-1 flex-wrap-reverse  gap-4 rounded-xl p-4"
              >
                  <PreviewBlog  />
                  <FormCreateBlog  />
                  {/* <FormDataDisplay /> */}
              </div>
            </BlogFormProvider>
        </AppLayout>
    );
}



//  function FormDataDisplay() {
//   const { data } = useBlogForm();

//   return (
//     <div>
//       <h2>Datos del Formulario</h2>
//       <p>
//         <strong>Título:</strong> {data.title}
//       </p>
//       <p>
//         <strong>Slug:</strong> {data.slug}
//       </p>
//       <p>
//         <strong>Descripción:</strong> {data.description}
//       </p>
//       <p>
//         <strong>SEO Meta:</strong> {data.seo_meta}
//       </p>
//       <p>
//         <strong>Imágenes:</strong> {data.images.length}
//         <strong>Imágenes:</strong> {data.image_previews.length}
//       </p>

//       <p>
//         <strong>Videos:</strong> {data.videos.length}
//         <strong>Videos:</strong> {data.video_previews.length}
//       </p>
    
//     </div>
//   );
// }
