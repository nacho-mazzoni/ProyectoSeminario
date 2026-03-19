import { ProductoCarritoProps }  from "./product-card";
import { ProductoCarrito } from "./product-card";

type OnElegirGustosFunction = (maxGustos: number, indiceProducto: number) => void;

type carritoBoxProps = {
    productoCarrito: ProductoCarritoProps[];
    onElegirGustos: OnElegirGustosFunction;
    onIncrementarCantidad: (index: number) => void;
    onDecrementarCantidad: (index: number) => void;
    onEliminarProducto: (index: number) => void;
    onVaciarCarrito: () => void;
}

export function CarritoBox({ 
    productoCarrito, 
    onElegirGustos,
    onIncrementarCantidad,
    onDecrementarCantidad,
    onEliminarProducto,
    onVaciarCarrito // Agregamos el parámetro
}: carritoBoxProps) {
    
    // Calcular total del carrito
    const totalCarrito = productoCarrito.reduce((total, prod) => 
        total + (prod.precio * prod.cantidad), 0
    );

    // Calcular total de items
    const totalItems = productoCarrito.reduce((total, prod) => 
        total + prod.cantidad, 0
    );

    return (
        <div className="w-full bg-black shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Carrito de Compras {totalItems > 0 && `(${totalItems})`}
            </h2>
            
            {productoCarrito.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-400 text-lg mb-4">Tu carrito está vacío</p>
                    <p className="text-gray-500">¡Agrega algunos deliciosos helados!</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {productoCarrito.map((prod, idx) => (
                            <div key={idx} className="border border-gray-600 rounded-lg overflow-hidden">
                                <ProductoCarrito 
                                    nombre={prod.nombre}
                                    precio={prod.precio}
                                    cantidad={prod.cantidad}
                                    gustosSeleccionados={prod.gustosSeleccionados}
                                    onClick={prod.onClick}
                                    puedeElegirGustos={prod.puedeElegirGustos}
                                    maxGustos={prod.maxGustos}
                                    onIncrementar={() => onIncrementarCantidad(idx)}
                                    onDecrementar={() => onDecrementarCantidad(idx)}
                                    onEliminar={() => onEliminarProducto(idx)}
                                />    
                                
                                {prod.puedeElegirGustos && (
                                    <div className="px-4 pb-4 bg-gray-800">
                                        <button
                                            onClick={() => onElegirGustos(prod.maxGustos ?? 0, idx)}
                                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                                        >
                                            🍦 Elegir Gustos (máximo {prod.maxGustos})
                                        </button>
                                    </div>
                                )}   
                            </div>
                        ))}
                    </div>

                    {/* Resumen del carrito */}
                    <div className="border-t border-gray-600 pt-6 mt-6">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center text-gray-300">
                                <span>Total de productos:</span>
                                <span>{totalItems} items</span>
                            </div>
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span>Total a pagar:</span>
                                <span>${totalCarrito.toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors text-lg">
                            🛒 Proceder al Pago - ${totalCarrito.toLocaleString()}
                        </button>
                        
                        <button 
                            onClick={onVaciarCarrito}
                            className="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                        >
                            🗑️ Vaciar Carrito
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}