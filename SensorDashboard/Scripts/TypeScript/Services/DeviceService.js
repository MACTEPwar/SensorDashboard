import { Device, Data, Point, DataValue } from "../Models/Device.js";
import { FilterDataDevice } from "../Models/Filters/FilterDataDevice.js";
import { ChartService } from "../Services/ChartService.js";
import { Chart, ChartType } from "../Models/Chart.js";
/// <reference path="../../../node_modules/moment/moment.d.ts"/>
//import * as $ from "jquery";
/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>
var DeviceService = /** @class */ (function () {
    function DeviceService() {
    }
    DeviceService.refreshDevicesList = function () {
        DeviceService.Devices = new Array();
        $.ajax({
            url: "http://localhost:63005/api/devices",
            type: "GET",
            async: false,
            success: function (data) {
                var res = JSON.parse(data);
                res.forEach(function (device) {
                    DeviceService.Devices.push(new Device(device.Serial.toString(), device.Title));
                });
            },
            error: function (err) {
                console.log("error ajax: " + JSON.stringify(err, null, 4));
            },
            complete: function () {
            }
        }).done(function () {
        });
    };
    DeviceService.getDevices = function () {
        return DeviceService.Devices;
    };
    DeviceService.getCurrentDevice = function () {
        return DeviceService.currentDevice;
    };
    DeviceService.getDataForDeviceWithFilter = function (filter) {
        this.Devices.forEach(function (device) {
            //console.log(`${device.Serial} === ${filter.Serial} ? ${device.Serial === filter.Serial}`)
            if (device.Serial === filter.Serial) {
                DeviceService.currentDevice = device;
            }
        });
        if (DeviceService.currentDevice !== null) {
            $.ajax({
                async: false,
                url: "/Dashboard/GetDataForDeviceWithFilter",
                data: {
                    "filter.ValueIdContains": filter.Serial + ".temperature.28-00000ab161fc",
                    "filter.DateTimeBegin": filter.DateTimeBegin,
                    "filter.DateTimeFinish": filter.DateTimeFinish
                },
                type: "GET",
                success: function (response) {
                    //console.log(response);
                    response.forEach(function (data) {
                        var dat = new Data(data.datetime, data.valueid.slice(data.valueid.lastIndexOf(".") + 1), data.value);
                        var sensorType = data.valueid.slice(data.valueid.lastIndexOf(".") + 1);
                        var dataVal = null;
                        switch (sensorType) {
                            case "position": {
                                if (parseFloat(data.value[0].substring(0, data.value[0].indexOf(".") + 5)) > 1 && parseFloat(data.value[1].substring(0, data.value[1].indexOf(".") + 5)) > 1) {
                                    dataVal = new DataValue(data.datetime, new Point(parseFloat(data.value[1].substring(0, data.value[1].indexOf(".") + 5)), parseFloat(data.value[0].substring(0, data.value[0].indexOf(".") + 5))));
                                    DeviceService.currentDevice.DataSort.Position.push(dataVal);
                                }
                                break;
                            }
                            case "28-00000ab161fc": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.Temp1.push(dataVal);
                                break;
                            }
                            case "Temp2": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.Temp2.push(dataVal);
                                break;
                            }
                            case "Temp3": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.Temp3.push(dataVal);
                                break;
                            }
                            case "speed": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.Speed.push(dataVal);
                                break;
                            }
                            case "upsstatus": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.UpsStatus.push(dataVal);
                                break;
                            }
                            case "Distance": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.Distance.push(dataVal);
                                break;
                            }
                        }
                        DeviceService.currentDevice.Data.push(dat);
                    });
                },
                error: function (error) {
                    console.log("error " + error);
                }
            }).done(function () {
                //console.log(DeviceService.currentDevice.DataSort.Temp1);
                var data = [];
                DeviceService.currentDevice.DataSort.Temp1.forEach(function (d) {
                    //moment.unix(d.DateTime).format("dd.mm.yyyy HH:mm:ss")
                    data.push([new Date(d.DateTime * 1000).toISOString().slice(0, 19).replace('T', ' '), d.Value]);
                });
                var cs = new ChartService();
                var ch = new Chart(document.getElementById('regions_div'));
                ch.headers = ['Second', 'temperature'];
                ch.chartType = ChartType.LineChart;
                ch.data = data;
                //ch.options = {}
                ch.draw();
            });
            //this.buildDataForDeviceFromResponse(DeviceService.currentDevice.Data, DeviceService.currentDevice.DataSort);
        }
    };
    DeviceService.drawDiveces = function (selector) {
        $(selector).empty();
        DeviceService.Devices.forEach(function (device) {
            $(selector).append("<p class='deviceList__device' data-serial='" + device.Serial + "'>" + device.Title + "</p>");
        });
    };
    DeviceService.bindEvents = function (selectorDateBeetwen, selectorDateTo, map) {
        $(".deviceList__device").on('click', function () {
            DeviceService.refreshDevicesList();
            var filter = new FilterDataDevice();
            filter.Serial = $(this).attr("data-serial");
            if (selectorDateBeetwen.find("input").val().toString().length > 0 &&
                selectorDateTo.find("input").val().toString().length > 0 &&
                selectorDateBeetwen.find("input").val() !== undefined &&
                selectorDateTo.find("input").val() !== undefined) {
                filter.DateTimeBegin = selectorDateBeetwen.datetimepicker("viewDate").unix();
                filter.DateTimeFinish = selectorDateTo.datetimepicker("viewDate").unix();
            }
            DeviceService.getDataForDeviceWithFilter(filter);
            map.drawPath(DeviceService.getPositionsSort(DeviceService.currentDevice.DataSort.Position));
        });
    };
    DeviceService.getPositionsSort = function (positions) {
        var result = [];
        positions.forEach(function (pos) {
            result.push(pos.Value);
        });
        return result;
    };
    DeviceService.Devices = new Array();
    DeviceService.currentDevice = null;
    return DeviceService;
}());
export { DeviceService };
//# sourceMappingURL=DeviceService.js.map