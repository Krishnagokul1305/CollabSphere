import { CheckIcon } from "lucide-react";
import Image from "next/image";

const ThemeCard = ({ label, isActive, onClick, themeImage }) => {
  return (
    <div
      className={` rounded-lg cursor-pointer mx-auto w-full flex items-center md:items-start  flex-col gap-2 p-2 md:p-4 
      `}
      onClick={onClick}
    >
      <div
        className={`relative h-[200px] w-[90%] ${
          isActive && "border-blue-500  rounded-lg border-4"
        }`}
      >
        <Image
          src={themeImage}
          alt={`${label} theme`}
          layout="fill"
          objectFit="cover"
          className="rounded-sm"
        />
        {isActive && (
          <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full">
            <CheckIcon className="h-5 w-5" />
          </div>
        )}
      </div>
      <p className="text-start mt-2 font-semibold">{label}</p>
    </div>
  );
};

export default ThemeCard;
