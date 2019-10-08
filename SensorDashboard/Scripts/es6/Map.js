export class Map {
    constructor() {
        this.currentMap = null;
        this.traceIsDisplayed = false;
    }

    init() {
        this.currentMap = new google.maps.Map(document.getElementById('map'), {
            center: { lng: 35.0163, lat: 48.4671 },
            zoom: 12
        });
    }

    setCurrentTrace(point_1, point_2) {
        if (this.traceIsDisplayed) selectedPath.setMap(null);

        let selectedPath = new google.maps.Polyline({
            path: [point_1, point_2],
            geodesic: true,
            strokeColor: '#5100f1',
            strokeOpacity: 1.0,
            strokeWeight: 8
        });

        selectedPath.setMap(this.currentMap);
    }
}