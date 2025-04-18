
import { FC } from "react";

interface DriverHeaderProps {
  firstName?: string;
}

const DriverHeader: FC<DriverHeaderProps> = ({ firstName }) => {
  return (
    <header className="bg-[#222222] shadow-sm border-b border-red-800">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <h1 className="text-3xl font-bold text-red-500">Espace Pilote</h1>
        <p className="text-gray-300">Bienvenue, {firstName}</p>
      </div>
    </header>
  );
};

export default DriverHeader;
