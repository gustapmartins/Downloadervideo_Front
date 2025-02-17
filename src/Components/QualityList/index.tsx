import React from "react";

interface QualityListProps {
  qualities: { resolution: string, id: string }[];
  selectedQuality: string;
  onSelectQuality: (quality: string) => void;
}

const QualityList: React.FC<QualityListProps> = ({ 
  qualities,
  selectedQuality, 
  onSelectQuality
 }) => {
  return (
    <div className="mt-4 mb-4">
      {qualities.length > 0 && (
        <>
          <h3 className="text-gray-700 font-semibold mb-2">
            Qualidade disponível:
          </h3>
          <ul className="border border-gray-300 rounded-lg overflow-hidden">
            {qualities.map((item, index) => (
              <li
                key={index}
                className={`px-4 py-2 border-b last:border-none cursor-pointer transition-colors ${
                  selectedQuality === item.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => onSelectQuality(item.id)}
              >
                {item.resolution}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default QualityList;
