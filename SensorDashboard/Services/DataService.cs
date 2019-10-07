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
        public List<Data> ReadByFilter(FilterData filter) {
            bool where = false;
            string query = $"SELECT * FROM data";
            if (!string.IsNullOrEmpty(filter.ValueIdEqulas))
            {
                query += where ? " and" : " where";
                query += $" valueid like '{filter.ValueIdEqulas}'";
                where = true;
            }
            if (!string.IsNullOrEmpty(filter.ValueIdContains))
            {
                query += where ? " and" : " where";
                query += $" valueid like '{filter.ValueIdContains}%'";
                where = true;
            }
            if (filter.DateTimeBegin != null && filter.DateTimeFinish != null)
            {
                query += where ? " and" : " where";
                query += $" datetime >= {filter.DateTimeBegin} and datetime <= {filter.DateTimeFinish}";
                where = true;
            }

            query += " ORDER BY datetime";

            var resQuery = DataContext.Query(query);

            return ListObjects2ListData(resQuery);
        }

        private List<Data> ListObjects2ListData(List<List<ObjectCell>> objects)
        {
            List<Data> datas = new List<Data>();

            foreach(var data in objects)
            {
                Data dat = new Data();
                try
                {
                    dat.datetime = Convert.ToInt32(data.Where(c => c.Title == "datetime").FirstOrDefault().Value);
                    dat.valueid = data.Where(c => c.Title == "valueid").FirstOrDefault().Value.ToString();
                    //var s = data.Where(c => c.Title == "value").FirstOrDefault().ToString().Split(',');
                    dat.value = data.Where(c => c.Title == "value").FirstOrDefault().Value.ToString().Split(',');
                }
                catch (Exception e)
                {

                }
                datas.Add(dat);
            }

            return datas;
        }
    }
}