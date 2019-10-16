using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SensorDashboard
{
    public static class Helper
    {
        /// <summary>
        /// Переводит unix формат(секунды) в DateTime
        /// </summary>
        /// <param name="timestamp">Секунды</param>
        /// <returns>Дата</returns>
        public static DateTime ToDate(this int timestamp)
        {
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return origin.AddSeconds(timestamp);
        }

        /// <summary>
        /// Переводит дату в unix формат.
        /// </summary>
        /// <param name="date">Дата</param>
        /// <returns>Int unix дата в секундах.</returns>
        public static int ToUnixTime(this DateTime date)
        {
            DateTime zero = new DateTime(1970, 1, 1, 0, 0, 0, 0);
            TimeSpan span = date - zero;
            return (int)Math.Truncate(span.TotalSeconds);
        }
    }
}