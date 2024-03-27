import { Layer, Map, Marker, Source } from "react-map-gl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { Feature } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCheckSquare,
  faCircle,
  faCircleXmark,
  faDoorOpen,
  faLink,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getDistance, getCenter } from "geolib";

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

type MapType = {
  className?: string;
};

type LocationType = {
  lat: number;
  lon: number;
};

function Field(cords: number[][]) {
  const geoJsonField: Feature = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [cords],
    },
  };
  return geoJsonField;
}

async function createField(cords: number[][]) {
  let location: LocationType[] = [];
  cords.forEach((cord) => {
    location.push({ lat: cord[0], lon: cord[1] });
  });

  try {
    const response = await axios.post(
      "/api/v1/field/create",
      {
        location: location,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function deleteField(fieldId: number) {
  try {
    const response = await axios.delete(`/api/v1/field/${fieldId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
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

//TODO Have settings popup for the field and show what is current
//TODO Have settings popup for gate and show what is current
//TODO Have dropdown for field dashboard actually show all, and load the correct field dashboard
//TODO Update ICON's for maps to be inclusive to color blind
//TODO Dark and Light mode for theme

function MainGLMap({ className }: MapType) {
  const [showSettings, setShowSettings] = useState(false);
  const [addField, setAddField] = useState(false);
  const [fieldCords, setFieldCords] = useState<number[][]>([]);
  const [activeField, setActiveField] = useState<FieldInfoType>();
  const [refetch, setRefetch] = useState(false);

  // console.log(fieldCords);

  const bareField: FieldInfoType = {
    fieldId: -1,
    location: [],
    Gates: [],
  };

  const queryClient = useQueryClient();

  if (refetch) {
    queryClient.invalidateQueries({
      queryKey: ["fields"],
      refetchType: "all", // refetch both active and inactive queries
    });

    setRefetch(!refetch);
  }

  const fields = getFields();

  if (fields.isLoading || fields.data.message === undefined) {
    return <ClipLoader />;
  }

  if (fields.data.status === "200") {
    const userFields: FieldInfoType[] = fields.data.message;

    return (
      <div
        className={
          "relative border-4 border-solid rounded-3xl border-Corp3 " + className
        }
      >
        <Map
          onClick={(e) => {
            addField
              ? setFieldCords([...fieldCords, [e.lngLat.lng, e.lngLat.lat]])
              : setFieldCords([]);
          }}
          mapboxAccessToken={import.meta.env.VITE_MAP_BOX_KEY}
          mapLib={import("mapbox-gl")}
          initialViewState={{
            longitude: -94.160583,
            latitude: 32.061932,
            zoom: 14,
          }}
          style={{
            width: "100%",
            height: "85vh",
            aspectRatio: 1 / 1,
            borderRadius: "20px",
            overflow: "",
          }}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        >
          {userFields.map((field: FieldInfoType, index: number) => {
            const cords: number[][] = [];
            let iconLong = field.location[0].lon;
            let iconLat = field.location[0].lat;
            field.location.forEach((location) => {
              const existingCoord = cords.find(
                (coord) =>
                  coord[0] === location.lat && coord[1] === location.lon
              );
              if (!existingCoord) {
                cords.push([location.lat, location.lon]);
              }
            });

            const locationArray: LocationType[] = [];

            for (let i = 0; i < field.location.length; i++) {
              locationArray.push({
                lat: field.location[i].lon,
                lon: field.location[i].lat,
              });
            }

            const locationCenter = getCenter(locationArray);

            if (locationCenter !== false) {
              iconLong = locationCenter.longitude;
              iconLat = locationCenter.latitude;
            }

            const fieldFeature = Field(cords);

            return (
              <Source type="geojson" data={fieldFeature} key={index}>
                <Layer
                  id={`polygon${index}`}
                  type="fill"
                  paint={{
                    "fill-color": "#088",
                    "fill-opacity": 0.8,
                  }}
                />
                <Marker
                  style={{ position: "absolute" }}
                  longitude={iconLong}
                  latitude={iconLat}
                >
                  <h1 className="text-xl text-black font-Arvo">{`Field ${field.fieldId}`}</h1>
                  <button
                    className="text-green-500"
                    onClick={() => {
                      setShowSettings(true);
                      setActiveField(field);
                    }}
                  >
                    <FontAwesomeIcon icon={faCheckSquare} size="4x" />
                  </button>
                </Marker>
              </Source>
            );
          })}

          {fieldCords.map((cord, index) => {
            return (
              <Marker
                key={index}
                style={{ position: "absolute" }}
                longitude={cord[0]}
                latitude={cord[1]}
              >
                <button
                  onClick={() => {
                    // TODO BEN WORK HERE ---------------------------------------------------------- \\
                    //TODO When pressed, remove the cord that was pressed from the array, so if a user messes up they can remove it easily
                    //TODO ------------------------------------------------------------------------------ \\
                  }}
                >
                  <FontAwesomeIcon icon={faCircle} size="2x" />
                </button>
              </Marker>
            );
          })}
        </Map>
        <div className="absolute top-4 right-4 border rounded-xl p-2 bg-Corp3 border-Corp2 text-Corp1 flex flex-col gap-2">
          {addField ? (
            <div className="flex flex-col items-center gap-3">
              <p>Place markers to outline field</p>

              <table>
                <tbody>
                  {fieldCords.map((cord, index) => (
                    <tr key={index} className="text-xs border border-white">
                      <td className="p-1 border border-white">
                        Cord {index + 1}
                      </td>
                      <td className="p-1">{cord[0].toFixed(6)}</td>
                      <td className="p-1">{cord[1].toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-row gap-2 items-center">
                {fieldCords.length > 2 ? (
                  <button
                    className="hover:border-Corp3 hover:bg-Corp2 transition-colors rounded-xl flex flex-row gap-2 p-2"
                    onClick={() => {
                      fieldCords.length < 3
                        ? setAddField(!addField)
                        : createField(fieldCords);
                      setFieldCords([]),
                        setAddField(!addField),
                        setRefetch(true);
                    }}
                  >
                    <p>Submit Field</p>
                    <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                  </button>
                ) : null}
                <button
                  className="hover:border-Corp3 hover:bg-Corp2 transition-colors rounded-xl flex flex-row gap-2 p-2"
                  onClick={() => {
                    setFieldCords([]);
                    setAddField(!addField);
                  }}
                >
                  <p>Cancel</p>
                  <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                </button>
              </div>
            </div>
          ) : (
            <button
              className="flex flex-row gap-2 items-center hover:border-Corp3 hover:bg-Corp2 transition-colors rounded-xl p-3"
              onClick={() => {
                {
                  addField ? null : setFieldCords([]);
                }
                setAddField(!addField);
              }}
            >
              <p>Add Field</p>
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
          )}
        </div>

        {showSettings ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-10 z-50 outline-none focus:outline-none">
              <div className="bg-Corp3 rounded-xl p-6 items-center flex flex-col gap-6 border-Corp2 border">
                <h1>Field Settings</h1>
                <div className="flex flex-col gap-2">
                  <button
                    className="flex flex-row gap-2 p-3 bg-Corp2 hover:bg-Corp4 transition-colors rounded-xl items-center justify-between"
                    onClick={() => {
                      setShowSettings(false);
                      window.location.href = activeField
                        ? `/field?id=${activeField.fieldId}`
                        : "/field?id=1";
                    }}
                  >
                    <p>Field Dashboard</p>
                    <FontAwesomeIcon icon={faLink} size="xl" />
                  </button>

                  <button
                    className="flex flex-row gap-2 p-3 bg-Corp2 hover:bg-Corp4 transition-colors rounded-xl items-center justify-between"
                    onClick={() => {
                      if (activeField) {
                        deleteField(activeField.fieldId);
                        setActiveField(bareField);
                        setShowSettings(false);
                        setRefetch(true);
                      }
                    }}
                  >
                    <p>Delete Field</p>
                    <FontAwesomeIcon icon={faCircleXmark} size="xl" />
                  </button>
                </div>

                <button
                  className="flex flex-row gap-2 p-3 bg-Corp2 hover:bg-Corp4 transition-colors rounded-xl items-center"
                  onClick={() => {
                    setActiveField(bareField);
                    setShowSettings(false);
                  }}
                >
                  <p>Close</p>
                  <FontAwesomeIcon icon={faDoorOpen} size="xl" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default MainGLMap;
