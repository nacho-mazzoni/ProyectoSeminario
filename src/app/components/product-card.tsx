"use client";
import next from "next";
import {useState} from 'react';
import Image from "next/image";
import { AgregarACarritoButton } from "./buttons";

export type Product = {
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    tipo: string;
    puedeElegirGustos?: boolean;
    maxGustos?: number;
    onAdd?: ()=> void;
    onClick?: ()=> void;
};

type ProductCardProps = Pick<Product, "nombre" | "descripcion" | "imagen" | "precio" | "onAdd">;

export function ProductCard({ nombre, descripcion, precio, imagen, onAdd }: ProductCardProps) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <Image
                src={imagen}
                alt={nombre}
                width={400}
                height={300}
                className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-bold mb-2">{nombre}</h2>
            <p className="text-white-700 font-semibold mb-4">{descripcion}</p>
            <p className="text-white font-semibold">${precio.toFixed(2)}</p>
            <AgregarACarritoButton text="Agregar al Carrito" onClick={onAdd!} />
        </div>
    );
}

type ProductBox = Pick<Product, "nombre" | "descripcion" | "imagen" | "onAdd" | "tipo" | "precio">;

type ProductBoxProps = {
    productos: ProductBox[];
}

export function ProductBox({ productos }: ProductBoxProps) {
    const [tipoSeleccionado, setTipoSeleccionado] = useState<string | null>(null);
    
    const productosPorTipo = productos.reduce<Record<string, ProductBox[]>>(
        (acc, prod) => {
            if (!acc[prod.tipo]) acc[prod.tipo] = [];
            acc[prod.tipo].push(prod);
            return acc;
        },
        {}
    );

    const tiposDisponibles = Object.keys(productosPorTipo);
    const productosAMostrar = tipoSeleccionado ? productosPorTipo[tipoSeleccionado] : [];

    return (
        <div className="justify-center items-center bg-black shadow-lg p-8 text-white overflow-y-auto">
            {/* Estado inicial: Mostrar tipos grandes para seleccionar */}
            {!tipoSeleccionado && (
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-bold mb-8">Selecciona una categoría</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tiposDisponibles.map((tipo) => (
                            <button
                                key={tipo}
                                onClick={() => setTipoSeleccionado(tipo)}
                                className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-8 text-center border border-gray-600 hover:border-gray-400"
                            >
                                <h3 className="text-2xl font-semibold mb-2">{tipo}</h3>
                                <p className="text-gray-300">
                                    {productosPorTipo[tipo].length} productos disponibles
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Estado filtrado: Mostrar barra pequeña arriba y productos */}
            {tipoSeleccionado && (
                <>
                    {/* Barra de filtros pequeña */}
                    <div className="mb-6 flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => setTipoSeleccionado(null)}
                            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg transition-colors"
                        >
                            ← Volver a categorías
                        </button>
                        
                        <div className="flex flex-wrap gap-2">
                            {tiposDisponibles.map((tipo) => (
                                <button
                                    key={tipo}
                                    onClick={() => setTipoSeleccionado(tipo)}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        tipo === tipoSeleccionado
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                    }`}
                                >
                                    {tipo}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Productos filtrados */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productosAMostrar.map((prod, idx) => (
                            <ProductCard
                                key={idx}
                                nombre={prod.nombre}
                                descripcion={prod.descripcion}
                                precio={prod.precio}
                                imagen={prod.imagen}
                                onAdd={prod.onAdd}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
    
// Tipo para productos en el carrito (CON cantidad)
export type ProductoCarritoProps = Pick<Product, "nombre" | "precio" | "onClick" | "puedeElegirGustos" | "maxGustos"> & {
    cantidad: number;
    gustosSeleccionados?: string[]; // Opcional: para guardar los gustos elegidos
};

// Tipo para las acciones del carrito
export type ProductoCarritoActions = {
    onIncrementar: () => void;
    onDecrementar: () => void;
    onEliminar: () => void;
};

// Componente ProductoCarrito actualizado
export function ProductoCarrito({ 
    nombre, 
    precio, 
    cantidad,
    onIncrementar,
    onDecrementar,
    onEliminar
}: ProductoCarritoProps & ProductoCarritoActions) {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-800">
            <div className="flex-1">
                <span className="font-medium text-white">{nombre}</span>
                <p className="text-sm text-gray-300">${precio.toLocaleString()} c/u</p>
            </div>
            
            {/* Controles de cantidad */}
            <div className="flex items-center gap-3 mx-4">
                <button 
                    onClick={onDecrementar}
                    className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
                    disabled={cantidad <= 1}
                >
                    -
                </button>
                
                <span className="text-white font-semibold w-8 text-center bg-gray-700 py-1 rounded">
                    {cantidad}
                </span>
                
                <button 
                    onClick={onIncrementar}
                    className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
                >
                    +
                </button>
            </div>

            {/* Precio total y botón eliminar */}
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-white font-semibold">
                        ${(precio * cantidad).toLocaleString()}
                    </p>
                </div>
                <button
                    onClick={onEliminar}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                    ❌
                </button>
            </div>
        </div>
    );
}