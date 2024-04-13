type StepperItemProps = {
  index: number;
  title: string;
  description: string;
};

function StepperItem({ index, title, description }: StepperItemProps) {
  return (
    <li
      className=" md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block"
      data-hs-stepper-nav-item={`{ "index": ${index} }`}
    >
      <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle ">
        <span className="hs-stepper-active:bg-purple-600 hs-stepper-active:text-white hs-stepper-success:bg-purple-600 hs-stepper-success:text-white hs-stepper-completed:bg-purple-600 hs-stepper-error:bg-red-600 size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full">
          <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
            {index}
          </span>
          <svg className="hidden flex-shrink-0 size-3 hs-stepper-success:block">
            <use href="check.svg#default" />
          </svg>
        </span>
        <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden "></div>
      </div>
      <div className="grow md:grow-0 md:mt-3 pb-5">
        <span className="block text-sm font-medium text-gray-800">{title}</span>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </li>
  );
}

export default StepperItem;