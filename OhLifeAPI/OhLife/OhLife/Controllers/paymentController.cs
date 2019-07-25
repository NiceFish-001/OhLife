using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OhLife.Models;
using Newtonsoft.Json.Linq;

namespace OhLife.Controllers
{
    [RoutePrefix("api/payment")]
    public class paymentController : ApiController
    {
        [Route("")]
        [HttpPost]
        public string tovip([FromBody] JObject obj)
        {
            var vipinfo = new { begintime = obj["begintime"] ,overtime=obj["overtimes"],userid=Convert.ToInt32( obj["userid"]) };
            using (DiaryDBEntitiesOne ohlifedb=new DiaryDBEntitiesOne())
            {
                User_tb userinfo = ohlifedb.User_tb.Where(info => info.User_tbID == vipinfo.userid).FirstOrDefault();
                userinfo.Memberstate = true;
               // var ss = Convert.ToDateTime(vipinfo.begintime);
               // var dd= Convert.ToDateTime(vipinfo.overtime);
                 userinfo.Memberopen = Convert.ToDateTime(vipinfo.begintime);
                 userinfo.Memberover= Convert.ToDateTime(vipinfo.overtime);
                return ohlifedb.SaveChanges() > 0 ? "Yes" : "No";
            }
        }
        [Route("~/api/payment/vipover")]
        [HttpPost]
        public string vipover([FromBody] JObject obj)
        {
            var vipinfo = new { userid = Convert.ToInt32(obj["userid"]) };
            using (DiaryDBEntitiesOne ohlifedb = new DiaryDBEntitiesOne())
            {
                User_tb userinfo = ohlifedb.User_tb.Where(info => info.User_tbID == vipinfo.userid).FirstOrDefault();
                userinfo.Memberstate = false;
                return ohlifedb.SaveChanges() > 0 ? "Yes" : "No";
            }
        }
        [Route("~/api/payment/vipgoon")]
        [HttpPost]
        public string vipgoon([FromBody] JObject obj)
        {
            var vipinfo = new { overtime = obj["begintime"], userid = Convert.ToInt32(obj["userid"]) };
            using (DiaryDBEntitiesOne ohlifedb = new DiaryDBEntitiesOne())
            {
                User_tb userinfo = ohlifedb.User_tb.Where(info => info.User_tbID == vipinfo.userid).FirstOrDefault();
                userinfo.Memberstate = false;
                userinfo.Memberover = Convert.ToDateTime(vipinfo.overtime);
                return ohlifedb.SaveChanges() > 0 ? "Yes" : "No";
            }
        }
    }
}
