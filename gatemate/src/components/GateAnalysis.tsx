import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

type analysisType = {
  className?: string;
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

function getGates(fieldId: string) {
  return useQuery({
    queryKey: ["fields"],
    queryFn: async () => {
      const data = await axios.get(`/api/v1/gate/find/${fieldId}`, {
        withCredentials: true,
      });
      return data.data;
    },
  });
}

function GateAnalysisBox({ className }: analysisType) {
  const params = new URLSearchParams(window.location.search);
  const fieldId = params.get("id");

  const gates = getGates(fieldId ?? "");

  if (gates.isLoading || gates.data.message === undefined) {
    return <ClipLoader />;
  } else {
    const fieldGates: GateInfoType[] = gates.data.message;

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
            <h1>No problem</h1>
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
        </div>
      </div>
    );
  }
}

export default GateAnalysisBox;
