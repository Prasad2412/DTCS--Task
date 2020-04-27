//using CRUDwithAngularJS.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace CRUDwithAngularJS.Controllers
//{
//    public class LoginController : Controller
//    {
//        private AngularJSEntities1 db = new AngularJSEntities1();
//        //GET
//        public ActionResult Signin()
//        {
//            return View();
//        }

//        //POST
//        [HttpPost]
//        public ActionResult Signin(Login Login)
//        {
//            var user = db.Logins.Where(x => x.Email == Login.Email && x.Password == Login.Password).FirstOrDefault();
//            Session["user"] = user.Name;
//            return Json(user, JsonRequestBehavior.AllowGet);
//        }

//        public ActionResult Signout()
//        {
//            Session.Clear();
//            return RedirectToAction("Signin", "Login");
//        }

//        //POST insert new User
//        [HttpPost]
//        public JsonResult Insert(Login Login)
//        {
//            if (Login != null)
//            {
//                db.Logins.Add(Login);
//                db.SaveChanges();

//                return Json(new { success = true });
//            }
//            else
//            {
//                return Json(new { success = false });
//            }
//        }
//    }
//}