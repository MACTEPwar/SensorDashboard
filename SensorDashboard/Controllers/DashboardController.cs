using Newtonsoft.Json;
using SensorDashboard.Models;
using SensorDashboard.Models.Filters;
using SensorDashboard.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace SensorDashboard.Controllers
{
    public class DashboardController : Controller
    {

        private readonly DeviceService deviceService = null;
        private readonly DataService dataService = null;

        public DashboardController()
        {
            deviceService = new DeviceService();
            dataService = new DataService();
        }

        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult GetDeviceList()
        {
            var devices = deviceService.ReadByFilter(new FilterDevice());
            return PartialView("PartialCarList", devices);
        }

        [HttpGet]
        public ContentResult GetDataForDeviceWithFilter(FilterData filter)
        {
            //HttpWebRequest request = (HttpWebRequest)WebRequest.Create($"http://demo2005402.mockable.io/car/{filter.DeviceSerial}");
            //HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            //StreamReader sr = new StreamReader(response.GetResponseStream());
            //string resp = sr.ReadToEnd();

            //JavaScriptSerializer json_serializer = new JavaScriptSerializer();
            //var locations = JsonConvert.DeserializeObject<List<DataLocation>>(resp);

            //if (filter.DateTimeBegin != null && filter.DateTimeFinish != null)
            //{
            //    locations = locations.Where(l => l.DateTime >= filter.DateTimeBegin && l.DateTime < filter.DateTimeFinish).ToList();
            //}

            //return Json(locations, JsonRequestBehavior.AllowGet);


            //var res = dataService.ReadByFilter(filter);
            //return Json(res, JsonRequestBehavior.AllowGet);

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            var resultData = dataService.ReadByFilter(filter);
            var result = new ContentResult
            {
                Content = serializer.Serialize(resultData),
                ContentType = "application/json"
            };
            return result;

        }

        [HttpGet]
        public JsonResult Test()
        {
            var res = dataService.ReadByFilter(new FilterData() { ValueIdContains = "8888" });
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}