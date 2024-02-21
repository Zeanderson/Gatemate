import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

//TODO Make the button a new component with props for (field name, field status, field link)
// <div className="flex flex-col h-[48rem] justify-between">

{
  /* Field section */
}
function AnalysisBox() {
  return (
    <div className="flex flex-col gap-4 p-4 items-center w-[21.8rem]">
      <h1>Field Analysis</h1>
      <button
        className="rounded-xl p-4 bg-Corp2 flex flex-row gap-2 items-center min-w-full hover:bg-Corp4 transition-colors"
        onClick={() => (window.location.href = "/field")}
      >
        <FontAwesomeIcon
          className="text-red-500"
          icon={faCircleExclamation}
          size="2x"
        />
        <p className="text-white">Field 3</p>
      </button>
      <button
        className="rounded-xl p-4 bg-Corp2 flex flex-row gap-2 items-center min-w-full hover:bg-Corp4 transition-colors"
        onClick={() => (window.location.href = "/field")}
      >
        <FontAwesomeIcon
          className="text-yellow-500"
          icon={faTriangleExclamation}
          size="2x"
        />
        <p className="text-white">Field 2</p>
      </button>
      <button
        className="rounded-xl p-4 bg-Corp2 flex flex-row gap-2 items-center min-w-full hover:bg-Corp4 transition-colors"
        onClick={() => (window.location.href = "/field")}
      >
        <FontAwesomeIcon
          className="text-green-500"
          icon={faSquareCheck}
          size="2x"
        />
        <p className="text-white">Field 1</p>
      </button>
    </div>
  );
}

{
  /* Legend section */
}
{
  /* <div className="flex flex-row text-sm p-4 justify-between">
        <div className="flex flex-row gap-1 items-center">
          <FontAwesomeIcon
            className="text-green-500"
            icon={faSquareCheck}
            size="2x"
          />
          <h1>All up</h1>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <FontAwesomeIcon
            className="text-yellow-500"
            icon={faTriangleExclamation}
            size="2x"
          />
          <h1>Minor</h1>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <FontAwesomeIcon
            className="text-red-500"
            icon={faCircleExclamation}
            size="2x"
          />
          <h1>Major</h1>
        </div>
      </div> */
}
{
  /* </div> */
}

export default AnalysisBox;
