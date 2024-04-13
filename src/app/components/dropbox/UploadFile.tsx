import {
  Dispatch,
  RefCallback,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { DocumentFilePreview } from "./DocumentFilePreview";
import Dropbox, { type OnDropFn } from "./Dropbox";
import { getFileType, groupBy } from "../utils";
import { IcBaselineAddBox } from "../forms/UploadDocumentForm";
import { DropzoneInputProps } from "react-dropzone";

export type GenericFile = {
  id: string;
  src: string | ArrayBuffer | null | undefined;
  file: File;
  fileType: string;
};

type UploadFileProps = {
  selectedFiles: GenericFile[];
  setSelectedFiles: Dispatch<SetStateAction<GenericFile[]>>;
  title?: string;
  description?: string;
  disabled?: boolean;
  maxFiles?: number;
  acceptedFileTypes?: (
    | "images"
    | "documents"
    | "videos"
    | "audios"
    | "others"
  )[];
  acceptedMimeTypes?: string[];
  inputElProps?: DropzoneInputProps & {onFieldChange?: (...values: any) => void};
  setInputRef?: RefCallback<HTMLInputElement>;
};

function UploadFile({
  selectedFiles,
  setSelectedFiles,
  title = "Drag and drop to upload files here",
  description = "documents, images, videos, audios",
  disabled = false,
  maxFiles = 1,
  acceptedFileTypes = ["documents", "images", "videos", "audios"],
  acceptedMimeTypes,
  inputElProps,
  setInputRef,
}: UploadFileProps) {
  const [customError, setCustomError] = useState({ message: "" });

  const onDrop = useCallback<OnDropFn>(
    (acceptedFiles,fileRejections,event) => {
      const maxFileLimitExceeded =
        selectedFiles.length + acceptedFiles.length > maxFiles;
      if (maxFileLimitExceeded) {
        setCustomError({
          message: `Total file limit of ${maxFiles} files reached`,
        });
        return;
      }
      setCustomError({ message: "" });
      acceptedFiles.forEach((file) => {
        if (file instanceof File) {
          const id = uuidv4(); // Generate a unique ID
          const reader = new FileReader();
          reader.onload = function (e) {
            setSelectedFiles((prevState) => [
              ...prevState,
              {
                id,
                src: e.target?.result,
                file,
                fileType: getFileType({ mimeType: file.type }),
              },
            ]);
          };
          reader.readAsDataURL(file);
        }
      });
    },
    [setSelectedFiles]
  );

  const groudpedFilesByType = groupBy(selectedFiles, "fileType");
  const maxFileLimitReached = selectedFiles.length === maxFiles;
  return (
    <>
      <Dropbox
        onDrop={onDrop}
        totalItems={selectedFiles.length}
        disabled={disabled || maxFileLimitReached}
        title={title}
        description={description}
        customError={customError}
        inputElProps={inputElProps}
        setInputRef={setInputRef}
        acceptedFileTypes={acceptedFileTypes}
        acceptedMimeTypes={acceptedMimeTypes}
      >
        <aside className="flex w-full flex-row gap-1 overflow-x-auto pb-2">
          <div className="flex aspect-square h-28 min-w-min items-center justify-center rounded border border-gray-200  p-0.5">
            <IcBaselineAddBox />
          </div>
          {groudpedFilesByType.documents && (
            <DocumentFilePreview documents={groudpedFilesByType.documents} />
          )}
        </aside>
      </Dropbox>
    </>
  );
}

export default UploadFile;
