import "./App.css";
import { IoMdSettings } from "react-icons/io";

const App = () => {
  return (
    <>
      <div className="p-4 mx-auto max-w-xl">
        <div className="w-full bg-[#EEEEEE] py-2 px-4 flex justify-center items-center border rounded-lg">
          <div className="flex-1"></div>
          <p className="flex-1 text-2xl text-zinc-900 font-extrabold text-nowrap">
            Published Links Buddy
          </p>
          <div className="flex-1 flex justify-end items-center">
            <IoMdSettings size={24} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
