import { useCallback, useState, type SVGProps } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import UploadFile, { GenericFile } from "../dropbox/UploadFile";
import { fileListToArray } from "../utils";
import { SME } from "../stepper/Stepper";

export function MdiFileUploadOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm4 18V9h-5V4H6v16zm-6-8l4 4h-2.5v3h-3v-3H8z"
      ></path>
    </svg>
  );
}

export function IcBaselineAddBox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4z"
      ></path>
    </svg>
  );
}

function UploadDocumentForm({
  register,
  errors,
  control,
}: {
  register: UseFormRegister<FieldValues & SME>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues & SME, any>;
}) {
  const [selectedFiles, setSelectedFiles] = useState<GenericFile[]>([]);

  let errorMessage = "";
  let error = errors["Documents"];
  if (error) {
    if (typeof error === "object") {
      if (error.message) {
        errorMessage = error.message as unknown as string;
      }
    } else {
      errorMessage = error as unknown as string;
    }
  }

  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Controller
          control={control}
          name="Documents"
          render={({ field: { onChange, name, ref } }) => {
            return (
              <>
                <UploadFile
                  selectedFiles={selectedFiles}
                  title="Upload documents here"
                  description="documents only"
                  setSelectedFiles={setSelectedFiles}
                  acceptedFileTypes={["documents"]}
                  acceptedMimeTypes={["application/pdf"]}
                  maxFiles={6}
                  inputElProps={{ onFieldChange: onChange, name }}
                  setInputRef={ref}
                />

                {error && (
                  <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
                )}
              </>
            );
          }}
        />
      </div>
      <ul
        className="marker:bg-purple-500 pl-5 space-y-2"
        style={{
          listStyleImage: "url(checkmark.svg)",
        }}
      >
        <li>
          PDFs (not scanned copies) of companys operating bank current
          account(s) statements for the past 6 months.
        </li>
        <li>
          Example: If today is 09 Apr 24, then please upload bank statements
          from Oct 23 to Mar 24 (both months inclusive)
        </li>
        <li>
          If your company is multi-banked, then please upload 6 months bank
          statements for each bank account
        </li>
        <li>
          If your file is password protected, we request you to remove the
          password and upload the file to avoid submission failure
        </li>
        <li>
          In case if you are facing any issue while uploading bank statements,
          Please contact us on support@credilinq.ai
        </li>
      </ul>
    </div>
  );
}

export default UploadDocumentForm;
