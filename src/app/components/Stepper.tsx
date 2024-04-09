"use client";
import HSStepper from "@preline/stepper";
import { useEffect, useRef } from "react";

function Stepper() {
  const stepperElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (stepperElRef.current) {
      new HSStepper(stepperElRef.current);
    }
  }, []);

  return (
    <div data-hs-stepper="" ref={stepperElRef}>
      <ul className="relative flex flex-col md:flex-row gap-2">
        <li
          className=" md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block"
          data-hs-stepper-nav-item='{
      "index": 1
    }'
        >
          <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle ">
            <span className="hs-stepper-active:bg-purple-600 hs-stepper-active:text-white hs-stepper-success:bg-purple-600 hs-stepper-success:text-white size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full">
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">1</span>
              <svg
                className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden "></div>
          </div>
          <div className="grow md:grow-0 md:mt-3 pb-5">
            <span className="block text-sm font-medium text-gray-800">
              Company Information
            </span>
            <p className="text-sm text-gray-500">This is a description text.</p>
          </div>
        </li>

        <li
          className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block"
          data-hs-stepper-nav-item='{
      "index": 2
    }'
        >
          <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
            <span className="hs-stepper-active:bg-purple-600 hs-stepper-active:text-white hs-stepper-success:bg-purple-600 hs-stepper-success:text-white size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full">
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">2</span>
              <svg
                className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden "></div>
          </div>
          <div className="grow md:grow-0 md:mt-3 pb-5">
            <span className="block text-sm font-medium text-gray-800">
              Applicant Infomation
            </span>
            <p className="text-sm text-gray-500">This is a description text.</p>
          </div>
        </li>

        <li
          className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block"
          data-hs-stepper-nav-item='{
        "index": 3
      }'
        >
          <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
            <span className="hs-stepper-active:bg-purple-600 hs-stepper-active:text-white hs-stepper-success:bg-purple-600 hs-stepper-success:text-white size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full">
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">3</span>
              <svg
                className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden "></div>
          </div>
          <div className="grow md:grow-0 md:mt-3 pb-5">
            <span className="block text-sm font-medium text-gray-800">
              Upload Document
            </span>
            <p className="text-sm text-gray-500">This is a description text.</p>
          </div>
        </li>

        <li
          className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block"
          data-hs-stepper-nav-item='{ "index": 4
}'
        >
          <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
            <span className="hs-stepper-active:bg-purple-600 hs-stepper-active:text-white hs-stepper-success:bg-purple-600 hs-stepper-success:text-white size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full">
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">4</span>
              <svg
                className="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden "></div>
          </div>
          <div className="grow md:grow-0 md:mt-3 pb-5">
            <span className="block text-sm font-medium text-gray-800">
              Terms & Conditions
            </span>
            <p className="text-sm text-gray-500">This is a description text.</p>
          </div>
        </li>
      </ul>

      <div className="mt-5 sm:mt-8">
        <div
          data-hs-stepper-content-item='{
      "index": 1
    }'
        >
          <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
            <h3 className="text-gray-500">First content</h3>
          </div>
        </div>

        <div
          data-hs-stepper-content-item='{
      "index": 2
    }'
          style={{ display: "none" }}
        >
          <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
            <h3 className="text-gray-500">Second content</h3>
          </div>
        </div>

        <div
          data-hs-stepper-content-item='{
      "index": 3
    }'
          style={{ display: "none" }}
        >
          <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
            <h3 className="text-gray-500">Third content</h3>
          </div>
        </div>

        <div
          data-hs-stepper-content-item='{
      "index": 4
    }'
          style={{ display: "none" }}
        >
          <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
            <h3 className="text-gray-500">Fourth content</h3>
          </div>
        </div>
        <div
          data-hs-stepper-content-item='{
      "isFinal": true
    }'
          style={{ display: "none" }}
        >
          <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
            <h3 className="text-gray-500">Final content</h3>
          </div>
        </div>

        <div className="mt-5 flex justify-between items-center gap-x-2">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-stepper-back-btn=""
          >
            <svg
              className="flex-shrink-0 size-4"
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
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            Back
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-stepper-next-btn=""
          >
            Next
            <svg
              className="flex-shrink-0 size-4"
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
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-stepper-finish-btn=""
            style={{ display: "none" }}
          >
            Finish
          </button>
          <button
            type="reset"
            className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-stepper-reset-btn=""
            style={{ display: "none" }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
