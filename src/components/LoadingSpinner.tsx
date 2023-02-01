import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="spinner-border animate-spin inline-block w-8 h-8 rounded-full" role="status">
        <FontAwesomeIcon size="2x" color="rgb(12 74 110)" icon={faSpinner} />
      </div>
    </div>
  );
};
