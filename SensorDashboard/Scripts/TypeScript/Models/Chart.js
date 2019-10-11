export var ChartType;
(function (ChartType) {
    ChartType[ChartType["AreaChart"] = 0] = "AreaChart";
    ChartType[ChartType["LineChart"] = 1] = "LineChart";
})(ChartType || (ChartType = {}));
var Chart = /** @class */ (function () {
    function Chart(selector) {
        var _this = this;
        this.chartType = ChartType.AreaChart;
        this.chart = null;
        this.options = null;
        this.data = new Array();
        this.selector = selector;
        google.setOnLoadCallback(function () {
            switch (_this.chartType) {
                case ChartType.AreaChart: {
                    _this.chart = new google.visualization.AreaChart(selector);
                    break;
                }
                case ChartType.LineChart: {
                    _this.chart = new google.visualization.LineChart(selector);
                    break;
                }
                default: {
                    _this.chart = new google.visualization.AreaChart(selector);
                }
            }
        });
    }
    Chart.prototype.draw = function () {
        var _this = this;
        google.setOnLoadCallback(function () {
            if (_this.chart !== null) {
                _this.buildData();
                _this.chart.draw(_this.dataBuild, _this.options);
            }
        });
    };
    Chart.prototype.buildData = function () {
        this.data.unshift(this.headers);
        this.dataBuild = google.visualization.arrayToDataTable(this.data);
    };
    return Chart;
}());
export { Chart };
//# sourceMappingURL=Chart.js.map