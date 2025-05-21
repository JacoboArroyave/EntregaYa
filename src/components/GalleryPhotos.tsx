import React, { useState } from "react";
import { Photo } from "../models/Photo";
import { useNavigate } from "react-router-dom";
import { LucideProps } from "lucide-react"; // Asegúrate de importar esto si usas íconos tipo Lucide

interface PhotoGalleryProps {
    photos: Photo[];
    title?: string;
    emptyMessage?: string;
    url?: string;
    acciones: { nombre: string; etiqueta: string; icon: React.ElementType<LucideProps> }[];
    onAccion: (accion: string, item: any) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
    photos,
    title = "Galería de Problemas",
    emptyMessage = "No hay imágenes registradas.",
    url,
    acciones,
    onAccion
}) => {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const navigate = useNavigate();

    return (
        <div className="rounded-2xl bg-white shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400"></div>

            <div className="px-8 py-5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl text-white tracking-wide flex items-center">{title}</h3>
                    {url && (
                        <button
                            onClick={() => navigate(url)}
                            className="ml-4 bg-white text-red-600 rounded-full p-2 shadow-md hover:bg-red-100 transition"
                            title="Agregar nuevo"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="p-6 bg-gradient-to-b from-orange-50/80 to-white">
                {photos.length === 0 ? (
                    <div className="text-center py-10 text-amber-700">
                        <p className="text-base font-medium">{emptyMessage}</p>
                        <p className="text-sm text-amber-600 mt-1">Agrega imágenes para comenzar</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {photos.map((photo) => (
                            <div
                                key={photo.id}
                                className="rounded-xl overflow-hidden bg-white shadow-sm border border-amber-100 group relative hover:shadow-lg transition-shadow"
                            >
                                <div onClick={() => setSelectedPhoto(photo)} className="cursor-pointer">
                                    <img
                                        src={`http://127.0.0.1:5000/uploads/${photo.image_url.split('\\').pop()}`}
                                        alt={photo.caption}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-amber-800 font-semibold text-base">{photo.caption}</h4>
                                    <p className="text-sm text-gray-600 mt-1">Problema ID: {photo.issue_id}</p>
                                </div>
                                {/* Acciones centradas y estilizadas */}
                                <div className="flex justify-center gap-4 border-t border-amber-100 px-4 py-3 bg-white mt-2">
                                    {acciones.map((accion) => (
                                        <button
                                            key={accion.nombre}
                                            onClick={() => onAccion(accion.nombre, photo)}
                                            title={accion.etiqueta}
                                            className={`text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all duration-200 transform hover:scale-110 active:scale-95
                                                ${accion.nombre.toLowerCase().includes('delete') || accion.nombre.toLowerCase().includes('eliminar')
                                                    ? 'bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700'
                                                    : accion.nombre.toLowerCase().includes('edit') || accion.nombre.toLowerCase().includes('editar')
                                                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700'
                                                        : accion.nombre.toLowerCase().includes('view') || accion.nombre.toLowerCase().includes('ver')
                                                            ? 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
                                                            : 'bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 to-orange-700'
                                                }`}
                                        >
                                            <accion.icon size={16} className="drop-shadow-sm" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedPhoto && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setSelectedPhoto(null)}>
                    <div
                        className="bg-white rounded-2xl shadow-xl p-4 max-w-3xl w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors text-xl"
                        >
                            ✕
                        </button>
                        <img
                            src={`http://127.0.0.1:5000/uploads/${selectedPhoto.image_url.split('\\').pop()}`}
                            alt={selectedPhoto.caption}
                            className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                        />
                        <div className="mt-4">
                            <h4 className="text-xl font-semibold text-amber-800">{selectedPhoto.caption}</h4>
                            <p className="text-sm text-gray-600">Problema ID: {selectedPhoto.issue_id}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;
