import FrontPage from "../sections/FronPage";
import { Button } from "../ui/button";

export default function Main () {
    return (
        <main className="flex-1">
        <section className="w-full py-24">
          <FrontPage />
        </section>

         <section id="Projects" className="w-full py-12 bg-muted/50">
          
        </section>

        {/*<section id="nosotros" className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Nuestro taller"
                width={800}
                height={600}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Sobre Nosotros</h2>
                <p className="text-muted-foreground">
                  Con más de 15 años de experiencia, nos especializamos en la creación de muebles, trabajos en vidrio y
                  estructuras de aluminio de alta calidad. Nuestro equipo de artesanos combina técnicas tradicionales
                  con tecnología moderna para ofrecer productos excepcionales.
                </p>
                <p className="text-muted-foreground">
                  Cada pieza que creamos refleja nuestro compromiso con la excelencia y la atención al detalle.
                  Trabajamos estrechamente con nuestros clientes para entender sus necesidades y convertir sus ideas en
                  realidad.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button variant="outline" asChild>
                    <Link href="#contacto">Conoce más</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="w-full py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contacto</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Estamos listos para hacer realidad tu próximo proyecto.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 mt-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <p>Av. Principal 1234, Ciudad</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <p>+123 456 7890</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <p>info@artesano.com</p>
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Horario de atención</h3>
                  <p className="text-sm text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</p>
                  <p className="text-sm text-muted-foreground">Sábados: 9:00 - 13:00</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Cuéntanos sobre tu proyecto"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Enviar mensaje
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        </main>
    )
}