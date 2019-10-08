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
    [System.Web.Http.Route("api/devices")]
    public class DevicesController : ApiController
    {
        private readonly DeviceService deviceService = null;
        private readonly DataService dataService = null;

        public DevicesController()
        {
            deviceService = new DeviceService();
            dataService = new DataService();
        }

        [System.Web.Http.HttpGet]
        public string Index()
        {
            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            var devices = deviceService.ReadByFilter(new FilterDevice());
            return serializer.Serialize(devices);
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/devices/{serial}")]
        public string Details(string serial)
        {
            return serial;
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/devices/test")]
        public string test() => "Ok";
    }
}
