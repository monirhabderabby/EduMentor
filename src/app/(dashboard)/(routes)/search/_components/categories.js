import { FaCode } from "react-icons/fa";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import Categoryitem from "./category-item";

const iconMap = {
  Music: <FcMusic size={20} />,
  Photography: <FcOldTimeCamera size={20} />,
  Fitness: <FcSportsMode size={20} />,
  Accounting: <FcSalesPerformance size={20} />,
  "Computer Science": <FcMultipleDevices size={20} />,
  "Software Development": <FaCode size={20} />,
  Filming: <FcFilmReel size={20} />,
  Engineering: <FcEngineering size={20} />,
};

const Categories = ({ items }) => {
  return (
    <div>
      <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        {items.map((item) => (
          <Categoryitem
            key={item.id}
            label={item.name}
            icon={iconMap[item.name]}
            value={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
