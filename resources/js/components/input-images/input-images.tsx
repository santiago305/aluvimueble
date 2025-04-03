import React, { useState } from "react";
import { Input } from "../ui/input";
import { filesUploaderProps } from "./InputImagesTyles";
import { Label } from "../ui/label";


const ImageUploader:React.FC<filesUploaderProps> = (
  { onFilesUpload, 
    multiple = false, 
    accept="image/webp" ,
    label = "Subir archivo"
  }) => {
  const [files, setFiles] = useState<File[]>([]); 
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    let files = Array.from(event.target.files);

    const allowedTypes = accept.split(",");
    files = files.filter((file) =>
      allowedTypes.some((type) => file.type.startsWith(type.trim()))
    );

    if (files.length === 0) {
      alert(`Solo se permiten archivos de tipo: ${accept}`);
      return;
    }
    setFiles(files);
    // Crear URLs temporales para la vista previa
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Aquí deberíamos enviar las URLs al componente padre para almacenarlas
    onFilesUpload(files, urls);
  };

  return (
    <div className="w-full max-w-md m-0">
      {/* Input de archivos */}
      <Label>
        {label}
      </Label>
      <Input
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
      />


      <div className="mt-4 grid grid-cols-3 gap-2">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            {files[index].type.startsWith("image/") ? (
              <img
                src={url}
                alt={`preview-${index}`}
                className="w-full h-20 object-cover rounded-lg shadow-md"
              />
            ) : (
              <video
                src={url}
                className="w-full h-20 object-cover rounded-lg shadow-md"
                controls
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
