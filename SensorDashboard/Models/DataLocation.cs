using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SensorDashboard.Models
{
    public class DataLocation
    {
        public int DateTime { get; set; }
        public Location Location { get; set; }
    }

    public class Location
    {
        public double lng { get; set; }
        public double lat { get; set; }
    }
}