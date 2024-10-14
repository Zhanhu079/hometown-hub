/* eslint-disable react/prop-types */
const CategoryCard = ({ title, bgColor, icon: Icon, description }) => {
    return (
      <div
        className={`${bgColor} relative w-full h-60 rounded-lg p-5 flex flex-col items-center justify-center overflow-hidden`}
      >
        {/* Large background icon */}
        <Icon className="absolute text-white opacity-20 text-[15rem] " />
  
        {/* Centered title */}
        <h1 className="font-bold text-2xl text-white z-10 text-center">{title}</h1>
  
        {/* Description text */}
        <p className="text-white z-10 text-center mt-2">{description}</p>
      </div>
    );
  };
  
  export default CategoryCard;
  