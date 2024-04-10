import Uploady from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";
import { asUploadButton } from "@rpldy/upload-button";
import { forwardRef } from "react";
import type { SVGProps } from "react";

const UploadButton = asUploadButton(
  forwardRef<HTMLAnchorElement, React.PropsWithChildren<{ text: string }>>(
    function UploadLink(props, ref) {
      console.log(props);
      return (
        <a {...props} className="cursor-pointer underline" ref={ref}>
          {props.children}
        </a>
      );
    }
  )
);

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

function UploadDocumentForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full h-full flex flex-row gap-4"
    >
      <Uploady>
        <UploadDropZone
          className="w-full h-fit min-h-44 border-2 border-gray-300 bg-gray-100 rounded flex-col flex-1 flex items-center justify-center"
          onDragOverClassName="bg-gray-500"
          shouldHandleDrag
          grouped
          dropHandler={(e, getFiles) => {
            const fileList = getFiles();
            console.log(fileList);
            return fileList;
          }}
          maxGroupSize={3}
        >
          <div className="rounded-full p-2 bg-purple-300">
            <MdiFileUploadOutline
              width="2em"
              height="2em"
              className="text-purple-600"
            />
          </div>
          <div>
            <UploadButton text={"Click to Upload"} />
            <span> </span>
            <span>or drag and drop bank statements</span>
          </div>
        </UploadDropZone>
      </Uploady>
      <ul
        className="flex-1 marker:bg-purple-500 pl-5 space-y-2"
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
    </form>
  );
}

export default UploadDocumentForm;
