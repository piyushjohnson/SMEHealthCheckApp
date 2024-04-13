function Spinner() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div
        className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-purple-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;