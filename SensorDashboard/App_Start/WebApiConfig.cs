using System;
using System.Web.Http;

public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        config.MapHttpAttributeRoutes();

        //config.BindParameter(typeof(DateTime), new DateTimeModelBinder());

        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{action}/{str}",
            defaults: new { str = RouteParameter.Optional }
        );

    }
}