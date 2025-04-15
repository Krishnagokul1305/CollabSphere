"use client";
function Input() {
  const [bio, setBio] = useState("");
  const maxLength = 300;
  return (
    <div className="flex items-start space-x-6 p-6 bg-white rounded-lg shadow-md max-w-2xl">
      {/* Left Side: Label & Description */}
      <div className="w-1/3">
        <h2 className="text-sm font-medium text-gray-700">Bio Description</h2>
        <p className="text-xs text-gray-500">
          This will be your main story. Keep it very, very long.
        </p>
      </div>

      {/* Right Side: Textarea */}
      <div className="relative w-2/3">
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={maxLength}
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-lg resize-none shadow-sm focus:ring-0 focus:outline-none"
          placeholder="Write your bio here..."
        ></textarea>

        {/* Character Count */}
        <div className="absolute bottom-2 right-3 text-xs text-gray-400">
          {bio.length}/{maxLength}
        </div>
      </div>
    </div>
  );
}

export default Input;
