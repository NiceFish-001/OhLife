using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Text;
using OhLife.Models;
using Newtonsoft.Json.Linq;
using System.Web;
using System.IO;
using System.Threading.Tasks;

namespace OhLife.Controllers
{
    [RoutePrefix("api/diaryoperation")]
    public class DiaryOperationController : ApiController
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
        [Route("~/api/diaryoperation")]
        [HttpPost]
        public string diaryinsert([FromBody] JObject obj)
        {
            var diaryinfo = new {userid=obj["userid"],diarytype=obj["diarytype"], diarycontent=obj["diarycontent"], diarymedia=obj["diarymedia"] };
            using (DiaryDBEntitiesOne diarydb=new DiaryDBEntitiesOne())
            {
                var Diaryinfo= new Diaryinfo_tb();
                Diaryinfo.User_tbID =(int) diaryinfo.userid;
                Diaryinfo.Diarytype =(int)diaryinfo.diarytype;
                Diaryinfo.Diarycontent = (string)diaryinfo.diarycontent;
                Diaryinfo.Diarymedia = (string)diaryinfo.diarymedia;
                Diaryinfo.Diarytime = DateTime.Parse( DateTime.Now.ToString("yyyy-MM-dd"));
                diarydb.Diaryinfo_tb.Add(Diaryinfo);
                return diarydb.SaveChanges() > 0 ? "Yes" : "No";
            }
        }
        [Route("~/api/diaryoperation/picture")]
        [HttpPost]
        public string picture()
        {
            HttpFileCollection files = HttpContext.Current.Request.Files;
            var HttpResponsemsg = "";
            try
            {
                foreach (string key in files.AllKeys)
                {
                    HttpPostedFile file = files[key];//file.ContentLength文件长度
                    if (string.IsNullOrEmpty(file.FileName) == false)
                        file.SaveAs(HttpContext.Current.Server.MapPath("~/img/") + file.FileName);
                    HttpResponsemsg = "img/"+file.FileName;
                }
            }
            catch (Exception)
            {
                HttpResponsemsg = "上传失败了呢亲";
            }
            return HttpResponsemsg;
        }

        [Route("~/api/diaryoperation/audiouplode")]
        [HttpPost]
        public string audiouplode([FromBody]JObject obj)
        {
            try
            {
                var audio = new { audioinfo = obj["audioinfo"] };
                var base64obj = audio.audioinfo.ToString().Replace("data:application/octet-stream;base64,", "");
                string newname = DateTime.Now.ToString("yyyyMMddHHmmss");
                var pathurl = HttpContext.Current.Server.MapPath("/") + "audio\\" + newname + ".mp3";
                byte[] audioByteArray = Convert.FromBase64String(base64obj);
                var mp3File = File.Create(pathurl, audioByteArray.Length);
                mp3File.Write(audioByteArray, 0, audioByteArray.Length);
                mp3File.Flush();
                mp3File.Close();
                return newname;
            }
            catch (Exception)
            {
                return "No";
            }
           
        }

    }
}
//var sss = "zhichi";
//    // Check if the request contains multipart/form-data.
//    // 检查该请求是否含有multipart/form-data
//    if (!Request.Content.IsMimeMultipartContent())
//    {
//    //throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
//    sss= "类型不支持";
//    }
//string root = System.Web.HttpContext.Current.Server.MapPath("~/App_Data");

//var provider = new MultipartFormDataStreamProvider(root);
//try
//{
//    // Read the form data.
//    // 读取表单数据
//    await Request.Content.ReadAsMultipartAsync(provider);
//    //获取表单数据
//    foreach (var key in provider.FormData.AllKeys)
//    {
//        foreach (var val in provider.FormData.GetValues(key))
//        {
//            string formDate = string.Format("{0}: {1}", key, val);
//        }
//    }
//    //获取表单文件
//    foreach (MultipartFileData file in provider.FileData)
//    {
//        string fileName = file.Headers.ContentDisposition.FileName;
//        string localFileName = file.LocalFileName;
//    }
//    return "yes";
//}
//catch (Exception)
//{
//    return "No";
//}



//var diaryinfo = new { userid = obj["file"] };