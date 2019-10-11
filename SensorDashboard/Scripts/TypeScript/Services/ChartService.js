////import { Chart } from "../../../node_modules/react-google-charts/dist/index.d.ts";
///// <reference path="../../../node_modules/react-google-charts/dist/index.d.ts""/>
/** Сервис управленя графиками */
var ChartService = /** @class */ (function () {
    function ChartService() {
        var _this = this;
        this.instance = false;
        this.coreLoaded = false;
        this.instance = true;
        google.charts.load('current', { 'packages': ['corechart'] });
        google.setOnLoadCallback(function () {
            _this.instance = true;
        });
    }
    ChartService.prototype.addChart = function (chart) {
        if (this.instance) {
            while (!this.coreLoaded) {
                console.log("chart core not loaded, wait please...");
            }
        }
        ChartService.charts.push(chart);
    };
    ChartService.prototype.dropChart = function (id) {
        for (var i = 0; i < ChartService.charts.length; i++) {
            if (ChartService.charts[i].id === id) {
                ChartService.charts.splice(i, 1);
            }
        }
    };
    ChartService.prototype.getCharts = function () {
        return ChartService.charts;
    };
    ChartService.prototype.refreshRenderCharts = function (selector) {
        for (var i = 0; i < ChartService.charts.length; i++) {
        }
    };
    ChartService.testChart = function (selector) {
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['s', 'Sales', 'Expenses'],
                ['2013', 1000, 400],
                ['2014', 1170, 460],
                ['2015', 660, 1120],
                ['2016', 1030, 540]
            ]);
            var options = {
                title: 'Company Performance',
                hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                vAxis: { minValue: 0 }
            };
            var chart = new google.visualization.AreaChart(document.getElementById('regions_div'));
            chart.draw(data, options);
        }
    };
    ChartService.charts = new Array();
    return ChartService;
}());
export { ChartService };
//# sourceMappingURL=ChartService.js.map