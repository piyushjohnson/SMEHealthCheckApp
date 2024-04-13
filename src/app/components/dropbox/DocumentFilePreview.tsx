import { type GenericFile } from "./UploadFile";
import { getFileTypeIconAsUrl } from "@fluentui/react-file-type-icons";

type DocumentFilePreviewProps = {
  documents: GenericFile[];
  size?: "small" | "medium" | "large" | "default";
  onClick?: (document: GenericFile, event: any) => void;
};

export function DocumentFilePreview({
  documents,
  onClick,
  size = "default",
}: DocumentFilePreviewProps) {
  return (
    <>
      {documents.map((document) => {
        let documentProps = {
          src: document.src,
          poster: "",
          name: document.file.name,
        };
        const fileNameArray = documentProps.name.split(".");
        let extension = ".txt";
        if (fileNameArray.length > 1)
          extension = `.${fileNameArray[fileNameArray.length - 1]}`;

        return (
          <button
            key={document.id}
            className={
              "relative max-h-min hover:bg-gray-50 min-w-[7rem] max-w-[8rem]"
            }
            onClick={(event) => {
              onClick?.(document, event);
            }}
          >
            <div className="flex h-full flex-col items-center justify-evenly rounded border border-gray-200 object-cover p-2">
              <img
                className="aspect-square w-12 p-0.5"
                src={getFileTypeIconAsUrl({
                  extension: extension,
                  size: 16,
                })}
                alt={`Selected ${document.id}`}
              />
              <p
                className="line-clamp-2 text-center text-sm"
                style={{ overflowWrap: "anywhere" }}
              >
                {documentProps.name}
              </p>
            </div>
          </button>
        );
      })}
    </>
  );
}
