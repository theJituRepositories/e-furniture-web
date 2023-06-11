import { createContext } from "react";
const SliderContext = createContext({
    isSliderConstrained: false,
    setIsSliderConstrained: () => {},
});
export default SliderContext