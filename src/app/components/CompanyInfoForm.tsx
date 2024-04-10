import Input from "./Input";

function CompanyInfoForm() {
  return (
    <form className="flex flex-row gap-4">
        <Input placeholder="Company UEN" label="Company UEN"/>
        <Input placeholder="Company Name" label="Company Name"/>
    </form>
  );
}

export default CompanyInfoForm