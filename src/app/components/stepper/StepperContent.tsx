import { PropsWithChildren } from "react";

type StepperContentProps = {
  index: number;
  isFinal?: boolean;
};

const StepperContent: React.FC<PropsWithChildren<StepperContentProps>> = ({
  index,
  isFinal,
  children,
}) => {
  const stepperContentItem: {
    index?: number;
    isFinal?: boolean;
  } = {};
  if (isFinal) {
    stepperContentItem.isFinal = isFinal;
  } else {
    stepperContentItem.index = index;
  }
  return (
    <div data-hs-stepper-content-item={JSON.stringify(stepperContentItem)}>
      <div className="p-4 h-fit min-h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
        {children}
      </div>
    </div>
  );
};

export default StepperContent;
