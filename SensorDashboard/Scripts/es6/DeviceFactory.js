import { Device } from "./Device";

export class DeviceFactory {
    // Обновляет список устройств
    refreshDevicesList() {
        console.log("refreshDevicesList()");
        $.ajax({
            url: "http://localhost:63005/api/devices",
            type: "GET",
            success: function (data) {
                let res = JSON.parse(data);
                res.forEach(device => {
                    DeviceFactory.Devices.push(new Device(device.Title,device.Serial));
                });
            },
            error: function (err) {
                console.log(`error ajax: ${JSON.stringify(err, null, 4)}`);
            },
            complete: function () {

            }
        });
    }

    // Рисует список устройств в родителе
    drawAll(selector) {
        DeviceFactory.Devices.forEach(device => {
            let s = device;
        });
    }
}

DeviceFactory.Devices = [];