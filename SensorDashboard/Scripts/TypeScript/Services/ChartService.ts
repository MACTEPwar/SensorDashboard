import { Chart as _Chart } from "../Models/Chart.js"
////import { Chart } from "../../../node_modules/react-google-charts/dist/index.d.ts";
///// <reference path="../../../node_modules/react-google-charts/dist/index.d.ts""/>

/** Сервис управленя графиками */
export class ChartService {
    private static charts: Array<_Chart> = new Array<_Chart>();
    instance: boolean = false;
    coreLoaded: boolean = false;

    constructor() {
        this.instance = true;
        (<any>google).charts.load('current', { 'packages': ['corechart'] });
        (<any>google).setOnLoadCallback(() => {
            this.instance = true;
        });
    }

    addChart(chart: _Chart) {
        if (this.instance) {
            while (!this.coreLoaded) {
                console.log(`chart core not loaded, wait please...`);
            }
            
        }

        ChartService.charts.push(chart);
    }

    dropChart(id: string) {
        for (let i = 0; i < ChartService.charts.length; i++) {
            if (ChartService.charts[i].id === id) {
                ChartService.charts.splice(i, 1);
            }
        }
    }

    getCharts(): Array<_Chart> {
        return ChartService.charts;
    }

    refreshRenderCharts(selector) {
        for (let i = 0; i < ChartService.charts.length; i++) {

        }
    }

    static testChart(selector) {
        
        function drawChart() {
            var data = (<any>google).visualization.arrayToDataTable([
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

            var chart = new (<any>google).visualization.AreaChart(document.getElementById('regions_div'));
            chart.draw(data, options);
        }
    }
}