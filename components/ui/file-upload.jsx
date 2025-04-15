import { File, Upload, X } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUploader({ value, onValuesChange }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onValuesChange(acceptedFiles[0]);
      }
    },
    [onValuesChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxSize: 10 * 1024 * 1024,
  });

  const handleRemove = () => {
    onValuesChange(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition hover:border-gray-400 text-center"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col gap-2 items-center">
          <Upload size={20} className="text-gray-500" />
          <span className="font-medium text-gray-700">
            <span className="font-semibold">Click</span> or drag file to upload
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Supported: PDF, JPG, PNG (max 10MB)
        </p>
      </div>

      {value && (
        <div className="flex items-center justify-between px-4 py-2 border rounded bg-muted">
          <div className="flex items-center gap-2">
            <File size={18} className="text-muted-foreground" />
            <span className="text-sm truncate max-w-[200px]">
              {typeof value === "string" ? value.split("/").pop() : value.name}
            </span>
          </div>
          <button
            onClick={handleRemove}
            type="button"
            className="text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
