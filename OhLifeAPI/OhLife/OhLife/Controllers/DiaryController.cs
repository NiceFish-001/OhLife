using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using OhLife.Models;
using Newtonsoft.Json.Linq;


namespace OhLife.Controllers
{

    [RoutePrefix("api/Diary")]  
    public class DiaryController : ApiController
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
        public HttpResponseMessage diary([FromBody] JObject obj)
        {
            var userobj = new { userID =Convert.ToInt32(obj["userID"]),diaryindex=Convert.ToInt32( obj["diaryindex"]),diarysize=Convert.ToInt32( obj["diarysize"]),diarytype=Convert.ToInt32(obj["diarytype"]) };
            using (DiaryDBEntitiesOne diarydb =new DiaryDBEntitiesOne())
            {
                var diaryinfo= diarydb.Diaryinfo_tb.Select(diary => new { diary.DiaryinfoID, diary.Diarycontent, diary.Diarytime,diary.User_tbID,diary.Diarytype }).Where(user=>user.User_tbID==userobj.userID && user.Diarytype==userobj.diarytype);
                int listcount = diaryinfo.Count();
                diaryinfo = diaryinfo.OrderByDescending(diary => diary.Diarytime);
                return ObjToJson(new { nzTotal = listcount, rows= diaryinfo.Skip((userobj.diaryindex-1)*userobj.diarysize).Take(userobj.diarysize)});
            }
        }

        [Route("~/api/Diary/diarycontent")]
        [HttpPost]
        public HttpResponseMessage diarycontent([FromBody] JObject obj)
        {
            var diarypagenum = new { pagenum = Convert.ToInt32(obj["pagenum"]) };
            using (DiaryDBEntitiesOne diarydb = new DiaryDBEntitiesOne())
            {
                var diarycount = diarydb.Diaryinfo_tb.Select(diary => new { diary.Diarycontent, diary.Diarymedia, diary.DiaryinfoID }).Where(diary => diary.DiaryinfoID == diarypagenum.pagenum);
                return ObjToJson(diarycount);
            }
        }
        [Route("~/api/Diary/diarydelete")]
        [HttpPost]
        public string diarydelete([FromBody] JObject obj)
        {
            var diarypagenum = new { pagenum = Convert.ToInt32(obj["pagenum"]) };
            using (DiaryDBEntitiesOne diarydb = new DiaryDBEntitiesOne())
            {
                Diaryinfo_tb diarycount = diarydb.Diaryinfo_tb.Where(diary => diary.DiaryinfoID == diarypagenum.pagenum).FirstOrDefault();
                diarydb.Diaryinfo_tb.Remove(diarycount);
                return diarydb.SaveChanges() > 0?"Yes": "No";
            }
        }
        [Route("~/api/Diary/diaryortime")]
        [HttpPost]
        public HttpResponseMessage diaryortime([FromBody] JObject obj)
        {
            var userobj = new { userID = Convert.ToInt32(obj["userID"]), diaryindex = Convert.ToInt32(obj["diaryindex"]), diarysize = Convert.ToInt32(obj["diarysize"]), diarytype = Convert.ToInt32(obj["diarytype"]),diarytime=DateTime.Parse(obj["diarytime"].ToString()) };
            using (DiaryDBEntitiesOne diarydb = new DiaryDBEntitiesOne())
            {
                var diaryinfo = diarydb.Diaryinfo_tb.Select(diary => new { diary.DiaryinfoID, diary.Diarycontent, diary.Diarytime, diary.User_tbID, diary.Diarytype }).Where(user => user.User_tbID == userobj.userID && user.Diarytype == userobj.diarytype && user.Diarytime==userobj.diarytime);
                int listcount = diaryinfo.Count();
                diaryinfo = diaryinfo.OrderByDescending(diary => diary.Diarytime);
                return ObjToJson(new { nzTotal = listcount, rows = diaryinfo.Skip((userobj.diaryindex - 1) * userobj.diarysize).Take(userobj.diarysize) });
            }
        }

        [Route("~/api/Diary/count")]
        [HttpPost]
        public HttpResponseMessage diarycount([FromBody] JObject obj)
        {
            var userinfo = new { userid = Convert.ToInt32(obj["userid"]) };
            using (DiaryDBEntitiesOne diarydb = new DiaryDBEntitiesOne())
            {
                int alldiary = diarydb.Diaryinfo_tb.Select(diary =>  new { diary.DiaryinfoID,diary.Diarytype, diary.User_tbID }).Where(type => type.User_tbID == userinfo.userid).Count();
                int text =       diarydb.Diaryinfo_tb.Select(diary => new { diary.DiaryinfoID, diary.Diarytype, diary.User_tbID }).Where(type => type.Diarytype == 1 && type.User_tbID== userinfo.userid).Count();
                int picyure = diarydb.Diaryinfo_tb.Select(diary => new { diary.DiaryinfoID, diary.Diarytype , diary.User_tbID }).Where(type => type.Diarytype == 2 && type.User_tbID== userinfo.userid).Count();
                int audio =    diarydb.Diaryinfo_tb.Select(diary => new { diary.DiaryinfoID, diary.Diarytype , diary.User_tbID }).Where(type => type.Diarytype == 3 && type.User_tbID== userinfo.userid).Count();
                return ObjToJson(new { alldiarynum = alldiary, textnum = text, picyurenum = picyure, audionum = audio });
            }
        }

    }
}
