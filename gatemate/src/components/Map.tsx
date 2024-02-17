import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheatAwn } from "@fortawesome/free-solid-svg-icons";

//TODO Make the Markers a new component with props for (longitude, latitude, field name, field color)
//TODO make ability to add markers to map

function GLMap() {
  return (
    <div>
      <Map
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

        <Marker
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
        </Marker>
      </Map>
    </div>
  );
}

export default GLMap;
