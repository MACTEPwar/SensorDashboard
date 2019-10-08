using ClickHouse.Ado;
using SensorDashboard.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace SensorDashboard
{
    public class DataContext
    {
        static string connectionString = WebConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private static ClickHouseConnection connection;
        public static void Init()
        {
            connection = new ClickHouseConnection(connectionString);
        }

        public static List<List<ObjectCell>> Query(string sql)
        {
            ClickHouseCommand command = new ClickHouseCommand();
            command.Connection = connection;
            command.CommandType = System.Data.CommandType.Text;
            command.CommandText = sql;

            List<List<ObjectCell>> result = new List<List<ObjectCell>>();

            using (connection)
            {
                connection.Open();
                ClickHouseDataReader reader = command.ExecuteReader() as ClickHouseDataReader;

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
                                    Type = typeof(string)
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
                reader.Close();
                connection.Close();
            }

            return result;
        }
    }


}