using SensorDashboard.Infrastructure;
using SensorDashboard.Models;
using SensorDashboard.Models.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SensorDashboard.Services
{
    public class DataService
    {
        public IEnumerable<Data> GetLastPositionFromDevices()
        {
            string query =
                "select groupArray(datetime)[-1] as datetime,valueid,groupArray(value)[-1] as value " +
                "from data " +
                "where valueid in (" +
                    "select format('{0}.{1}',device_id,sensor_id) " +
                    "from sensor " +
                    "where type in (" +
                        "select sensor_type_id " +
                        "from sensor_type " +
                        "where type like 'position' limit 1" +
                    ")" +
                ") " +
                "group by valueid";

            return DataContext.Query<Data>(query);
        }


        public IEnumerable<object> GetDataFromSensor(string device_id, int datetime_between, int date_time_to, string sensor)
        {
            string query =
                "select datetime,valueid,value " +
                "from data " +
                "where valueid in (" +
                    "select format('{0}.{1}',device_id,sensor_id) " +
                    "from sensor " +
                    "where type in (" +
                        "select sensor_type_id from sensor_type ";
            if (sensor != "all")
            {
                query += "where type like '" + sensor + "' limit 1";
            }
            query +=
                    ") and device_id like '" + device_id + "'" +
                ") and datetime >= " + datetime_between.ToString() + " and datetime <= " + date_time_to.ToString() +
                " order by datetime";

            var s = DataContext.Query<Data>(query);
            return s;
        }

        public int GetCountDataFromSensor(string device_id, int datetime_between, int datetime_to, string sensor)
        {
            return this.GetDataFromSensor(device_id, datetime_between, datetime_to, sensor).Count();
        }

        public IEnumerable<Data> GetLastDataFromSensors(string serial, int? datetime_to)
        {
            string query =
                "select groupArray(datetime)[-1] as datetime,valueid,groupArray(value)[-1] as value " +
                "from data as d where valueid in (" +
                    "select format('{0}.{1}',device_id,sensor_id) " +
                    "from sensor where type in (" +
                        "select sensor_type_id " +
                        "from sensor_type" +
                    ") and device_id like '" + serial + "'" +
                ") and d.datetime <= " + (datetime_to ?? DateTime.Now.ToUnixTime()).ToString() +
                " group by valueid";

            return DataContext.Query<Data>(query);
        }

        //public List<Data> ReadByFilter(FilterData filter)
        //{
        //    bool where = true;
        //    string query = "select * from data where valueid in (select format('{0}.{1}',device_id,sensor_id) from sensor where type in (select sensor_type_id from sensor_type))";
        //    if (!string.IsNullOrEmpty(filter.ValueIdEqulas))
        //    {
        //        query += where ? " and" : " where";
        //        query += $" valueid like '{filter.ValueIdEqulas}'";
        //        where = true;
        //    }
        //    if (!string.IsNullOrEmpty(filter.ValueIdContains))
        //    {
        //        query += where ? " and" : " where";
        //        query += $" valueid like '{filter.ValueIdContains}%'";
        //        where = true;
        //    }
        //    if (filter.DateTimeBegin != null && filter.DateTimeFinish != null)
        //    {
        //        query += where ? " and" : " where";
        //        query += $" datetime >= {filter.DateTimeBegin} and datetime <= {filter.DateTimeFinish}";
        //        where = true;
        //    }

        //    query += " ORDER BY datetime";

        //    return ListObjects2ListData(DataContext.Query(query));
        //}

        //private List<Data> ListObjects2ListData(List<List<ObjectCell>> objects)
        //{
        //    List<Data> datas = new List<Data>();

        //    foreach (var data in objects)
        //    {
        //        Data dat = new Data();
        //        try
        //        {
        //            var temp_date = data.Where(c => c.Title == "datetime").FirstOrDefault();
        //            dat.datetime = Convert.ToInt32(temp_date != null ? temp_date.Value : null);
        //            var temp_valueid = data.Where(c => c.Title == "valueid").FirstOrDefault();
        //            dat.valueid = temp_valueid != null ? temp_valueid.Value.ToString() : null;
        //            var temp_value = data.Where(c => c.Title == "value").FirstOrDefault();
        //            dat.value = temp_value != null ? temp_value.Value.ToString().Split(',') : null;
        //        }
        //        catch (Exception e)
        //        {

        //        }
        //        datas.Add(dat);
        //    }

        //    return datas;
        //}
    }
}