"use client";
import { useState } from 'react';

export type Gusto = {
    nombre: string;
    disponible?: boolean;
};

type ModalGustosProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (gustosSeleccionados: string[]) => void;
    gustosDisponibles: Gusto[];
    maxGustos: number;
    nombreProducto?: string;
};

export function ModalGustos({ 
    isOpen, 
    onClose, 
    onConfirm, 
    gustosDisponibles, 
    maxGustos, 
    nombreProducto 
}: ModalGustosProps) {
    const [gustosSeleccionados, setGustosSeleccionados] = useState<string[]>([]);

    if (!isOpen) return null;

    const toggleGusto = (nombreGusto: string) => {
        setGustosSeleccionados(prev => {
            if (prev.includes(nombreGusto)) {
                // Si ya está seleccionado, lo removemos
                return prev.filter(g => g !== nombreGusto);
            } else if (prev.length < maxGustos) {
                // Si no está seleccionado y no hemos llegado al máximo, lo agregamos
                return [...prev, nombreGusto];
            }
            // Si ya llegamos al máximo, no agregamos nada
            return prev;
        });
    };

    const handleConfirmar = () => {
        if (gustosSeleccionados.length > 0) {
            onConfirm(gustosSeleccionados);
            setGustosSeleccionados([]); // Limpiar selección
            onClose();
        }
    };

    const handleCerrar = () => {
        setGustosSeleccionados([]); // Limpiar selección al cerrar
        onClose();
    };

    const gustosFaltantes = maxGustos - gustosSeleccionados.length;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        🍦 Elegí tus gustos
                    </h2>
                    {nombreProducto && (
                        <p className="text-gray-600 text-sm mb-2">
                            Para: {nombreProducto}
                        </p>
                    )}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-800 font-medium">
                            Seleccionados: {gustosSeleccionados.length} / {maxGustos}
                        </p>
                        {gustosFaltantes > 0 && (
                            <p className="text-blue-600 text-sm">
                                Podés elegir {gustosFaltantes} gusto{gustosFaltantes > 1 ? 's' : ''} más
                            </p>
                        )}
                    </div>
                </div>

                {/* Lista de gustos */}
                <div className="mb-6">
                    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                        {gustosDisponibles.map((gusto, index) => {
                            const isSelected = gustosSeleccionados.includes(gusto.nombre);
                            const isDisabled = !isSelected && gustosSeleccionados.length >= maxGustos;
                            const isAvailable = gusto.disponible !== false;

                            return (
                                <button
                                    key={index}
                                    onClick={() => isAvailable && !isDisabled ? toggleGusto(gusto.nombre) : null}
                                    disabled={!isAvailable || isDisabled}
                                    className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                                        !isAvailable
                                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                            : isSelected
                                            ? 'bg-blue-500 border-blue-500 text-white shadow-md transform scale-105'
                                            : isDisabled
                                            ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{gusto.nombre}</span>
                                        <div className="flex items-center">
                                            {!isAvailable && (
                                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded mr-2">
                                                    No disponible
                                                </span>
                                            )}
                                            {isSelected && (
                                                <span className="text-xl">✓</span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Gustos seleccionados */}
                {gustosSeleccionados.length > 0 && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-3">
                        <h3 className="font-medium text-green-800 mb-2">Gustos elegidos:</h3>
                        <div className="flex flex-wrap gap-2">
                            {gustosSeleccionados.map((gusto, index) => (
                                <span 
                                    key={index}
                                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {gusto}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Botones */}
                <div className="flex gap-3">
                    <button
                        onClick={handleCerrar}
                        className="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirmar}
                        disabled={gustosSeleccionados.length === 0}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                            gustosSeleccionados.length > 0
                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Confirmar ({gustosSeleccionados.length})
                    </button>
                </div>

                {/* Ayuda */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                        💡 Tocá los gustos para seleccionarlos o deseleccionarlos
                    </p>
                </div>
            </div>
        </div>
    );
}