export enum ChartType {
    AreaChart,
    LineChart
}

export class Chart {
    /** Селектор (jQuery) для отрисовки графика */
    selector: HTMLElement;
    /** Идентификатор */
    id: string;

    chartType: ChartType = ChartType.AreaChart;

    chart: any = null;
    options: any = null;
    headers: Array<string>
    data: Array<Array<string | number>> = new Array<Array<string | number>>();
    private dataBuild: any;

    constructor(selector: HTMLElement) {
        this.selector = selector;
        (<any>google).setOnLoadCallback(() => {
            switch (this.chartType) {
                case ChartType.AreaChart: {
                    this.chart = new (<any>google).visualization.AreaChart(selector);
                    break;
                }
                case ChartType.LineChart: {
                    this.chart = new (<any>google).visualization.LineChart(selector);
                    break;
                }
                default: {
                    this.chart = new (<any>google).visualization.AreaChart(selector);
                }
            }
            
        });
    }

    draw() {
        (<any>google).setOnLoadCallback(() => {
            if (this.chart !== null) {
                this.buildData();
                this.chart.draw(this.dataBuild, this.options)
            }
        });
    }

    private buildData() {
        this.data.unshift(this.headers);
        this.dataBuild = (<any>google).visualization.arrayToDataTable(this.data);
    }

}