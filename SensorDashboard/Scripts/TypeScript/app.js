import { MapService } from "./Services/MapService.js";
import { DeviceService } from "./Services/DeviceService.js";
import { ChartService } from "./Services/ChartService.js";
import { Chart, ChartType } from "./Models/Chart.js";
window.onload = function () {
    /** кнопка показать/скрыть список устройств */
    var btnShowHideDeviceList = $("#btnDeviceList");
    /**Карта */
    var map = new MapService();
    map.init();
    initDatePicker();
    DeviceService.refreshDevicesList();
    btnShowHideDeviceList.on('click', function () {
        var deviceList = $("#deviceList");
        if (!deviceList.hasClass("Show")) {
            DeviceService.drawDiveces(deviceList);
            DeviceService.bindEvents($("#datetimepicker1"), $("#datetimepicker2"), map);
        }
        deviceList.toggle();
    });
    /** TEST */
    var cs = new ChartService();
    var ch = new Chart(document.getElementById('regions_div'));
    ch.headers = ['Second', 'Sales', 'Куку'];
    ch.chartType = ChartType.LineChart;
    ch.data = [['1570718585', 1000, 400], ['1570718587', 1170, 460], ['1570718586', 660, 1120], ['1570718589', 1030, 540]];
    //ch.options = {}
    //console.log("draw");
    ch.draw();
    /** END TEST */
};
/**Инициализирует все datetimepicker-ы с начальными настройками */
function initDatePicker() {
    $("div[id^=datetimepicker]").datetimepicker({
        locale: 'ru'
    });
}
//function initChart() {
//    (<any>google).charts.load('current', { 'packages': ['corechart'] });
//    (<any>google).charts.setOnLoadCallback(drawChart);
//    function drawChart() {
//        var data = (<any>google).visualization.arrayToDataTable([
//            ['Year', 'Sales', 'Expenses'],
//            ['2013', 1000, 400],
//            ['2014', 1170, 460],
//            ['2015', 660, 1120],
//            ['2016', 1030, 540]
//        ]);
//        var options = {
//            title: 'Company Performance',
//            hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
//            vAxis: { minValue: 0 }
//        };
//        var chart = new (<any>google).visualization.AreaChart(document.getElementById('regions_div'));
//        chart.draw(data, options);
//    }
//}
//# sourceMappingURL=app.js.map