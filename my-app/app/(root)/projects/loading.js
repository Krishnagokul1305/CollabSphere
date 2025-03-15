function loading() {
  return (
    <div className="flex items-center justify-center min-h-[40vh] gap-2">
      <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-400"></div>
    </div>
  );
}

export default loading;
