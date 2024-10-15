import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <div>
      <h1 className="font-bold font-poppins text-2xl">Search</h1>
      <div className="border p-3 my-5 flex gap-2 rounded-md w-[50%] mx-auto active:border-mainOrange">
        <IoSearchOutline className="text-3xl text-[#4d4d4d]" />
        <input
          type="text"
          placeholder="Search"
          className="w-full font-semibold focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Search;
