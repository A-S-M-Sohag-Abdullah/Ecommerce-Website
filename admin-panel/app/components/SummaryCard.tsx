import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SummaryCardProps = {
  title: string;
  value: string | number;
  growth: number;
};

const SummaryCard = ({ title, value, growth }: SummaryCardProps) => (
  <div className="">
    <h4 className="text-sm text-gray-400">{title}</h4>
    <h2 className="text-2xl font-semibold">{value}</h2>
    <p
      className={
        "flex items-center gap-2 " +
        (growth >= 0 ? "text-green-600" : "text-red-600 ")
      }
    >
      {growth}%
      {growth >= 0 ? (
        <FontAwesomeIcon icon={faAngleUp} className="w-5" />
      ) : (
        <FontAwesomeIcon icon={faAngleDown} className="w-5" />
      )}
    </p>
  </div>
);

export default SummaryCard;
