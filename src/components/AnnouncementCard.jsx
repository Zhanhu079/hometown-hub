/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


const AnnouncementCard = ({ title, description, date, location, featured }) => {
  return (
    <div className="w-[25%] p-4 flex flex-col justify-between h-full shadow-md rounded-xl flex-shrink-0">
      <div>
        <h1 className="font-poppins font-semibold mb-3">{title}</h1>
        <p className="font-quicksand text-[14px] text-slate-700">{description}</p>
      </div>
      <div className="mt-5 flex justify-between">
        <p className="font-roboto text-[12px] text-slate-500 font-semibold">{date}</p>
        <p className="font-roboto text-[12px] text-slate-500 font-semibold">{location}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
