import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

type analysisType = {
  className?: string;
  fieldGates: GateInfoType[];
};

type GateInfoType = {
  gateId: number;
  idealWaterLevel: number;
  threshold: number;
  actualWaterLevel: number;
  connectionError: boolean;
  lowBattery: boolean;
  status: string;
  location: { lat: number; lon: number };
};

function GateAnalysisBox({ className, fieldGates }: analysisType) {
  return (
    <div
      className={
        className + " flex flex-col justify-between rounded-xl bg-Corp3"
      }
    >
      <div className={"flex flex-col p-4 gap-4 items-center"}>
        {fieldGates.map((gate: GateInfoType, index: number) => {
          let gateStatus = {
            color: "text-red-500",
            icon: faCircleExclamation,
          };
          if (gate.status === "Yellow") {
            gateStatus.color = "text-yellow-500";
            gateStatus.icon = faTriangleExclamation;
          }
          if (gate.status === "Green") {
            gateStatus.color = "text-green-500";
            gateStatus.icon = faSquareCheck;
          }

          return (
            <button
              key={index}
              className="rounded-xl p-4 bg-Corp2 flex flex-row gap-2 items-center min-w-full hover:bg-Corp4 transition-colors"
            //TODO Needs to open up the gate settings page
            // onClick={() => (window.location.href = `/field?id=${fieldId}`)}
            >
              <FontAwesomeIcon
                className={gateStatus.color}
                icon={gateStatus.icon}
                size="2x"
              />
              <p className="text-white">{"Gate " + gate.gateId}</p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-row text-xs p-4 justify-between">
        <div className="flex flex-row gap-1 items-center">
          <FontAwesomeIcon
            className="text-green-500"
            icon={faSquareCheck}
            size="2x"
          />
          <h1>Good</h1>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <FontAwesomeIcon
            className="text-yellow-500"
            icon={faTriangleExclamation}
            size="2x"
          />
          <h1>Warning</h1>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <FontAwesomeIcon
            className="text-red-500"
            icon={faCircleExclamation}
            size="2x"
          />
          <h1>Critical</h1>
        </div>
      </div>
    </div>
  );
  // }
}

export default GateAnalysisBox;
