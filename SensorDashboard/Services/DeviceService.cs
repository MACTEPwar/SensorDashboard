using SensorDashboard.Infrastructure;
using SensorDashboard.Models;
using SensorDashboard.Models.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SensorDashboard.Services
{
    public class DeviceService
    {
        public List<Device> GetDeviceList()
        {
            string query = "select * from device";

            var a = DataContext.Query<Device>(query);

            return a;
        }
    //    public List<Device> ReadByFilter(FilterDevice filter)
    //    {
    //        var resQuery = DataContext.Query("SELECT * FROM device");
    //        return ListObjects2ListDevice(resQuery);
    //    }

    //    private List<Device> ListObjects2ListDevice(List<List<ObjectCell>> objects)
    //    {
    //        List<Device> devices = new List<Device>();

    //        foreach (var device in objects)
    //        {
    //            Device dev = new Device();
    //            try
    //            {
    //                dev.Serial = Convert.ToInt32(device.Where(c => c.Title == "serial").FirstOrDefault().Value);
    //                dev.Title = device.Where(c => c.Title == "title").FirstOrDefault().Value.ToString();
    //            }
    //            catch (Exception e)
    //            {

    //            }
    //            devices.Add(dev);
    //        }

    //        return devices;
    //    }

    //    private List<Dictionary<string, object>> ListObjects2ListDevice2(List<List<ObjectCell>> objects)
    //    {
    //        List<Dictionary<string, object>> dict = new List<Dictionary<string, object>>();
    //        foreach (var row in objects)
    //        {
    //            Dictionary<string, object> temp_dict = new Dictionary<string, object>();
    //            foreach (var cell in row)
    //            {
    //                temp_dict.Add(cell.Title, cell.Value.ToString().Split(','));
    //            }
    //            dict.Add(temp_dict);
    //        }

    //        return dict;
    //    }
    }
}