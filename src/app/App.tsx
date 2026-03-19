"use client";
import {useState} from "react";
import { ProductBox } from "./components/product-card";
import { CarritoBox } from "./components/carrito";
import type { Product, ProductoCarritoProps } from "./components/product-card";
import { ModalGustos, type Gusto } from "./components/gustos-card";

const listaGustos: Gusto[] = [
    {nombre: "Chocolate", disponible: true},
    {nombre: "Vainilla", disponible: true},
    {nombre: "Dulce de Leche", disponible: true},
    {nombre: "Frutilla", disponible: true},
    {nombre: "Cookies & Cream", disponible: true},
    {nombre: "Menta Granizada", disponible: true},
    {nombre: "Pistacho", disponible: false}, // Ejemplo de gusto no disponible
    {nombre: "Limón", disponible: true},
    {nombre: "Chocolate Amargo", disponible: true},
    {nombre: "Crema Americana", disponible: true},
    {nombre: "Café", disponible: true},
    {nombre: "Coco", disponible: false}, // Ejemplo de gusto no disponible
];

export default function App({ productos, children}: { productos: Product[], children: React.ReactNode}){
    const [carrito, setCarrito] = useState<ProductoCarritoProps[]>([]);
    const [mostrarModalGustos, setMostrarModalGustos] = useState<{
        visible: boolean, 
        maxGustos: number,
        nombreProducto: string,
        indiceProducto: number
    }>({
        visible: false, 
        maxGustos: 0,
        nombreProducto: "",
        indiceProducto: -1
    });

    // Función para agregar producto al carrito con cantidad inicial 1
    function agregarAlCarrito(producto: Product){
        setCarrito(carritoActual => {
            // Verificar si el producto ya existe en el carrito
            const indiceExistente = carritoActual.findIndex(item => item.nombre === producto.nombre);
            
            if (indiceExistente >= 0) {
                // Si ya existe, incrementar cantidad en 1
                const nuevoCarrito = [...carritoActual];
                nuevoCarrito[indiceExistente] = {
                    ...nuevoCarrito[indiceExistente],
                    cantidad: nuevoCarrito[indiceExistente].cantidad + 1
                };
                return nuevoCarrito;
            } else {
                // Si no existe, agregarlo con cantidad 1
                return [...carritoActual, { 
                    nombre: producto.nombre,
                    precio: producto.precio,
                    puedeElegirGustos: producto.puedeElegirGustos,
                    maxGustos: producto.maxGustos,
                    cantidad: 1 // Siempre inicia con cantidad 1
                }];
            }
        });
    }

    // Función para incrementar cantidad de un producto en el carrito
    function incrementarCantidad(index: number) {
        setCarrito(carritoActual => {
            const nuevoCarrito = [...carritoActual];
            nuevoCarrito[index] = {
                ...nuevoCarrito[index],
                cantidad: nuevoCarrito[index].cantidad + 1
            };
            return nuevoCarrito;
        });
    }

    // Función para decrementar cantidad de un producto en el carrito
    function decrementarCantidad(index: number) {
        setCarrito(carritoActual => {
            const nuevoCarrito = [...carritoActual];
            const cantidadActual = nuevoCarrito[index].cantidad;
            
            if (cantidadActual > 1) {
                nuevoCarrito[index] = {
                    ...nuevoCarrito[index],
                    cantidad: cantidadActual - 1
                };
                return nuevoCarrito;
            }
            
            // Si la cantidad es 1, eliminar el producto del carrito
            return carritoActual.filter((_, idx) => idx !== index);
        });
    }

    // Función para eliminar un producto completamente del carrito
    function eliminarProducto(index: number) {
        setCarrito(carritoActual => 
            carritoActual.filter((_, idx) => idx !== index)
        );
    }

    // Función para vaciar completamente el carrito con confirmación
    function vaciarCarrito() {
        if (carrito.length > 0) {
            const confirmacion = window.confirm('¿Estás seguro de que quieres vaciar todo el carrito?');
            if (confirmacion) {
                setCarrito([]);
            }
        }
    }

    // Función para abrir modal de gustos
    function handleElegirGustos(maxGustos: number = 0, indiceProducto: number = -1){
        const producto = carrito[indiceProducto];
        if (producto) {
            setMostrarModalGustos({
                visible: true, 
                maxGustos,
                nombreProducto: producto.nombre,
                indiceProducto
            });
        }
    }

    // Función para cerrar modal de gustos
    function cerrarModalGustos(){
        setMostrarModalGustos({
            visible: false, 
            maxGustos: 0,
            nombreProducto: "",
            indiceProducto: -1
        });
    }

    // Función para confirmar gustos seleccionados
    function confirmarGustos(gustosSeleccionados: string[]) {
        const { indiceProducto } = mostrarModalGustos;
        
        if (indiceProducto >= 0 && indiceProducto < carrito.length) {
            setCarrito(carritoActual => {
                const nuevoCarrito = [...carritoActual];
                // Agregar los gustos al producto (puedes expandir el tipo si necesitas guardar esto)
                nuevoCarrito[indiceProducto] = {
                    ...nuevoCarrito[indiceProducto],
                    gustosSeleccionados // Agregar esta propiedad si actualizas el tipo
                };
                return nuevoCarrito;
            });
        }
        
        // Mostrar los gustos seleccionados (temporal - puedes cambiar esto)
        alert(`Gustos elegidos: ${gustosSeleccionados.join(', ')}`);
        cerrarModalGustos();
    }

    // Calcular total de items en el carrito para mostrar en el header
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

    return(
        <main className="flex w-full min-h-screen">
            <div className="flex flex-col justify-start items-center w-1/2 bg-black shadow-lg p-8">
                <ProductBox
                    productos={productos.map(prod => ({
                        ...prod,
                        onAdd: () => agregarAlCarrito(prod)
                    }))}
                />
            </div>
            <div className="flex flex-col justify-start items-center w-1/2 bg-black shadow-lg p-8">
                <CarritoBox 
                    productoCarrito={carrito} 
                    onElegirGustos={handleElegirGustos}
                    onIncrementarCantidad={incrementarCantidad}
                    onDecrementarCantidad={decrementarCantidad}
                    onEliminarProducto={eliminarProducto}
                    onVaciarCarrito={vaciarCarrito}
                />
                
                {/* Modal para elegir gustos */}
                <ModalGustos
                    isOpen={mostrarModalGustos.visible}
                    onClose={cerrarModalGustos}
                    onConfirm={confirmarGustos}
                    gustosDisponibles={listaGustos}
                    maxGustos={mostrarModalGustos.maxGustos}
                    nombreProducto={mostrarModalGustos.nombreProducto}
                />
            </div>
            {/* Removemos {children} ya que no lo necesitamos aquí */}
        </main>
    );
}