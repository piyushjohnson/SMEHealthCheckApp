import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../base/Input";
import { SME } from "../stepper/Stepper";

function ApplicantInfoForm({
  register,
  errors
}: {
  register: UseFormRegister<FieldValues & SME>;
  errors: FieldErrors<FieldValues>;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Input
        {...register("FullName", { required: true })}
        error={errors["FullName"]?.message}
        placeholder="Full Name"
        label="Full Name"
      />
      <Input
        {...register("PositionInCompany", { required: true })}
        error={errors["PositionInCompany"]?.message}
        placeholder="Position with company"
        label="Position with company"
      />
      <Input
        {...register("Email", { required: true })}
        error={errors["Email"]?.message}
        type="email"
        placeholder="Email Address"
        label="Email Address"
      />
      <Input
        {...register("MobNumber", { required: true })}
        error={errors["MobNumber"]?.message}
        type="tel"
        placeholder="Mobile Number"
        label="Mobile Number"
      />
    </div>
  );
}

export default ApplicantInfoForm;
