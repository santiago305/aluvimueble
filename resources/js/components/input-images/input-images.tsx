import React, { useState } from "react";
import { Input } from "../ui/input";
import { ImageUploaderProps } from "./InputImagesTyles";

const ImageUploader:React.FC<ImageUploaderProps> = ({ onImagesUpload }) => {
  const [files, setFiles] = useState<File[]>([]); 
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files); // Convertir FileList a array de File
    setFiles(files);
    // Crear URLs temporales para la vista previa
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Aquí deberíamos enviar las URLs al componente padre para almacenarlas
    onImagesUpload(files, urls);
  };

  return (
    <div className="w-full max-w-md">
      {/* Input de archivos */}
      <Input
        type="file"
        multiple
        accept="image/webp"
        onChange={handleFileChange}
      />


      <div className="mt-4 grid grid-cols-3 gap-2">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            <img
              key={files.length}
              src={url}
              alt={`preview-${index}`}
              className="w-full h-20 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
