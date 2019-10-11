export class Device {
    Serial: string;
    Title: string;

    Data: Array<Data> = new Array<Data>();
    DataSort: DataSort = new DataSort();

    constructor(serial: string, title: string) {
        this.Serial = serial;
        this.Title = title;
    }
}

export class Data {
    Datetime: number;
    SensorType: string;
    SensorValue: string | Point;

    constructor(d: number, st: string, sv: string | Point) {
        this.Datetime = d;
        this.SensorType = st;
        this.SensorValue = sv;
    }
}

export class DataSort {
    Position: Array<DataValue> = new Array<DataValue>();
    Temp1: Array<DataValue> = new Array<DataValue>();
    Temp2: Array<DataValue> = new Array<DataValue>();
    Temp3: Array<DataValue> = new Array<DataValue>();
    Speed: Array<DataValue> = new Array<DataValue>();
    UpsStatus: Array<DataValue> = new Array<DataValue>();
    Distance: Array<DataValue> = new Array<DataValue>();
}

export class DataValue {
    DateTime: number;
    Value: number | Point;

    constructor(datetime: number, value: number | Point) {
        this.DateTime = datetime;
        this.Value = value;
    }
}

export class Point {
    lng: number;
    lat: number;

    constructor(x: number, y: number) {
        this.lng = x;
        this.lat = y;
    }
}

