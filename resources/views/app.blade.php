<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="canonical" href="https://www.aluvimueble.com/" />

        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name') }}</title>
        {{-- <link rel="icon" type="image/png" href="storage/icons/facebook.svg"> --}}

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <meta 
        property="og:title" 
        content="Alimueble - Muebles en vidrio, aluminio y madera" 
        />
        <meta 
        property="og:description" 
        content="En Alimueble diseñamos y fabricamos muebles personalizados en vidrio, aluminio y madera. Soluciones modernas, elegantes y funcionales para cada espacio." 
        />
        <meta 
        property="og:image" 
        content="https://www.aluvimueble.com/storage/images/portada.jpg"
        />

        <meta 
        property="og:url" 
        content="https://www.aluvimueble.com"
        >
        <meta 
        property="og:type" 
        content="website"
        >
            <!-- imagen que se ve en twiter antes de ingresar a la pagina -->
        <meta 
        name="description" 
        content="Alimueble crea muebles personalizados en vidrio, aluminio y madera. Diseño moderno, calidad y elegancia para tu hogar u oficina."
        />


        <meta 
        name="twitter:card" 
        content="summary_large_image"
        />
        <meta 
        name="twitter:site" 
        content="@sukistrukis" 
        />
        <meta 
        name="twitter:title" 
        content="Alimueble - Muebles personalizados"
        >
        
        <meta 
        name="twitter:description" 
        content="Muebles a medida en vidrio, aluminio y madera. Diseño moderno, calidad premium y atención personalizada. Descubre lo que podemos crear para ti." 
        />
        <meta 
        name="twitter:image" 
        content="https://www.aluvimueble.com/storage/images/portada.jpg" 
        />
        <meta 
        name="robots" 
        content="index, follow"
        >
        <meta 
        name="author" 
        content="Alimueble"
        >
        <meta 
        http-equiv="Content-Language" 
        content="es"
        >
        <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Alimueble",
              "url": "https://www.aluvimueble.com",
              "logo": "https://www.aluvimueble.com/storage/images/logo.png",
              "description": "Empresa especializada en diseño y fabricación de muebles personalizados en vidrio, aluminio y madera.",
              "sameAs": [
                "https://facebook.com/alimueble",
                "https://twitter.com/sukistrukis"
              ]
            }
        </script>
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "¿Hacen muebles a medida?",
                    "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, en Alimueble diseñamos y fabricamos muebles completamente personalizados según tus necesidades."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Qué materiales usan?",
                    "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Usamos vidrio templado, aluminio de alta calidad y maderas resistentes que garantizan durabilidad y estilo."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Dónde están ubicados?",
                    "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Estamos ubicados en [tu ciudad], pero también realizamos envíos e instalaciones en otras zonas."
                    }
                }
                ]

        }
        </script>
            
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
