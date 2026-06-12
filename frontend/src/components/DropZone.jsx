import { useDropzone } from "react-dropzone";

function DropZone({ onFileSelect }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles) => {
      onFileSelect(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2
        border-dashed
        rounded-2xl
        p-10
        text-center
        cursor-pointer
        transition-all

        ${
          isDragActive
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-white/10 bg-white/5"
        }
      `}
    >
      <input {...getInputProps()} />

      <p className="text-white text-lg">
        {isDragActive ? "Drop file here" : "Drag & Drop files here"}
      </p>

      <p className="text-slate-400 mt-2">or click to browse</p>
    </div>
  );
}

export default DropZone;
