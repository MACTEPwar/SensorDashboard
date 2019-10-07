using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SensorDashboard.Models
{
    public class Data
    {
        public int datetime { get; set; }
        public string valueid { get; set; }
        public string[] value { get; set; }
    }
}