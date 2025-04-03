import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}
interface CarouselBlogProps {
    className?: string; 
  }
interface filesBlogProps {
    images?: string[],
    video?: string[],
}