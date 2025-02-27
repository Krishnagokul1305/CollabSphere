const Spinner = ({ theme }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${
          theme == "light" && " border-white"
        }`}
      ></div>
    </div>
  );
};

export default Spinner;
