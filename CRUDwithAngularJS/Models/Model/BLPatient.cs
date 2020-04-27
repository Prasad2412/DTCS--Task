using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace CRUDwithAngularJS.Models.Model
{
    public class BLPatient : IDisposable
    {

        public void Dispose()
        {
        }
        public List<Patient> GetAllPatientRecord()
        {
            DataTable dt = new DataTable();
            List<Patient> resultList = new List<Patient>();
            string ConString = @"data source=DESKTOP-DAML5MI;initial catalog=AngularJS;integrated security=True";
            using (SqlConnection con = new SqlConnection(ConString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("GetAllRocordForListing", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.SelectCommand = cmd;
                da.Fill(dt);
                for (int i = 0; i <= dt.Rows.Count - 1; i++)
                {
                    Patient text = new Patient();
                    text.PatientId = Convert.ToInt32(dt.Rows[i]["PatientId"]);
                    text.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                    text.LastName = Convert.ToString(dt.Rows[i]["LastName"]);
                    text.Gender = Convert.ToString(dt.Rows[i]["Gender"]);
                    text.DateOfBirth = Convert.ToString(dt.Rows[i]["DateOfBirth"]);
                    if (Convert.ToString(dt.Rows[i]["StateId"]) != "")
                        text.StateId = Convert.ToInt32(dt.Rows[i]["StateId"]);
                    text.State = Convert.ToString(dt.Rows[i]["StateName"]);
                    if (Convert.ToString(dt.Rows[i]["CityId"]) != "")
                        text.CityId = Convert.ToInt32(dt.Rows[i]["CityId"]);
                    text.City = Convert.ToString(dt.Rows[i]["CityName"]);
                    resultList.Add(text);
                }
            }
            return resultList.ToList();
        }

        public int GetDuplicatePatient(Patient patient)
        {
            int TotalCount = 0;
            DataTable dt = new DataTable();
            string ConString = @"data source=DESKTOP-DAML5MI;initial catalog=AngularJS;integrated security=True";
            using (SqlConnection con = new SqlConnection(ConString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("CheckDuplicateRecord", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FirstName", patient.FirstName);
                cmd.Parameters.AddWithValue("@LastName", patient.LastName);
                cmd.Parameters.AddWithValue("@Gender", patient.Gender);
                cmd.Parameters.AddWithValue("@State", patient.State);
                cmd.Parameters.AddWithValue("@City", patient.City);

                da.SelectCommand = cmd;
                cmd.ExecuteNonQuery();
                da.Fill(dt);

                TotalCount = dt.Rows.Count;
            }
            return TotalCount;
        }
    }
}