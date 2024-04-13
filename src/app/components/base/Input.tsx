import {
  DetailedHTMLProps,
  ForwardedRef,
  InputHTMLAttributes,
  Ref,
  forwardRef,
} from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type InputProps = {
  label: string;
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
};

function Input(
  {
    label,
    error,
    ...inputProps
  }: InputProps &
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) {
  let errorMessage = "";
  if (error) {
    if (typeof error === "object") {
      if (error.message) {
        errorMessage = error.message as string;
      }
    } else {
    errorMessage = error as string;
    }
  }

  return (
    <div>
      <div className="relative">
        <input
          ref={ref}
          id="hs-floating-input-email"
          className="peer py-3 px-4 pr-7 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-purple-500 invalid:border-red-500 focus:ring-purple-500 invalid:ring-red-500 disabled:opacity-50 disabled:pointer-events-none 
  focus:pt-6
  focus:pb-2
  [&:not(:placeholder-shown)]:pt-6
  [&:not(:placeholder-shown)]:pb-2
  autofill:pt-6
  autofill:pb-2"
          {...inputProps}
        />
        {error && (
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
            <svg
              className="flex-shrink-0 size-4 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
          </div>
        )}
        <label
          htmlFor="hs-floating-input-email"
          className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
    peer-focus:text-xs
    peer-focus:-translate-y-1.5
    peer-focus:text-gray-500
    peer-[:not(:placeholder-shown)]:text-xs
    peer-[:not(:placeholder-shown)]:-translate-y-1.5
    peer-[:not(:placeholder-shown)]:text-gray-500"
        >
          {label}
        </label>
      </div>
      {error && <p className="text-xs text-red-600 mt-2">{errorMessage}</p>}
    </div>
  );
}

export default forwardRef(Input);
