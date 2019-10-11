/// <reference path="../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Point } from "../Models/Device.js";
var MapService = /** @class */ (function () {
    function MapService() {
        this.currentMap = null;
        this.currentflightPath = null;
        this.traceIsDisplayed = false;
    }
    /**
     * Инициализирует кату
     * @param cetered Точка центрирования
     * @param zoom Zoom
     */
    MapService.prototype.init = function (cetered, zoom) {
        if (cetered === void 0) { cetered = new Point(35.0163, 48.4671); }
        if (zoom === void 0) { zoom = 12; }
        this.currentMap = new google.maps.Map(document.getElementById('map'), {
            center: cetered,
            zoom: zoom
        });
    };
    MapService.prototype.drawPath = function (path) {
        if (this.currentflightPath !== null) {
            this.currentflightPath.setMap(null);
        }
        this.currentflightPath = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 8
        });
        this.currentflightPath.setMap(this.currentMap);
    };
    //addBtnDeviceList() {
    //    $(".gmnoprint:last").prepend('<div class="gm-style-mtc blabla" style="float: left; position: relative;"><div role="button" id="btnDeviceList" tabindex="0" title="Показать карту с названиями объектов" aria-label="Показать карту с названиями объектов" aria-pressed="true" draggable="false" style="direction: ltr; overflow: hidden; text-align: center; height: 40px; display: table-cell; vertical-align: middle; position: relative; color: white; font-family: Roboto, Arial, sans-serif; user-select: none; font-size: 18px; background-color: #000000c7; padding: 0px 17px; border-bottom-left-radius: 2px; border-top-left-radius: 2px; background-clip: padding-box; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; min-width: 50px; font-weight: 500;"><i class="fa fa-truck"></i></div><div style="background-color: white; z-index: -1; padding: 2px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; position: absolute; left: 0px; top: 40px; text-align: left; display: none;"><div draggable="false" title="Показать карту рельефа с названиями объектов" style="color: white; font-family: Roboto, Arial, sans-serif; user-select: none; font-size: 18px; background-color: #000000c7; padding: 5px 8px 5px 5px; direction: ltr; text-align: left; white-space: nowrap;"><span role="checkbox" style="vertical-align: middle;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%203H5c-1.11%200-2%20.9-2%202v14c0%201.1.89%202%202%202h14c1.11%200%202-.9%202-2V5c0-1.1-.89-2-2-2zm-9%2014l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22%2F%3E%0A%3C%2Fsvg%3E%0A" style="height: 1em; width: 1em; transform: translateY(0.15em); display: none;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%205v14H5V5h14m0-2H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2z%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%0A%3C%2Fsvg%3E%0A" style="height: 1em; width: 1em; transform: translateY(0.15em);"></span><label style="vertical-align: middle; cursor: pointer;">Рельеф</label></div></div></div>');
    //}
    /**
    * Рисует маркер на карте.
    * @param location Точка для маркера
    */
    MapService.prototype.drawMarker = function (location) {
        //TODO draw marker with location (p1,p2)
    };
    return MapService;
}());
export { MapService };
//# sourceMappingURL=MapService.js.map