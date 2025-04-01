export const logo: {
    id: number;
    name: string;
    logo: string;
}[] = 
[
    {
        id: 1,
        name: "Aluvimuble",
        logo: "storage/images/logo.svg",
    }
]

export const networks: {
    id: number;
    name: string;
    url: string;
    logo: string;
}[] = 
[
    {
        id: 1,
        name: "Facebook",
        url: "https://www.facebook.com/aluvimueble/",
        logo: "storage/icons/facebook.svg",
    },
    {
        id: 2,
        name: "Instagram",
        url: "https://www.instagram.com/aluvimueble/",
        logo: "storage/icons/instagram.svg",
    },
    {
        id: 3,
        name: "Twitter",
        url: "https://www.x.com/aluvimueble/",
        logo: "storage/icons/x.svg",
    },
    {
        id: 4,
        name: "Tiktok",
        url: "https://www.tiktok.com/aluvimueble/",
        logo: "storage/icons/tiktok.svg",
    }
]

export const contact: {
    id: number;
    name: string;
    url: string;
}[] = 
[
    {
        id: 1,
        name: "Whatsapp",
        url: "https://wa.me/51",
    }
]

export const page:{
    id: number;
    title: string;
    content: string;
    description?: string;
    description2?: string;
    image?: string;
}[]=[
    {
        id: 1,
        title: "Home",
        content: "Diseño y calidad en muebles, vidriería y aluminio",
        description: "Creamos espacios únicos con materiales de primera calidad. Diseños minimalistas que transforman cualquier ambiente.",
        image: "storage/images/home.webp",
    },
    {
        id: 2,
        title: "Proyectos",
        content: "Proyectos",
        description: "Diseñamos y fabricamos con precisión y atención al detalle.",
    },
    {
        id: 3,
        title: "Nosotros",
        content: "Sobre Nosotros",
        description: "Con más de 15 años de experiencia, nos especializamos en la creación de muebles, trabajos en vidrio y estructuras de aluminio de alta calidad. Nuestro equipo de artesanos combina técnicas tradicionales con tecnología moderna para ofrecer productos excepcionales.",
        description2: "Cada pieza que creamos refleja nuestro compromiso con la excelencia y la atención al detalle. Trabajamos estrechamente con nuestros clientes para entender sus necesidades y convertir sus ideas en realidad.",
        image: "storage/images/home.webp",
    }
]