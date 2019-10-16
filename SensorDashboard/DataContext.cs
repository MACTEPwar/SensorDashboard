using ClickHouse.Ado;
using SensorDashboard.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Reflection;

namespace SensorDashboard
{
    public class DataContext
    {
        static string connectionString = WebConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public static List<Dictionary<string, object>> Query(string sql)
        {
            var result = sendQueryAndGetResponse(sql);
            return result != null ? ListObjects2ListData(result) : throw new Exception($"Не верный запрос. QUERY: {sql}");
        }

        public static List<T> Query<T>(string sql)
        {
            var result = sendQueryAndGetResponse(sql);
            return result != null ? ListObjects2Object<T>(result) : throw new Exception($"Не верный запрос. QUERY: {sql}");
        }

        private static List<List<ObjectCell>> sendQueryAndGetResponse(string sql)
        {
            ClickHouseConnection connection = new ClickHouseConnection(connectionString);
            ClickHouseCommand command = new ClickHouseCommand();
            command.Connection = connection;
            command.CommandType = System.Data.CommandType.Text;
            command.CommandText = sql;

            List<List<ObjectCell>> result = new List<List<ObjectCell>>();

            using (connection)
            {
                connection.Open();
                ClickHouseDataReader reader;
                try
                {
                    reader = command.ExecuteReader() as ClickHouseDataReader;
                }
                catch (Exception e)
                {
                    return null;
                }
                do
                {
                    while (reader.Read())
                    {
                        List<ObjectCell> row = new List<ObjectCell>();

                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            try
                            {
                                row.Add(new ObjectCell()
                                {
                                    Title = reader.GetName(i),
                                    Value = reader.GetValue(i),
                                    Type = reader.GetFieldType(i)
                                });
                            }
                            catch
                            {
                                break;
                            }

                        }
                        result.Add(row);
                    }


                } while (reader.NextResult());
                command.Dispose();
                reader.Close();
                connection.Close();
                connection.Dispose();
            }

            return result;
        }
        private static List<Dictionary<string, object>> ListObjects2ListData(List<List<ObjectCell>> objects)
        {
            List<Dictionary<string, object>> dict = new List<Dictionary<string, object>>();
            foreach (var row in objects)
            {
                Dictionary<string, object> temp_dict = new Dictionary<string, object>();
                foreach (var cell in row)
                {
                    temp_dict.Add(cell.Title, cell.Value.ToString().Split(','));
                }
                dict.Add(temp_dict);
            }

            return dict;
        }

        private static List<T> ListObjects2Object<T>(List<List<ObjectCell>> columns)
        {
            List<T> result = new List<T>();
            PropertyInfo[] properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.NonPublic);

            foreach (List<ObjectCell> row in columns)
            {
                T obj = (T)Activator.CreateInstance(typeof(T));
                foreach (PropertyInfo property in properties)
                {
                    ObjectCell cell = null;
                    var test = row.Where(r => r.Title == property.Name).FirstOrDefault();
                    if ((cell = row.Where(r => r.Title == property.Name).FirstOrDefault()) == null) continue;
                    PropertyInfo property_current_object = obj.GetType().GetProperty(property.Name, BindingFlags.Public | BindingFlags.Instance | BindingFlags.NonPublic);
                    object value = null;
                    try
                    {
                        value = Convert.ChangeType(cell.Value, cell.Type);
                        if (cell.Type == typeof(string))
                        {
                            var tmp = value.ToString().Split(',');
                            if (tmp.Length > 1)
                            {
                                value = tmp;
                            }
                        }
                        property_current_object.SetValue(obj, value);
                    }
                    catch
                    {
                        continue;
                    }
                }
                result.Add(obj);
            }
            return result;
        }
    }
}