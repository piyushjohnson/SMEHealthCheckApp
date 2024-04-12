import {
  DropEvent,
  DropzoneInputProps,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import { fileListToArray, getFileType } from "./utils";
import { MdiFileUploadOutline } from "./UploadDocumentForm";
import clsx from "clsx";
import { RefCallback } from "react";
import {
  ControllerRenderProps,
  FieldPath,
  FieldValue,
  FieldValues,
} from "react-hook-form";

export type OnDropFn = <T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent
) => void;

type DropboxProps = React.PropsWithChildren<{
  onDrop: OnDropFn | undefined;
  totalItems: number;
  disabled: boolean;
  title: string;
  description: string;
  acceptedFileTypes: (
    | "images"
    | "documents"
    | "videos"
    | "audios"
    | "others"
  )[];
  acceptedMimeTypes?: string[];
  customError: { message: string };
  inputElProps?: DropzoneInputProps & {onFieldChange?: (...values: any) => void};
  setInputRef?: RefCallback<HTMLInputElement>;
}>;

function Dropbox({
  onDrop,
  children,
  totalItems,
  disabled,
  title,
  description,
  acceptedFileTypes,
  acceptedMimeTypes,
  customError,
  inputElProps,
  setInputRef,
}: DropboxProps) {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isFocused,
    isDragReject,
    acceptedFiles,
    fileRejections,
    inputRef,
  } = useDropzone({
    accept: {
      "image/tiff": [".tiff"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
      "image/bmp": [".bmp"],
      "image/svg": [".svg"],
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "video/mp4": [".mp4"],
      "video/avi": [".avi"],
      "video/webm": [".webm"],
      "video/ogg": [".ogg"],
      "video/mpg": [".mpg", ".mpeg"],
      "audio/mp3": [".mp3"],
      "audio/wav": [".wav"],
      "audio/ogg": [".ogg"],
      "audio/aac": [".aac"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv", ".txt"],
    },
    disabled,
    maxSize: 250000000, // 250 Mb
    onDrop: (acceptedFiles, fileRejections, event) => {
      onDrop?.(acceptedFiles, fileRejections, event);
      if (inputRef.current) {
        let list = new DataTransfer();
        let existingFiles = [];
        const fileList = inputRef.current.files;
        if (fileList) {
          const length = fileList.length;
          let i = 0;
          while (i < length) {
            const file = fileList.item(i);
            if (file) existingFiles[i++] = file;
          }
        }
        acceptedFiles
          .concat([...existingFiles])
          .forEach((file) => list.items.add(file));

        let updatedFileList = list.files;
        inputRef.current.files = updatedFileList;
        inputRef.current.dispatchEvent(
          new Event("change", { bubbles: true, cancelable: true })
        );
      }
    },
    validator: (file) => {
      const isValid =
        acceptedFileTypes.includes(getFileType({ mimeType: file.type })) &&
        (acceptedMimeTypes?.includes(file.type) ?? true);
      if (!isValid) {
        return {
          code: "file-type-invalid",
          message: `File should only be ${acceptedFileTypes.join(",")}`,
        };
      }
      return null;
    },
  });
  const fileRejectionItems = fileRejections.map(({ file, errors }: any) => {
    return (
      <p
        className="line-clamp-1 rounded bg-gray-300 p-0.5 text-xs text-white"
        key={file.path}
      >
        {file.path}
      </p>
    );
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={clsx(
          "mt-2 overflow-x-scroll rounded border border-dashed border-gray-500/25 bg-gray-50/50 px-2 py-2",
          isFocused && "border-2 border-black",
          isDragReject && "border-2 border-red-500",
          isDragAccept && "border-2 border-green-500"
        )}
      >
        <div
          className={clsx(
            "flex cursor-pointer flex-row items-center justify-center gap-1",
            totalItems <= 0 ? "block" : "hidden"
          )}
        >
          <MdiFileUploadOutline className="h-8 w-8 hover:skew-y-12 text-purple-500" />

          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-xs font-light">{description}</p>
          </div>
        </div>
        <input
          {...getInputProps(inputElProps)}
          onChange={(e) => {
            const files = fileListToArray(e.target.files);
            inputElProps?.onFieldChange?.(files)
          }}
          ref={(el) => {
            setInputRef?.(el);
            if (inputRef.current === null) {
              // @ts-ignore
              inputRef.current = el;
            }
          }}
        />
        <div className={clsx(totalItems === 0 ? "hidden" : "block")}>
          {children}
        </div>
        {fileRejections && fileRejections.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-sm font-semibold text-red-500">
              Unsupported file uploaded
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-1">
              {fileRejectionItems}
            </div>
          </div>
        )}
        {customError.message !== "" && (
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-sm font-semibold text-red-500">
              {customError.message}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Dropbox;
