import React, { useState } from "react";
import { Photo } from "../models/Photo";

interface PhotoGalleryProps {
    photos: Photo[];
    title?: string;
    emptyMessage?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
    photos,
    title = "Galería de Problemas",
    emptyMessage = "No hay imágenes registradas.",
}) => {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    return (
        <div className="rounded-2xl bg-white shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400"></div>

            <div className="px-8 py-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 rounded-t-2xl">
                <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {title}
                </h3>
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
                                className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow border border-amber-100"
                            >
                                <div
                                    className="relative group cursor-pointer"
                                    onClick={() => setSelectedPhoto(photo)}
                                >
                                    <img
                                        src={`http://127.0.0.1:5000/uploads/${photo.image_url.split('\\').pop()}`}
                                        alt={photo.caption}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-amber-800 font-semibold text-base">{photo.caption}</h4>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">Problema id:{photo.issue_id}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedPhoto && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setSelectedPhoto(null)}>
                    <div className="bg-white rounded-2xl shadow-xl p-4 max-w-3xl w-full relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
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
