"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import HSStepper from "@preline/stepper";
import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createSME } from "../actions";
import ApplicantInfoForm from "./ApplicantInfoForm";
import CompanyInfoForm from "./CompanyInfoForm";
import TermsConditionsForm from "./TermsConditionsForm";
import UploadDocumentForm from "./UploadDocumentForm";
import { useServerAction } from "../hooks/useServerAction";

const SMESchema = z.object({
  UEN: z
    .string({ required_error: "Provide valid UEN number" })
    .length(9, "UEN number should be of 9 chars")
    .regex(
      /\d{8}[A-za-z]{1}/i,
      "Provide valid format of 8 digits followed by a alphabet"
    ),
  CompanyName: z
    .string({ required_error: "Provide valid company name" })
    .min(2, "Provide company name wih atleast 2 chars"),
  FullName: z
    .string({ required_error: "Provide valid position in company" })
    .regex(/\w.*\s\w.*/, "Provide valid full name followed by spaces"),
  PositionInCompany: z
    .string()
    .min(2, "Provide position in company with atleast 2 chars"),
  Email: z
    .string({ required_error: "Provide valid email" })
    .email("Provide a valid email format john@gmail.com")
    .min(5, "Provide email with atleast 5 chars"),
  MobNumber: z
    .string({ required_error: "Provide valid mobile number" })
    .regex(
      /\+65(6|8|9)\d{7}/g,
      "Provide a valid singapore number (+6561234567)"
    )
    .length(11, "Provide mobile number of 11 digits"),
  Documents: z
    .array(z.instanceof(File), {
      required_error: "Upload atleast one document",
    })
    .min(1, "Upload atleast one document")
    .max(6, "Max 6 documents allowed"),
  IsTermsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms & conditions" }),
  }),
});
export type SME = z.infer<typeof SMESchema>;

function Stepper() {
  const stepperElRef = useRef<HTMLDivElement | null>(null);
  const [createSMEAction, isPending] = useServerAction(createSME);
  const [hsStepper, setHsStepper] = useState<HSStepper | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<FieldValues & SME>({
    resolver: zodResolver(SMESchema),
  });

  const onSubmit: SubmitHandler<FieldValues & SME> = (data) => {
    console.log("Submit", data);
    const payload = Object.assign<{ DocumentsFormData: FormData }, SME>(
      { DocumentsFormData: new FormData() },
      data as SME
    );
    // @ts-ignore
    delete payload.Documents;
    const formData = new FormData();
    data.Documents.forEach((document) =>
      formData.append("smeDocuments", document, document.name)
    );
    payload.DocumentsFormData = formData;
    createSMEAction(payload);
  };

  function goToNext(inputFieldNames: string[]) {
    trigger(inputFieldNames, { shouldFocus: true }).then((isValid) => {
      if (isValid) hsStepper?.goToNext();
    });
  }

  useEffect(() => {
    if (stepperElRef.current) {
      const HSStepperInstance = new HSStepper(stepperElRef.current);
      setHsStepper(HSStepperInstance);
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
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                1
              </span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block">
                <use href="check.svg#default" />
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
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                2
              </span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block">
                <use href="check.svg#default" />
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
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                3
              </span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block">
                <use href="check.svg#default" />
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
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                4
              </span>
              <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block">
                <use href="check.svg#default" />
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

      {isPending ? (
        <div className="h-full w-full flex justify-center items-center">
          <div
            className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <form
          className="mt-5 sm:mt-8"
          onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
        >
          <div
            data-hs-stepper-content-item='{
      "index": 1
    }'
          >
            <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
              <CompanyInfoForm register={register} errors={errors} />
            </div>
          </div>

          <div
            data-hs-stepper-content-item='{
      "index": 2
    }'
            style={{ display: "none" }}
          >
            <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
              <ApplicantInfoForm register={register} errors={errors} />
            </div>
          </div>

          <div
            data-hs-stepper-content-item='{
      "index": 3
    }'
            style={{ display: "none" }}
          >
            <div className="p-4 h-fit bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
              <UploadDocumentForm
                register={register}
                errors={errors}
                control={control}
              />
            </div>
          </div>

          <div
            data-hs-stepper-content-item='{
      "index": 4
    }'
            style={{ display: "none" }}
          >
            <div className="p-4 h-fit bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
              <TermsConditionsForm register={register} errors={errors} />
            </div>
          </div>
          <div
            data-hs-stepper-content-item='{
      "isFinal": true
    }'
            style={{ display: "none" }}
          >
            <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
              Thank you for submission
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
              // data-hs-stepper-next-btn=""
              onClick={(e) => {
                if (hsStepper) {
                  // TODO: Add currentIndex to HSStepper
                  // @ts-ignore
                  switch (hsStepper.currentIndex) {
                    case 1: {
                      goToNext(["UEN", "CompanyName"]);
                      break;
                    }
                    case 2: {
                      goToNext([
                        "FullName",
                        "PositionInCompany",
                        "Email",
                        "MobNumber",
                      ]);
                      break;
                    }
                    case 3: {
                      goToNext(["Documents"]);
                      break;
                    }
                    case 4: {
                      goToNext(["IsTermsAccepted"]);
                      break;
                    }
                  }
                }
              }}
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
              type="submit"
              className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-finish-btn=""
              style={{ display: "none" }}
            >
              Finish
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Stepper;
