import { Layer, Map, Marker, Source } from "react-map-gl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { Feature } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircle,
  faCircleExclamation,
  faCircleXmark,
  faPlus,
  faSquareCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { SiLinuxcontainers } from "react-icons/si";
import { TiBatteryFull, TiBatteryLow } from "react-icons/ti";
import axios from "axios";

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
  fieldGates: GateInfoType[];
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

async function createGate(cords: number[], fieldId: string) {
  let location: LocationType = { lat: cords[1], lon: cords[0] };
  try {
    const response = await axios.post(
      `/api/v1/gate/create/${fieldId}`,
      {
        idealWaterLevel: 1.5,
        threshold: 2,
        actualWaterLevel: 1.6,
        connectionError: false,
        lowBattery: false,
        status: "Green",
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

async function updateGate(
  fieldId: string,
  gateId: number,
  idealWaterLevel: number,
  threshold: number,
  actualWaterLevel: number,
  connectionError: boolean,
  lowBattery: boolean,
  status: string,
  loc: any
) {
  try {
    const response = await axios.post(
      `/api/v1/gate/${fieldId}/${gateId}`,
      {
        idealWaterLevel: idealWaterLevel,
        threshold: threshold,
        actualWaterLevel: actualWaterLevel,
        connectionError: connectionError,
        lowBattery: lowBattery,
        status: status,
        location: loc,
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

async function deleteGate(fieldId: string, gateId: number) {
  try {
    const response = await axios.delete(`/api/v1/gate/${fieldId}/${gateId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function getField(fieldId: string) {
  return useQuery({
    queryKey: ["field"],
    queryFn: async () => {
      const data = await axios.get(`/api/v1/field/${fieldId}`, {
        withCredentials: true,
      });
      return data.data;
    },
  });
}

function FieldGLMap({ className, fieldGates }: MapType) {
  const params = new URLSearchParams(window.location.search);
  const fieldId = params.get("id");

  const [showSettings, setShowSettings] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [addGate, setAddGate] = useState(false);
  const [gateCords, setGateCords] = useState<number[]>([]);
  const [activeGate, setActiveGate] = useState<GateInfoType>();
  const [refetch, setRefetch] = useState(false);
  const [currentWaterLevel, setCurrentWaterLevel] = useState("");
  const [idealWaterLevel, setIdealWaterLevel] = useState("");
  const [threshold, setThreshold] = useState("");

  const bareGate = {
    gateId: -1,
    idealWaterLevel: -1,
    threshold: -1,
    actualWaterLevel: -1,
    connectionError: false,
    lowBattery: false,
    status: "",
    location: { lat: -1, lon: -1 },
  };

  const queryClient = useQueryClient();

  if (refetch) {
    queryClient.invalidateQueries({
      queryKey: ["gates"],
      refetchType: "all", // refetch both active and inactive queries
    });

    setRefetch(!refetch);
  }

  const field = getField(fieldId ?? "");

  if (field.isLoading || field.data.message === undefined) {
    return <ClipLoader />;
  }

  if (field.data.status === "200") {
    const selectedField: FieldInfoType = field.data.message;
    const cords: number[][] = [];
    selectedField.location.forEach((location) => {
      const existingCoord = cords.find(
        (coord) => coord[0] === location.lat && coord[1] === location.lon
      );
      if (!existingCoord) {
        cords.push([location.lat, location.lon]);
      }
    });

    const fieldFeature = Field(cords);

    let viewPointLong = -94.160583;
    let viewPointLat = 32.061932;
    if (
      fieldFeature.geometry.type === "Polygon" &&
      fieldFeature.geometry.coordinates[0][0][0] &&
      fieldFeature.geometry.coordinates[0][0][1]
    ) {
      const vertices = fieldFeature.geometry.coordinates[0]; // Extracting the vertices of the polygon
      let totalX = 0;
      let totalY = 0;

      // Calculating the total sum of x and y coordinates
      for (let i = 0; i < vertices.length; i++) {
        totalX += vertices[i][0];
        totalY += vertices[i][1];
      }

      // Calculating the average of x and y coordinates
      const centerLong = totalX / vertices.length;
      const centerLat = totalY / vertices.length;

      // Assigning the center coordinates
      viewPointLong = centerLong;
      viewPointLat = centerLat;
    }

    //TODO Make zoom variable, and this needs to be based off the area of the field. Calculate area and make size's
    // and these size's need to be correlated with zoom

    return (
      <div
        className={
          "relative border-4 border-solid rounded-3xl border-Corp3 " + className
        }
      >
        <Map
          onClick={(e) => {
            addGate
              ? setGateCords([e.lngLat.lng, e.lngLat.lat])
              : setGateCords([]);
          }}
          mapboxAccessToken={import.meta.env.VITE_MAP_BOX_KEY}
          mapLib={import("mapbox-gl")}
          initialViewState={{
            longitude: viewPointLong,
            latitude: viewPointLat,
            zoom: 16,
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
          <Source type="geojson" data={fieldFeature}>
            <Layer
              id={`polygon`}
              type="fill"
              paint={{
                "fill-color": "#088",
                "fill-opacity": 0.5,
                "fill-outline-color": "black",
              }}
            />
            {fieldGates.map((gate: GateInfoType, index) => {
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
                <Marker
                  key={gate.gateId}
                  style={{ position: "absolute" }}
                  longitude={gate.location.lon}
                  latitude={gate.location.lat}
                >
                  <button
                    onClick={() => {
                      setShowSettings(true);
                      setActiveGate(gate);
                    }}
                    className={gateStatus.color}
                  >
                    <div className="flex flex-row gap-1 items-center">
                      <FontAwesomeIcon icon={gateStatus.icon} size="2x" />
                      <p className="text-xl text-black font-Arvo">
                        {"Gate " + gate.gateId}
                      </p>
                    </div>
                    <SiLinuxcontainers size="5em" />
                  </button>
                </Marker>
              );
            })}
          </Source>
          <Marker
            key={gateCords[0]}
            style={{ position: "absolute" }}
            longitude={gateCords[0] ?? 0}
            latitude={gateCords[1] ?? 0}
          >
            <FontAwesomeIcon icon={faCircle} size="2x" />
          </Marker>
        </Map>
        <div className="absolute top-4 right-4 border rounded-xl p-2 bg-Corp3 border-Corp2 text-Corp1 flex flex-col gap-2">
          {addGate ? (
            <div className="flex flex-col items-center gap-2">
              <p>Place gate on map with a click</p>

              {gateCords.length > 1 ? (
                <table>
                  <tbody>
                    <tr className="text-xs border border-white">
                      <td className="p-1">{gateCords[0].toFixed(3)}</td>
                      <td className="p-1">{gateCords[1].toFixed(3)}</td>
                    </tr>
                  </tbody>
                </table>
              ) : null}

              <div className="flex flex-row gap-2 items-center">
                <button
                  className="hover:border-Corp3 hover:bg-Corp2 transition-colors rounded-xl flex flex-row gap-2 p-2"
                  onClick={() => {
                    gateCords.length < 1
                      ? setAddGate(!addGate)
                      : createGate(gateCords, fieldId ?? "");
                    setGateCords([]), setAddGate(!addGate);
                    setRefetch(true);
                  }}
                >
                  <p>Submit Gate</p>
                  <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                </button>
                <button
                  className="hover:border-Corp3 hover:bg-Corp2 transition-colors rounded-xl flex flex-row gap-2 p-2"
                  onClick={() => {
                    setGateCords([]);
                    setAddGate(!addGate);
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
                  addGate ? null : setGateCords([]);
                }
                setAddGate(!addGate);
              }}
            >
              <p>Add Gate</p>
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
          )}

          {showSettings ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-10 z-50 outline-none focus:outline-none">
                <div className="bg-Corp3 rounded-xl p-12 items-center flex flex-col gap-6 border-Corp2 border">
                  <div className="flex flex-col gap-2 items-center">
                    <h1>Gate Settings</h1>
                    <h2>{`Gate:  ${activeGate?.gateId}`}</h2>
                    <p>
                      Latitude: {activeGate?.location.lat.toFixed(3)} Longitude:{" "}
                      {activeGate?.location.lon.toFixed(3)}
                    </p>
                  </div>

                  <table className="rounded-xl bg-Corp2">
                    <tbody>
                      <tr>
                        <td className="p-3">Gate Health</td>
                        <td className="p-3">
                          <div
                            className={`flex flex-row gap-2 items-center ${
                              activeGate?.status === "Green"
                                ? "text-green-500"
                                : activeGate?.status === "Yellow"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={
                                activeGate?.status === "Green"
                                  ? faSquareCheck
                                  : activeGate?.status === "Yellow"
                                  ? faTriangleExclamation
                                  : faCircleExclamation
                              }
                              size="lg"
                            />
                            <p>
                              {activeGate?.status === "Green"
                                ? "Good"
                                : activeGate?.status === "Yellow"
                                ? "Warning"
                                : "Critical"}
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="p-3">Connection Error</td>
                        <td className="p-3">
                          <div
                            className={`flex flex-row gap-2 items-center ${
                              !activeGate?.connectionError
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={
                                !activeGate?.connectionError
                                  ? faSquareCheck
                                  : faCircleExclamation
                              }
                              size="lg"
                            />
                            <p>
                              {activeGate?.connectionError
                                ? "Critical"
                                : "Good"}
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">Current Water Level</td>
                        <td className="p-3">
                          {activeGate?.actualWaterLevel + " inches"}
                        </td>
                      </tr>

                      <tr>
                        <td className="p-3">Ideal Water Level</td>
                        <td className="p-3">
                          {activeGate?.idealWaterLevel + " inches"}
                        </td>
                      </tr>

                      <tr>
                        <td className="p-3">Water Threshold</td>
                        <td className="p-3">
                          {activeGate?.threshold + " inches"}
                        </td>
                      </tr>

                      <tr>
                        <td className="p-3">Battery Status</td>
                        <td className="p-3">
                          <div
                            className={`flex flex-row gap-2 items-center ${
                              !activeGate?.lowBattery
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <p className="pb-1">
                              {activeGate?.lowBattery ? (
                                <TiBatteryLow size="2em" />
                              ) : (
                                <TiBatteryFull size="2em" />
                              )}
                            </p>
                            <p>{activeGate?.lowBattery ? "Low" : "Good"}</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex flex-row gap-2">
                    <button
                      className="p-3 bg-Corp2 hover:bg-Corp4 transition-colors rounded-xl items-center"
                      onClick={() => {
                        setActiveGate(bareGate);
                        setShowSettings(false);
                      }}
                    >
                      <p>Close</p>
                    </button>
                    <button
                      className="p-3 bg-Corp2 hover:bg-Corp4 transition-colors rounded-xl items-center justify-between"
                      onClick={() => {
                        if (activeGate) {
                          setShowSettings(false);
                          setShowEdit(true);
                        }
                      }}
                    >
                      <p>Edit Gate</p>
                    </button>
                    <button
                      className="p-3 bg-red-500 hover:bg-red-300 text-Corp3 transition-colors rounded-xl items-center justify-between"
                      onClick={() => {
                        if (activeGate) {
                          deleteGate(fieldId ?? "", activeGate.gateId);
                          setActiveGate(bareGate);
                          setShowSettings(false);
                          setRefetch(true);
                        }
                      }}
                    >
                      <p>Delete Gate</p>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {showEdit ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-10 z-50 outline-none focus:outline-none">
                <div className="bg-Corp3 rounded-xl p-12 items-center flex flex-col gap-6 border-Corp2 border">
                  <div className="flex flex-col gap-2 items-center">
                    <h1>Gate Editing</h1>
                    <h2>{`Gate:  ${activeGate?.gateId}`}</h2>
                  </div>

                  <table className="rounded-xl bg-Corp2">
                    <tbody>
                      <tr>
                        <td className="p-3">Current Water Level</td>
                        <td className="p-3">
                          <input
                            id="waterLevel"
                            placeholder="# inches"
                            className="rounded-lg p-2 bg-Corp4 text-Corp1"
                            value={currentWaterLevel}
                            onChange={(event) =>
                              setCurrentWaterLevel(event.target.value)
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="p-3">Ideal Water Level</td>
                        <td className="p-3">
                          <input
                            id="idealLevel"
                            placeholder="# inches"
                            className="rounded-lg p-2 bg-Corp4 text-Corp1"
                            value={idealWaterLevel}
                            onChange={(event) =>
                              setIdealWaterLevel(event.target.value)
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="p-3">Water Threshold</td>
                        <td className="p-3">
                          <input
                            id="threshold"
                            placeholder="# inches"
                            className="rounded-lg p-2 bg-Corp4 text-Corp1"
                            value={threshold}
                            onChange={(event) =>
                              setThreshold(event.target.value)
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex flex-row gap-2">
                    <button
                      className="p-3 bg-Corp2 hover:bg-Corp3 transition-colors rounded-xl items-center"
                      onClick={() => {
                        setShowEdit(false);
                        setShowSettings(true);
                      }}
                    >
                      <p>Close</p>
                    </button>
                    <button
                      className="p-3 bg-green-500 hover:bg-green-300 text-Corp4 transition-colors rounded-xl items-center justify-between"
                      onClick={() => {
                        if (activeGate) {
                          updateGate(
                            fieldId ?? "",
                            activeGate.gateId,
                            +idealWaterLevel,
                            +threshold,
                            +currentWaterLevel,
                            activeGate.connectionError,
                            activeGate.lowBattery,
                            activeGate.status,
                            activeGate.location
                          );
                          setActiveGate(bareGate);
                          setShowEdit(false);
                          setRefetch(true);
                          setShowSettings(true);
                        }
                      }}
                    >
                      <p>Save Edits</p>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}
export default FieldGLMap;
