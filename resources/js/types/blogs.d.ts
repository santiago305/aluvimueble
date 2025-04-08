interface Blogs {
    id: number;
    title: string; // Usamos 'title' en lugar de 'name' según el modelo
    slug: string;
    description: string;
    cover_image: string;
    images: string[]; // Suponiendo que este es un arreglo de URLs de imágenes
    videos: string[]; // Suponiendo que este es un arreglo de URLs de videos
    seo_meta: string;
    views: number;
    status: boolean;
    published_at: string; // Se utiliza 'string' ya que se maneja como datetime
}

export interface BlogsListProps {
  blocks: Blogs[]; 
  meta: {
      current_page: number;
      last_page: number;
      links: Array<{
          url: string | null;
          label: string;
          active: boolean;
      }>;
  };
}

export interface BlogsProps {
  blogs: Blogs[];
}

export interface PreviewBlogsPros {
  onPreviewBlogs: (
    title: string,
    description: string,
    seo_meta: string,
    cover_image: string[],
    previews: string[],
    videos: string[],
  ) => void
  // onFormChange: (
  //   field: string, 
  //   value: string | string[]
  // ) => void 
}