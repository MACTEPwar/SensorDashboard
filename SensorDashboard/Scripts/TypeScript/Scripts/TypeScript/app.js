/// <reference path="../../node_modules/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.js"/>
import { MapService } from "./Services/MapService.js";
import { DeviceService } from "./Services/DeviceService.js";
window.onload = function () {
    /** кнопка показать/скрыть список устройств */
    var btnShowHideDeviceList = $("#btnDeviceList");
    /**Карта */
    var map = new MapService();
    map.init();
    DeviceService.refreshDevicesList();
    console.log($("#datetimepicker1").datepicker());
    btnShowHideDeviceList.on('click', function () {
        var deviceList = $("#deviceList");
        if (!deviceList.hasClass("Show")) {
            DeviceService.drawDiveces(deviceList);
            DeviceService.bindEvents($("#datetimepicker1"), $("#datetimepicker2"), map);
        }
        deviceList.toggle();
    });
};
//# sourceMappingURL=app.js.map