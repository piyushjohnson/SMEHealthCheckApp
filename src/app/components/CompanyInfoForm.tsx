import Input from "./Input";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useForm,
} from "react-hook-form";

function CompanyInfoForm({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) {
  return (
    <div className="flex flex-row gap-4">
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
