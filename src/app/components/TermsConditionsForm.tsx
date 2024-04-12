import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { SME } from "./Stepper";

function TermsConditionsForm({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues & SME>;
  errors: FieldErrors<FieldValues>;
}) {
  let errorMessage = "";
  let error = errors["IsTermsAccepted"];
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
    <div>
      <div className="flex">
        <input
          {...register("IsTermsAccepted", { required: true })}
          type="checkbox"
          className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
          id="acceptTermsCheckbox"
        />

        <label
          htmlFor="acceptTermsCheckbox"
          className="text-sm text-gray-500 ms-3 dark:text-gray-400"
          >
          By ticking, you are confirming that you have understood and agreeing
          to the details mentioned
        </label>
      </div>
          {error && <p className="text-xs text-red-600 mt-2">{errorMessage}</p>}
      <ul
        className="flex-1 marker:bg-purple-500 pl-5 space-y-2"
        style={{
          listStyleImage: "url(checkmark.svg)",
        }}
      >
        <li>
          I confirm that I am authorized person to upload bank statements on
          behalf of my company
        </li>
        <li>
          I assure you that bank statements provided have no mismatch, If there
          is any then report will be generated
        </li>
        <li>
          I understand that this is general report based on bank statements and
          Credling is not providing a solution or guiding me for my bussiness
          growth
        </li>
        <li>
          I have read and understood the{" "}
          <a href="https://smehealthcheck.credilinq.ai/terms-and-conditions">
            Terms and Conditions
          </a>
        </li>
      </ul>
    </div>
  );
}

export default TermsConditionsForm;
