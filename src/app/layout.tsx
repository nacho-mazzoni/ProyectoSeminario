import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import App from "./App";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const products = [
  { nombre: "1 kg de Helado Rumba Habana", descripcion: "un kg de helado artesanal Rumba Habana, hasta 4 sabores a eleccion", precio: 10000, imagen: "/helado1kg.jpg", tipo: "Pote", puedeElegirGustos: true, maxGustos: 4},
  { nombre: "3/4 kg de Helado Rumba Habana", descripcion: " tres cuartos de kg de helado artesanal Rumba Habana, hasta 4 sabores a eleccion", precio: 8000, imagen: "/helado750g.jpg", tipo: "Pote", puedeElegirGustos: true, maxGustos: 4},
  { nombre: "1/2 kg de Helado Rumba Habana", descripcion: "medio kg de helado artesanal Rumba Habana, hasta 3 sabores a eleccion", precio: 6000, imagen: "/helado500g.jpg",  tipo: "Pote", puedeElegirGustos: true, maxGustos: 3},
  { nombre: "1/4 kg de Helado Rumba Habana", descripcion: "un cuarto de kg de helado artesanal Rumba Habana, hasta 3 sabores a eleccion", precio: 4000, imagen: "/helado250g.jpg", tipo: "Pote", puedeElegirGustos: true, maxGustos: 3},
  {nombre: "Tableta Dulce de Leche", descripcion: "Tableta de helado con obleas", precio: 5000, imagen:"/tableta.jpg", tipo: "tabletas", puedeElegirGustos: false, maxGustos: 0},
  {nombre: "Paleta de Limon", descripcion: "Tableta de helado con obleas", precio: 5000, imagen:"/tableta.jpg", tipo: "paletas", puedeElegirGustos: false, maxGustos: 0},
  {nombre: "Paleta de Frutilla", descripcion: "Tableta de helado con obleas", precio: 5000, imagen:"/tableta.jpg", tipo: "paletas", puedeElegirGustos: false, maxGustos: 0},
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <title>Heladería Rumba Habana - San Vicente</title>
        <meta name="description" content="Heladería artesanal Rumba Habana - Los mejores helados de San Vicente" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-black text-black min-h-screen flex flex-col`}>
          <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-center py-6 shadow-lg">
            <h1 className="text-2xl">🍦 Heladería Rumba Habana - San Vicente 🍦</h1>
            <p className="text-sm mt-1 opacity-90">Helados artesanales de la mejor calidad</p>
          </header>
          
          <div className="flex-1">
            <App productos={products}>
              {children}
            </App>
          </div>
          
          <footer className="bg-gray-800 text-white text-center py-4 text-sm">
            <p>© 2025 Heladería Rumba Habana. Todos los derechos reservados.</p>
          </footer>
        </body>
    </html>
  );
}
