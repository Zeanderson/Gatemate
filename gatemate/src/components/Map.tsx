import { Layer, Map, Marker } from "react-map-gl";
import { useState } from "react";
import { Feature } from "geojson";
import { Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWheatAwn } from "@fortawesome/free-solid-svg-icons";

function GLMap() {
  const [cord1, setcord1] = useState([0, 0]);
  const [addCord1, setAddCord1] = useState(false);
  const [cord2, setcord2] = useState([0, 0]);
  const [addCord2, setAddCord2] = useState(false);
  const [cord3, setcord3] = useState([0, 0]);
  const [addCord3, setAddCord3] = useState(false);
  const [cord4, setcord4] = useState([0, 0]);
  const [addCord4, setAddCord4] = useState(false);

  const geojson: Feature = {
    type: "Feature",
    properties: {}, // Empty properties object
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-94.17025058399322, 32.06181540184127],
          [-94.17023760738029, 32.061837396572145],
          [-94.16909566543113, 32.06323405113177],
          [-94.16450194440866, 32.06096310195936],
        ],
      ],
    },
  };

  return (
    <div className="relative">
      <Map
        onClick={(e) => {
          addCord1
            ? (setcord1([e.lngLat.lng, e.lngLat.lat]), setAddCord1(false))
            : null;
          addCord2
            ? (setcord2([e.lngLat.lng, e.lngLat.lat]), setAddCord2(false))
            : null;
          addCord3
            ? (setcord3([e.lngLat.lng, e.lngLat.lat]), setAddCord3(false))
            : null;
          addCord4
            ? (setcord4([e.lngLat.lng, e.lngLat.lat]), setAddCord4(false))
            : null;
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
        {/*//! This is how you add the polygon! */}
        {/* <Source type="geojson" data={geojson}>
          <Layer
            id="polygon"
            type="fill"
            paint={{
              "fill-color": "#088",
              "fill-opacity": 0.8,
            }}
          ></Layer>
        </Source> */}

        <Marker
          style={{ position: "absolute" }}
          longitude={-94.160583}
          latitude={32.061932}
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-xl text-black font-Arvo">Field 1</h1>
            <button
              className="text-green-500"
              onClick={() => (window.location.href = "/field")}
            >
              <FontAwesomeIcon icon={faWheatAwn} size="4x" />
            </button>
          </div>
        </Marker>
      </Map>
      <div className="absolute top-4 right-4 border rounded-xl p-2 bg-Corp3 border-Corp2 text-Corp1 flex flex-col gap-2">
        <div className="flex flex-row gap-1 items-center">
          <p>Cord 1</p>
          <button
            className="hover:bg-Corp2 transition-colors rounded-xl p-0.5"
            onClick={() => {
              setAddCord1(!addCord1);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <p>{cord1[0].toFixed(5)}</p>
          <p>{cord1[1].toFixed(5)}</p>
        </div>

        <div className="flex flex-row gap-1 items-center">
          <p>Cord 2</p>
          <button
            className="hover:bg-Corp2 transition-colors rounded-xl p-0.5"
            onClick={() => {
              setAddCord2(!addCord2);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <p>{cord2[0].toFixed(5)}</p>
          <p>{cord2[1].toFixed(5)}</p>
        </div>

        <div className="flex flex-row gap-1 items-center">
          <p>Cord 3</p>
          <button
            className="hover:bg-Corp2 transition-colors rounded-xl p-0.5"
            onClick={() => {
              setAddCord3(!addCord3);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <p>{cord3[0].toFixed(5)}</p>
          <p>{cord3[1].toFixed(5)}</p>
        </div>

        <div className="flex flex-row gap-1 items-center">
          <p>Cord 4</p>
          <button
            className="hover:bg-Corp2 transition-colors rounded-xl p-0.5"
            onClick={() => {
              setAddCord4(!addCord4);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <p>{cord4[0].toFixed(5)}</p>
          <p>{cord4[1].toFixed(5)}</p>
        </div>

        <button className="hover:bg-Corp2 transition-colors rounded-xl flex flex-row gap-2 items-center p-1 justify-center">
          <p>Add Field</p>
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
      </div>
    </div>
  );
}

export default GLMap;

{
  /* <Marker
          style={{ position: "absolute" }}
          longitude={-94.170583}
          latitude={32.063932}
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-xl text-black font-Arvo">Field 2</h1>
            <button
              className="text-yellow-500"
              onClick={() => (window.location.href = "/field")}
            >
              <FontAwesomeIcon icon={faWheatAwn} size="4x" />
            </button>
          </div>
        </Marker>

        <Marker
          style={{ position: "absolute" }}
          longitude={-94.150583}
          latitude={32.062932}
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-xl text-black font-Arvo">Field 3</h1>
            <button
              className="text-red-500"
              onClick={() => (window.location.href = "/field")}
            >
              <FontAwesomeIcon icon={faWheatAwn} size="4x" />
            </button>
          </div>
        </Marker> */
}
