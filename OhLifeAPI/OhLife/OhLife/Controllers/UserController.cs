using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using OhLife.Models;

namespace OhLife.Controllers
{
    [RoutePrefix("api/Login")]
    public class UserController : ApiController
    {

        //HttpResponseMessage不是直接返回 而是内部会处理这个类型 写入响应报文中一般处理程序 是直接写到响应
        public static HttpResponseMessage ObjToJson(object obj)//定义序列化方法
        {
            String str;
            if (obj is String || obj is Char)//如果是string和char类型进行字符转换
            {
                str = obj.ToString();
            }
            else
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                str = serializer.Serialize(obj);
            }
            HttpResponseMessage result = new HttpResponseMessage { Content = new StringContent(str, Encoding.GetEncoding("UTF-8"), "application/json") };//Encoding.GetEncoding("UTF-8")指定编码格式  application/json指定返回的数据类型
            return result;
        }


        [Route("")]
        [HttpPost]
        public HttpResponseMessage login([FromBody] JObject obj)
        {
          var userobj=  new { name = obj["name"].ToString(), pwd = obj["pwd"].ToString() };
            using (DiaryDBEntitiesOne diarydb=new DiaryDBEntitiesOne())
            {
                var userinfo = diarydb.User_tb.Select(users =>new {users.Accountnumber, users.User_tbID,users.Passwordr}).Where(users =>users.Accountnumber ==userobj.name && users.Passwordr==userobj.pwd);
                return ObjToJson(userinfo);
            }
        }

        [Route("~/api/Login/loginstate")]
        [HttpPost]
        public HttpResponseMessage loginstate([FromBody] JObject obj)
        {
            var userobj = new { userid = Convert.ToInt32(obj["userid"]) };
            using (DiaryDBEntitiesOne diarydb = new DiaryDBEntitiesOne())
            {
                var userinfo = diarydb.User_tb.Select(users => new { users.Memberstate,
                    users.User_tbID,
                    users.Memberover }).Where(users =>users.User_tbID==userobj.userid);
                return ObjToJson(new { date= DateTime.Now.ToString("yyyy/MM/dd"),info =userinfo });
            }
        }


        [Route("~/api/Login/newpwd")]
        [HttpPost]
        public string newpwd([FromBody] JObject obj)
        {
            var userobj = new { userid =Convert.ToInt32( obj["userid"]), pwd = obj["pwd"].ToString() };
            using (DiaryDBEntitiesOne diarydb = new DiaryDBEntitiesOne())
            {
                User_tb userinfo = diarydb.User_tb.Where(a => a.User_tbID == userobj.userid).FirstOrDefault();
                userinfo.Passwordr = userobj.pwd;
                return diarydb.SaveChanges() > 0 ? "Yes" : "No";
            }
        }
        [Route("~/api/Login/newuser")]
        [HttpPost]
        public string newuser([FromBody] JObject obj)
        {
            var userobj = new { Accountnumber = obj["Accountnumber"], pwd = obj["pwd"].ToString() };
            using (DiaryDBEntitiesOne diarydb = new DiaryDBEntitiesOne())
            {
          
                User_tb userinfo = new User_tb();
                userinfo.Accountnumber = userobj.Accountnumber.ToString();
                userinfo.Passwordr = userobj.pwd;
                userinfo.Registertime = DateTime.Now;
                userinfo.Memberover = DateTime.Now;
                userinfo.Memberstate = false;
                userinfo.Accountstate = true;
                diarydb.User_tb.Add(userinfo);
                return diarydb.SaveChanges() > 0 ? "Yes" : "No";
            }
        }
    }
}
