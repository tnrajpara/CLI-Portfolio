import { useState } from "react";
import Terminal from "./Terminal";

const App = () => {
  const [dark, setDark] = useState(true);
  return (
    <div className="bg-[#121313] h-screen w-screen   flex justify-center font-robotoMono">
      <Terminal dark={dark} setDark={setDark} />
    </div>
  );
};

export default App;
