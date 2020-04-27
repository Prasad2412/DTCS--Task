using CRUDwithAngularJS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRUDwithAngularJS.Models.Model;
using System.Web.UI;

namespace CRUDwithAngularJS.Controllers
{
    public class PatientController : Controller
    {
        private AngularJSEntities2 db = new AngularJSEntities2();


        // GET: Patient
        public ActionResult Index()
        {
            return View();
        }

        //GET Patient/GetPatient
        public JsonResult GetPatient()
        {
            List<Patient> empList = new List<Patient>();

            using (BLPatient blpatient = new BLPatient())
            {
                empList = blpatient.GetAllPatientRecord();
            }
            return Json(empList, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetStateDropDownList()
        {
            IEnumerable<State> StateList = db.States.ToList();
            return Json(StateList, JsonRequestBehavior.AllowGet);
        }

        //Get City Dropdown Record
        [HttpGet]
        public JsonResult GetCityDropDownList(int StateId)
        {
            IEnumerable<City> CityList = db.Cities.Where(e => e.StateId == StateId).ToList();

            return Json(CityList, JsonRequestBehavior.AllowGet);
        }

        //POST insert new Patient
        public JsonResult Insert(Patient patient)
        {
            //Check Duplicate Record 

            if (patient.FirstName == "" || patient.LastName == "" || patient.Gender == null || patient.DateOfBirth == null || patient.City == null || patient.State == null)
            {
                return Json(new { success = "" });
            }
            using (BLPatient blpatient = new BLPatient())
            {
                int count = blpatient.GetDuplicatePatient(patient);
                if (count > 0)
                    return Json(new { success = false });

                if (patient != null)
                {
                    db.Patients.Add(patient);
                    db.SaveChanges();
                    return Json(new { success = true });
                }
                else
                {
                    return Json(new { success = false });
                }
            }
            return Json("All Field Required", JsonRequestBehavior.AllowGet);
        }

        //POST Patient/Update
        [HttpPost]
        public JsonResult Update(Patient updatedPatient)
        {
            Patient existingPatient = db.Patients.Find(updatedPatient.PatientId);
            if (existingPatient == null)
            {
                return Json(new { success = false });
            }
            else
            {
                existingPatient.PatientId = updatedPatient.PatientId;
                existingPatient.FirstName = updatedPatient.FirstName;
                existingPatient.LastName = updatedPatient.LastName;
                existingPatient.Gender = updatedPatient.Gender;
                existingPatient.DateOfBirth = updatedPatient.DateOfBirth;
                existingPatient.State = updatedPatient.State;
                existingPatient.City = updatedPatient.City;

                db.Entry(existingPatient).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return Json(new { success = true });
            }
        }

        //POST Patient/Delete/1
        [HttpPost]
        public JsonResult Delete(int PatientId)
        {
            Patient patient = db.Patients.Find(PatientId);
            if (patient == null)
            {
                return Json(new { success = false });
            }
            db.Patients.Remove(patient);
            db.SaveChanges();
            return Json(new { success = true });
        }

        //Get Select State  and City Dropdown
        [HttpGet]
        public JsonResult GetSelectedState(int StateId)
        {
            //IEnumerable<State> StateList = db.States.Where(e => e.StateId == StateId).ToList();
            IEnumerable<State> StateList = db.States.ToList();
            return Json(StateList, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetSelectedCity(int CityId)
        {
            //IEnumerable<City> CityList = db.Cities.Where(e => e.CityId == CityId).ToList();
            IEnumerable<City> CityList = db.Cities.ToList();
            return Json(CityList, JsonRequestBehavior.AllowGet);
        }



    }
}