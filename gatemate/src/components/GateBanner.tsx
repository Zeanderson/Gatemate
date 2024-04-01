import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";

type BannerProps = {
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

type FieldInfoType = {
  fieldId: number;
  location: { lat: number; lon: number }[];
  Gates: GateInfoType[];
};

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

export function GateBanner(props: BannerProps) {
  const params = new URLSearchParams(window.location.search);
  const fieldId = params.get("id");
  const fields = getFields();

  if (fields.isLoading || fields.data.message === undefined) {
    return <ClipLoader />;
  }

  if (fields.data.status === "200") {
    const userFields: FieldInfoType[] = fields.data.message;
    return (
      <div
        className={
          props.className +
          " flex flex-row justify-between items-center rounded-xl bg-Corp3 py-3 pl-3"
        }
      >
        <div className={"flex flex-col items-center gap-1 text-xs "}>
          <Combobox className="lg:max-w-xs" openOnFocus={true}>
            <ComboboxInput
              className="bg-Corp2 rounded-md p-2"
              spellCheck={false}
              placeholder={"Field " + fieldId}
            />
            <ComboboxPopover className="bg-Corp2 p-2">
              <ComboboxList>
                {userFields.map((field: FieldInfoType) => (
                  <ComboboxOption
                    className="hover:bg-slate-500 rounded-md transition-colors"
                    value={`Field ${field.fieldId}`}
                    key={field.fieldId}
                    onClick={() =>
                      (window.location.href = `/field?id=${field.fieldId}`)
                    }
                  />
                ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>
        <div className="pr-3">
          <button
            onClick={() => (window.location.href = "/home")}
            className="rounded-xl text-xs p-2 bg-Corp2 flex flex-row gap-2 items-center hover:bg-Corp4 transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

export default GateBanner;
