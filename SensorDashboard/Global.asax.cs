using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SensorDashboard
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            DataContext.Init();

            //var r = DataContext.Query("INSERT INTO device VALUES ('5763KD,Reno')");

            //var s = DataContext.Query("select * from data where valueid like '8888.p%'") ;

            //var ss = DataContext.Query("select * from data where valueid like '8888.p%'");
            //var ss = DataContext.Test("select Count(*) from data where valueid like '8888.p%'");
        }
    }
}
