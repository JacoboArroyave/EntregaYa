import { useEffect } from "react";

interface CardsProps {
  data: any[];
  handleClick: (element: any) => void;

  firstAtribute: { attribute: string; icon?: string };
  secondAtribute: { attribute: string; icon?: string };
  thirdAtribute?: { attribute: string; icon?: string };
  button: string;
  urlPhoto:string
}

const Card: React.FC<CardsProps> = ({ urlPhoto, data, handleClick, firstAtribute, secondAtribute, thirdAtribute, button }) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center px-6 py-8">
      {data.map((item: any) => (
        <div
          key={item.id}
          className="bg-white w-72 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 cursor-pointer border border-orange-100"
        >
          <img
          src={urlPhoto }
            alt="Restaurant"
            className="w-full h-44 object-cover rounded-t-2xl"
          />
          <div className="p-5 space-y-2">
            <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-500 truncate">{firstAtribute.icon ? firstAtribute.icon : ""}{item[firstAtribute.attribute]}</p>
            <p className="text-sm text-gray-600"> {secondAtribute.icon ? secondAtribute.icon : ""}{item[secondAtribute.attribute]}</p>
            {thirdAtribute ? <p className="text-sm text-gray-600">{thirdAtribute.icon ? thirdAtribute.icon : ""} {item[thirdAtribute.attribute]}</p> : ""}
            <div className="pt-4 text-center">
              <button
                onClick={() => handleClick(item)}

                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-5 py-2 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-200">
                {button}  
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
