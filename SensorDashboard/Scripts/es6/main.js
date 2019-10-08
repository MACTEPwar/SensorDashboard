import { Map } from './Map';
import { DeviceFactory } from "./DeviceFactory";

(function () {
    

    
}());

$(document).ready(function () {
    switch ($("div[data-view]").attr("data-view")) {
        case "dashboard.index": {
            dashboardIndex();
            break;
        }
    }
});

function dashboardIndex() {


    let map = new Map();
    map.init();

    let df = new DeviceFactory();
    df.refreshDevicesList();

    console.log(DeviceFactory.Devices);

    let searchButton;
    let playerRangeInput;
    let playerPlay;
    let playerPause;
    let btnOpenDeviceList;
}

