import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { contact } from '../../../data';

export default function FrontPage (){
    return (
        <div 
        className="container px-4 md:px-6"
        >
            <div 
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
            >
              <div 
              className="space-y-4"
              >
                <h1 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Diseño y calidad en muebles, vidriería y aluminio
                </h1>
                <p 
                className="text-muted-foreground md:text-xl"
                >
                  Creamos espacios únicos con materiales de primera calidad. Diseños minimalistas que transforman
                  cualquier ambiente.
                </p>
                <div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Button 
                  asChild
                  >
                    <a 
                    href="#productos"
                    >
                      Ver productos 
                      <ArrowRight 
                      className="ml-2 h-4 w-4" 
                      />
                    </a>
                  </Button>
                  <Button 
                  variant="outline" 
                  asChild
                  >
                    <a 
                    href={contact[0].url}
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                        Solicitar presupuesto
                    </a>
                  </Button>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=800"
                alt="Diseño minimalista de interiores"
                width={800}
                height={550}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
    )
}