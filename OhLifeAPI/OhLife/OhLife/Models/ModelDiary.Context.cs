﻿//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace OhLife.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DiaryDBEntitiesOne : DbContext
    {
        public DiaryDBEntitiesOne()
            : base("name=DiaryDBEntitiesOne")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<User_tb> User_tb { get; set; }
        public DbSet<Diaryinfo_tb> Diaryinfo_tb { get; set; }
    }
}
