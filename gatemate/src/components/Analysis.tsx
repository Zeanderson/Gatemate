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
}

type FieldInfoType = {
  fieldId: number;
  location: { lat: number; lon: number }[];
  Gates: GateInfoType[];
}

function getFields() {
  return useQuery({
    queryKey: ["fields"],
    queryFn: async () => {
      const data = await axios.get("/api/v1/field/fieldInfo", {
        withCredentials: true,
      });
      return data.data;
    },
  });
}

function AnalysisBox({ className }: analysisType) {

  const fields = getFields()


  if (fields.isLoading || fields.data.message === undefined) {
    return <ClipLoader />;
  } else {

    const userFields: FieldInfoType[] = fields.data.message;

    return (
      <div
        className={
          className + " flex flex-col justify-between rounded-xl bg-Corp3"
        }
      >
        <div className={"flex flex-col p-4 gap-4 items-center"}>
          {userFields.map((field: FieldInfoType, index: number) => {
            return (
              <button
                key={index}
                className="rounded-xl p-4 bg-Corp2 flex flex-row gap-2 items-center min-w-full hover:bg-Corp4 transition-colors"
                onClick={() => (window.location.href = "/field")}
              >
                <FontAwesomeIcon
                  className="text-green-500"
                  icon={faSquareCheck}
                  size="2x"
                />
                <p className="text-white">{"Field " + field.fieldId}</p>
              </button>
            )
          })}
        </div>

        <div className="flex flex-row text-xs p-4 justify-between">
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
        </div>
      </div>
    );
  }


}

export default AnalysisBox;
