const Spinner = ({ theme = "light" }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin  ${
          theme == "light"
            ? " dark:border-white border-black"
            : "border-white dark:border-black"
        }`}
      ></div>
    </div>
  );
};

export default Spinner;
