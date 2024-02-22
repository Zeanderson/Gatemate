import { Layer, Map, Marker, Source } from "react-map-gl";
import { useState } from "react";
import { Feature } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCircleXmark,
  faDoorOpen,
  faLink,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

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

function GLMap() {
  //
  const testField1 = Field([
    [-94.178, 32.069],
    [-94.174, 32.064],
    [-94.165, 32.064],
    [-94.164, 32.068],
    [-94.171, 32.072],
  ]);
  const testField2 = Field([
    [-94.153, 32.081],
    [-94.155, 32.079],
    [-94.159, 32.077],
    [-94.155, 32.072],
    [-94.149, 32.074],
    [-94.15, 32.079],
  ]);
  //

  const [showSettings, setShowSettings] = useState(false);
  const [addField, setAddField] = useState(false);
  const [fieldCords, setFieldCords] = useState<number[][]>([]);
  const [addedFields, setAddedFields] = useState<Feature[]>([
    testField1,
    testField2,
  ]);
  const [activeField, setActiveField] = useState<Feature | null>(null);
  return (
    <div className="relative">
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
        {addedFields.map((field, index) => {
          // Accessing the coordinates of the polygon
          const coordinates = (field.geometry as any).coordinates[0];

          // Calculating the centroid of the polygon
          let centroidX = 0;
          let centroidY = 0;
          for (let i = 0; i < coordinates.length; i++) {
            centroidX += coordinates[i][0];
            centroidY += coordinates[i][1];
          }
          centroidX /= coordinates.length;
          centroidY /= coordinates.length;

          return (
            <Source type="geojson" data={field} key={index}>
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
                longitude={centroidX}
                latitude={centroidY}
              >
                <h1 className="text-xl text-black font-Arvo">{`Field ${
                  index + 1
                }`}</h1>
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
              <div className="bg-Corp1 rounded-full h-4 w-4"></div>
            </Marker>
          );
        })}
      </Map>
      <div className="absolute top-4 right-4 border rounded-xl p-2 bg-Corp3 border-Corp2 text-Corp1 flex flex-col gap-2">
        {addField ? (
          <div className="flex flex-col items-center">
            <div className="flex flex-row gap-2 items-center">
              <button
                className="hover:border-Corp3 hover:bg-Corp2 transition-colors rounded-xl p-2"
                onClick={() => {
                  fieldCords.length < 1
                    ? setAddField(!addField)
                    : setAddedFields([...addedFields, Field(fieldCords)]),
                    setFieldCords([]),
                    setAddField(!addField);
                }}
              >
                <p>Submit Field</p>
              </button>
              <button
                className="hover:text-Corp2"
                onClick={() => {
                  setFieldCords([]);
                  setAddField(!addField);
                }}
              >
                <FontAwesomeIcon icon={faCircleXmark} size="lg" />
              </button>
            </div>

            <table>
              {fieldCords.map((cord, index) => (
                <tr key={index} className="text-xs border border-white">
                  <td className="p-1 border border-white">Cord {index + 1}</td>
                  <td className="p-1">{cord[0].toFixed(3)}</td>
                  <td className="p-1">{cord[1].toFixed(3)}</td>
                </tr>
              ))}
            </table>
          </div>
        ) : (
          <button
            className="flex flex-row gap-2 items-center hover:border-Corp3 hover:bg-Corp2 transition-colors rounded-xl p-3"
            onClick={() => {
              {
                addField
                  ? setAddedFields([...addedFields, Field(fieldCords)])
                  : setFieldCords([]);
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
                    window.location.href = "/field";
                  }}
                >
                  <p>Field Dashboard</p>
                  <FontAwesomeIcon icon={faLink} size="xl" />
                </button>

                <button
                  className="flex flex-row gap-2 p-3 bg-Corp2 hover:bg-Corp4 transition-colors rounded-xl items-center justify-between"
                  onClick={() => {
                    if (activeField) {
                      addedFields.splice(addedFields.indexOf(activeField), 1);
                      setActiveField(null);
                      setShowSettings(false);
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
                  setActiveField(null);
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

export default GLMap;
