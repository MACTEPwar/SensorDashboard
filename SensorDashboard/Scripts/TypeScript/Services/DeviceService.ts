import { Device,Data, DataSort, Point, DataValue } from "../Models/Device.js";
import { FilterDataDevice } from "../Models/Filters/FilterDataDevice.js"
//import * as $ from "jquery";
/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>


export class DeviceService {
    static Devices: Device[] = new Array();
    static currentDevice: Device = null;

    constructor() {

    }

    static refreshDevicesList() {
        DeviceService.Devices = new Array();
        $.ajax({
            url: "http://localhost:63005/api/devices",
            type: "GET",
            async: false,
            success: function (data) {
                let res = JSON.parse(data);
                res.forEach(device => {
                    DeviceService.Devices.push(new Device(device.Serial.toString(), device.Title));
                    
                });
            },
            error: function (err) {
                console.log(`error ajax: ${JSON.stringify(err, null, 4)}`);
            },
            complete: function () {
                
            }
        }).done(function () {
        });
        
    }

    static getDevices() {
        return DeviceService.Devices;
    }

    static getCurrentDevice() {
        return DeviceService.currentDevice;
    }

    static getDataForDeviceWithFilter(filter: FilterDataDevice) {
        this.Devices.forEach(device => {
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
                    "filter.ValueIdContains": filter.Serial,
                    "filter.DateTimeBegin": filter.DateTimeBegin,
                    "filter.DateTimeFinish": filter.DateTimeFinish

                },
                type: "GET",
                success: function (response) {
                    response.forEach(data => {
                        let dat: Data = new Data(data.datetime, data.valueid.slice(data.valueid.lastIndexOf(".") + 1), data.value);

                        let sensorType = data.valueid.slice(data.valueid.lastIndexOf(".") + 1);

                        let dataVal: DataValue = null;

                        switch (sensorType) {
                            case "position": {
                                if (parseFloat(data.value[0].substring(0, data.value[0].indexOf(".") + 5)) > 1 && parseFloat(data.value[1].substring(0, data.value[1].indexOf(".") + 5)) > 1) {
                                    dataVal = new DataValue(data.datetime, new Point(parseFloat(data.value[1].substring(0, data.value[1].indexOf(".") + 5)), parseFloat(data.value[0].substring(0, data.value[0].indexOf(".") + 5))));
                                    DeviceService.currentDevice.DataSort.Position.push(dataVal);
                                }
                                break;
                            }
                            case "Temp1": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.Temp1.push(dataVal);
                                break
                            }
                            case "Temp2": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.Temp2.push(dataVal);
                                break
                            }
                            case "Temp3": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.Temp3.push(dataVal);
                                break
                            }
                            case "speed": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.Speed.push(dataVal);
                                break
                            }
                            case "upsstatus": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.UpsStatus.push(dataVal);
                                break
                            }
                            case "Distance": {
                                dataVal = new DataValue(data.datetime, parseFloat(data.value[0]));
                                DeviceService.currentDevice.DataSort.Distance.push(dataVal);
                                break
                            }
                        }
                        
                        DeviceService.currentDevice.Data.push(dat);
                    });
                },
                error: function (error) {
                    console.log(`error ${error}`);
                }
            }).done(() => {
                
            });
            //this.buildDataForDeviceFromResponse(DeviceService.currentDevice.Data, DeviceService.currentDevice.DataSort);
        }
    }

    static drawDiveces(selector: any) {
        $(selector).empty();
        DeviceService.Devices.forEach(device => {
            $(selector).append(`<p class='deviceList__device' data-serial='${device.Serial}'>${device.Title}</p>`);
        });
    }

    static bindEvents(selectorDateBeetwen,selectorDateTo,map) {
        $(".deviceList__device").on('click', function () {
            DeviceService.refreshDevicesList();
            let filter: FilterDataDevice = new FilterDataDevice();
            filter.Serial = $(this).attr("data-serial");
            if (selectorDateBeetwen.find("input").val().toString().length > 0 && 
                selectorDateTo.find("input").val().toString().length > 0 &&
                selectorDateBeetwen.find("input").val() !== undefined &&
                selectorDateTo.find("input").val() !== undefined 
                ) {
                filter.DateTimeBegin = <any>selectorDateBeetwen.datetimepicker("viewDate").unix();
                filter.DateTimeFinish = <any>selectorDateTo.datetimepicker("viewDate").unix();
            }
            DeviceService.getDataForDeviceWithFilter(filter);
            map.drawPath(DeviceService.getPositionsSort(DeviceService.currentDevice.DataSort.Position));
        });
    }

    static getPositionsSort(positions) {
        let result = [];
        positions.forEach(pos => {
            result.push(pos.Value);
        });
        return result;
    }

    //private static buildDataForDeviceFromResponse(response: Array<Data>, dataSort: Array<DataSort>) {
    //    dataSort.forEach(d => {
    //        d.Temp1 = parseFloat(this.findValueBySensor(response, "Temp1", d.Datetime));
    //        d.Temp2 = parseFloat(this.findValueBySensor(response, "Temp2", d.Datetime));
    //        d.Temp3 = parseFloat(this.findValueBySensor(response, "Temp3", d.Datetime));
    //        d.Speed = parseFloat(this.findValueBySensor(response, "speed", d.Datetime));
    //        d.Distance = parseFloat(this.findValueBySensor(response, "Distance", d.Datetime));
    //        d.UpsStatus = parseFloat(this.findValueBySensor(response, "upsstatus", d.Datetime));
    //    });
    //}

    //private static findValueBySensor(array: Array<Data>, sensorType: string, datetime: number): string {
    //    for (let i = 0; i < array.length; i += 1) {
    //        if (array[i].Datetime === datetime && array[i].SensorType == sensorType) {
    //            return array[i].SensorValue.toString();
    //        }
    //    }

    //}

    //responseToDeviceArray(response: any) {
    //    response.forEach(res => {
    //        let d: Device = new Device();
            
    //    });
    //}
}