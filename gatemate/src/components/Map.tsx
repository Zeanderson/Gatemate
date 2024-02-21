import { Layer, Map, Marker, Source } from "react-map-gl";
import { useState } from "react";
import { Feature } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faPlus } from "@fortawesome/free-solid-svg-icons";

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

  const [addField, setAddField] = useState(false);
  const [fieldCords, setFieldCords] = useState<number[][]>([]);
  const [addedFields, setAddedFields] = useState<Feature[]>([
    testField1,
    testField2,
  ]);
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
                    window.location.href = `/field`;
                  }}
                >
                  <FontAwesomeIcon icon={faCheckSquare} size="4x" />
                </button>
              </Marker>
            </Source>
          );
        })}
      </Map>
      <div className="absolute top-4 right-4 border rounded-xl p-2 bg-Corp3 border-Corp2 text-Corp1 flex flex-col gap-2">
        <button
          className="hover:bg-Corp2 transition-colors rounded-xl p-4"
          onClick={() => {
            {
              addField
                ? setAddedFields([...addedFields, Field(fieldCords)])
                : setFieldCords([]);
            }
            setAddField(!addField);
          }}
        >
          {addField ? (
            <div className="flex flex-col gap-2">
              <p>Submit Field</p>
              {fieldCords.map((cord, index) => (
                <div key={index} className="flex flex-row gap-1 text-xs">
                  <p>Cord {index + 1}</p>
                  <p>{cord[0].toFixed(3)}</p>
                  <p>{cord[1].toFixed(3)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-row gap-2">
              <p>Add Field</p>
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default GLMap;
