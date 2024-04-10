import Input from "./Input";

function ApplicantInfoForm() {
  return (
    <form className="grid grid-cols-2 gap-4">
      <Input placeholder="Full Name" label="Full Name" />
      <Input
        placeholder="Position with company"
        label="Position with company"
      />
      <Input type="email" placeholder="Email Address" label="Email Address" />
      <Input type="tel" placeholder="Mobile Number" label="Mobile Number" />
    </form>
  );
}

export default ApplicantInfoForm;
