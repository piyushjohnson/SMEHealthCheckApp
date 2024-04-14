import Input from "../base/Input";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { SME } from "../stepper/Stepper";

function CompanyInfoForm({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues & SME>;
  errors: FieldErrors<FieldValues>;
}) {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 justify-center gap-4">
      <Input
        {...register("UEN", { required: true })}
        error={errors["UEN"]?.message}
        placeholder="Company UEN"
        label="Company UEN"
      />
      <Input
        {...register("CompanyName", { required: true })}
        error={errors["CompanyName"]?.message}
        placeholder="Company Name"
        label="Company Name"
      />
    </div>
  );
}

export default CompanyInfoForm;
