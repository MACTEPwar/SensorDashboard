using SensorDashboard.Infrastructure;
using SensorDashboard.Models;
using SensorDashboard.Models.Filters;
using SensorDashboard.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace SensorDashboard.Controllers.api
{
    //[System.Web.Http.Route("api/devices")]
    public class DevicesController : ApiController
    {
        private readonly DeviceService deviceService = null;
        private readonly DataService dataService = null;

        public DevicesController()
        {
            deviceService = new DeviceService();
            dataService = new DataService();
        }

        /// <summary>
        /// Получает последние позиции всех устройств 
        /// </summary>
        /// <returns>Списко модели, последнй позиции и даты</returns>
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/devices/GetLastPositionFromDevices")]
        public IEnumerable<Data> GetLastPositionFromDevices()
        {
            return this.dataService.GetLastPositionFromDevices();
        }

        /// <summary>
        /// Получает список всех устройств
        /// </summary>
        /// <returns>Список устрйоств</returns>
        [System.Web.Http.HttpGet]
        public IEnumerable<Device> Index()
        {
            return deviceService.GetDeviceList();
        }      

        /// <summary>
        /// Получает информацию с датчиков
        /// </summary>
        /// <param name="serial">Серийный номер устройства</param>
        /// <param name="sensor">Серийный номер датчика</param>
        /// <param name="filter">Фильтр</param>
        /// <returns>Список данных с датчика</returns>
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/devices/GetDataFromSensor/{serial}/{sensor}")]
        public IEnumerable<object> GetDataFromSensor([FromUri]string serial, [FromUri] string sensor, [FromBody]FilterData filter)
        {
            return dataService.GetDataFromSensor(serial, filter.DateTimeBegin ?? 0, filter.DateTimeFinish ?? DateTime.Now.ToUnixTime(), sensor);
        }

        /// <summary>
        /// Получает количество данных по датчику
        /// </summary>
        /// <param name="serial">Серийный номер устройства</param>
        /// <param name="sensor">Серийный номер датчика</param>
        /// <param name="filter">Фильтр</param>
        /// <returns>Количество данных</returns>
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/devices/GetCountDataFromSensor/{serial}/{sensor}")]
        public int GetCountDataFromSensor([FromUri]string serial, [FromUri] string sensor, [FromBody]FilterData filter)
        {
            var s = dataService.GetCountDataFromSensor(serial, filter.DateTimeBegin ?? 0, filter.DateTimeFinish ?? DateTime.Now.ToUnixTime(), sensor);
            return s;
        }

        /// <summary>
        /// Получает последние данные с датчиков
        /// </summary>
        /// <param name="serial">Серийный номер устройства</param>
        /// <param name="datetime">До какого времени искать (если null, то берется до текущего момента)</param>
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/devices/GetLastDataFromSensors/{serial}")]
        public IEnumerable<Data> GetLastDataFromSensors([FromUri] string serial, [FromBody] object datetime)
        {
            int _datetime; 
            return dataService.GetLastDataFromSensors(serial, int.TryParse(datetime.ToString(), out _datetime)? _datetime:(int?)null);
        }
    }
}
