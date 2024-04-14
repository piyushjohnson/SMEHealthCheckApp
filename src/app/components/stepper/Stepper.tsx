"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import HSStepper from "@preline/stepper";
import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createSME } from "../../actions";
import { useServerAction } from "../../hooks/useServerAction";
import Button from "../base/Button";
import Spinner from "../base/Spinner";
import ApplicantInfoForm from "../forms/ApplicantInfoForm";
import CompanyInfoForm from "../forms/CompanyInfoForm";
import TermsConditionsForm from "../forms/TermsConditionsForm";
import UploadDocumentForm from "../forms/UploadDocumentForm";
import StepperContent from "./StepperContent";
import StepperItem from "./StepperItem";
import { SME, SMEZodSchema } from "@/app/schemas";

function Stepper() {
  const stepperElRef = useRef<HTMLDivElement | null>(null);
  const formElRef = useRef<HTMLFormElement | null>(null);
  const nextBtnElRef = useRef<HTMLButtonElement | null>(null);
  const finishBtnRef = useRef<HTMLButtonElement | null>(null);
  const [createSMEAction, isPending] = useServerAction(createSME);
  const [hsStepper, setHsStepper] = useState<HSStepper | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<FieldValues & SME>({
    resolver: zodResolver(SMEZodSchema),
  });

  const onSubmit: SubmitHandler<FieldValues & SME> = async (data) => {
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

  function goToNext(inputFieldNames: string[], isFinal: boolean = false) {
    return trigger(inputFieldNames, { shouldFocus: true }).then((isValid) => {
      if (isValid) {
        if (isFinal) {
          // @ts-ignore
          hsStepper?.removeOptionalClasses();
          // @ts-ignore
          hsStepper.handleFinishButtonClick();
        } else {
          // @ts-ignore
          hsStepper?.removeOptionalClasses();
          hsStepper?.goToNext();
        }
      } else {
        // @ts-ignore
        hsStepper?.setErrorNavItem(hsStepper.currentIndex);
      }
      return isValid;
    });
  }

  useEffect(() => {
    if (stepperElRef.current) {
      const HSStepperInstance = new HSStepper(stepperElRef.current);
      //@ts-ignore
      if (nextBtnElRef.current) HSStepperInstance.nextBtn = nextBtnElRef.current;
      //@ts-ignore
      if (finishBtnRef.current) HSStepperInstance.finishBtn = finishBtnRef.current;
      setHsStepper(HSStepperInstance);
    }
  }, []);

  return (
    <div data-hs-stepper="" ref={stepperElRef}>
      <ul className="relative flex flex-col md:flex-row gap-2">
        <StepperItem index={1} title="Company Information" description="" />
        <StepperItem index={2} title="Applicant Infomation" description="" />
        <StepperItem index={3} title="Upload Document" description="" />
        <StepperItem index={4} title="Terms & Conditions" description="" />
      </ul>

      <form
        ref={formElRef}
        className="mt-5 sm:mt-8"
        onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
      >
        <StepperContent index={1}>
          <CompanyInfoForm register={register} errors={errors} />
        </StepperContent>
        <StepperContent index={2}>
          <ApplicantInfoForm register={register} errors={errors} />
        </StepperContent>
        <StepperContent index={3}>
          <UploadDocumentForm
            register={register}
            errors={errors}
            control={control}
          />
        </StepperContent>
        <StepperContent index={4}>
          <TermsConditionsForm register={register} errors={errors} />
        </StepperContent>
        <StepperContent index={5} isFinal>
          <div className="w-full flex flex-col gap-2">
            <p className="text-center">Thank you for submission</p>
            {isPending && (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            )}
          </div>
        </StepperContent>
        <div className="mt-5 flex justify-between items-center gap-x-2">
          <Button
            variant="outline"
            type="button"
            data-hs-stepper-back-btn=""
            icon={(props) => (
              <svg {...props}>
                <use href="back.svg#default" />
              </svg>
            )}
          >
            Back
          </Button>
          <Button
            ref={nextBtnElRef}
            variant="solid"
            type="button"
            // data-hs-stepper-next-btn=""
            iconAlign="right"
            icon={(props) => (
              <svg {...props}>
                <use href="next.svg#default" />
              </svg>
            )}
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
          </Button>
          <Button
            ref={finishBtnRef}
            type="button"
            // data-hs-stepper-finish-btn=""
            style={{ display: "none" }}
            onClick={(event) => {
              goToNext(["IsTermsAccepted"], true).then((isValid) => {
                if (isValid) formElRef.current?.requestSubmit();
              });
            }}
          >
            Finish
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Stepper;
