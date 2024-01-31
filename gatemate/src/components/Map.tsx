import Map from 'react-map-gl';


function GLMap() {
    return (
        <div>
            <Map
                mapboxAccessToken={import.meta.env.VITE_MAP_BOX_KEY}
                mapLib={import('mapbox-gl')}
                initialViewState={{
                    longitude: -94.160583,
                    latitude: 36.061932,
                    zoom: 10,
                }}
                style={{ width: 1300, height: 650 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            />
        </div>
    )
}

export default GLMap