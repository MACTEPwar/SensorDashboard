var Device = /** @class */ (function () {
    function Device(serial, title) {
        this.Data = new Array();
        this.DataSort = new DataSort();
        this.Serial = serial;
        this.Title = title;
    }
    return Device;
}());
export { Device };
var Data = /** @class */ (function () {
    function Data(d, st, sv) {
        this.Datetime = d;
        this.SensorType = st;
        this.SensorValue = sv;
    }
    return Data;
}());
export { Data };
var DataSort = /** @class */ (function () {
    function DataSort() {
        this.Position = new Array();
        this.Temp1 = new Array();
        this.Temp2 = new Array();
        this.Temp3 = new Array();
        this.Speed = new Array();
        this.UpsStatus = new Array();
        this.Distance = new Array();
    }
    return DataSort;
}());
export { DataSort };
var DataValue = /** @class */ (function () {
    function DataValue(datetime, value) {
        this.DateTime = datetime;
        this.Value = value;
    }
    return DataValue;
}());
export { DataValue };
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.lng = x;
        this.lat = y;
    }
    return Point;
}());
export { Point };
//# sourceMappingURL=Device.js.map