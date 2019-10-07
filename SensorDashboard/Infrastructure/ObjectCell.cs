using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SensorDashboard.Infrastructure
{
    public class ObjectCell
    {
        public string Title { get; set; }
        public object Value { get; set; }
        public Type Type { get; set; }
    }
}