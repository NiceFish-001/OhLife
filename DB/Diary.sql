if exists (select 1 from sysdatabases where name='DiaryDB')
drop database DiaryDB
go
create database DiaryDB
on(
name='DiaryDB',filename='F:\MyDB\DiaryDB.mdf'
)
go
use DiaryDB
go
if exists(select 1 from sysobjects where id=OBJECT_ID('User_tb'))
drop table User_tb
go
create table User_tb
(
User_tbID int primary key identity(1,1),--账号ID
Accountnumber nvarchar(11) not null,--用户账号
Passwordr nvarchar(12) not null,--用户密码
Registertime datetime not null,--注册时间
Memberstate bit not null,--会员状态
Accountstate bit not null,--账号状态
Memberopen datetime ,--会员开通时间
Memberover datetime,--会员结束时间
)
select * from User_tb
insert into User_tb values('15138735162','145251',getdate(),0,1,'2019/4/28','2020/4/28')
if exists(select 1 from sysobjects where id=OBJECT_ID('Diaryinfo_tb'))
drop table Diaryinfo_tb
go
create table Diaryinfo_tb
(
DiaryinfoID int primary key identity(1,1),--日记ID
User_tbID int foreign key references User_tb(User_tbID),--用户ID
Diarytype int not null,--日记类型
Diarycontent nvarchar(1000),--日记内容
Diarymedia nvarchar(200),--日记描述
Diarytime datetime not null,--日记发布时间
)
insert into Diaryinfo_tb values(1,1,
'土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。'
,null,'2019/4/01')
insert into Diaryinfo_tb values(1,1,
'我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。'
,null,'2019/4/02')
insert into Diaryinfo_tb values(1,1,
'如果你浪费了自己的年龄，那是挺可悲的。因为你的青春只能持续一点儿时间——很短的一点儿时间。'
,null,'2019/4/03')
insert into Diaryinfo_tb values(1,1,
'真正的科学家应当是个幻想家；谁不是幻想家，谁就只能把自己称为实践家。'
,null,'2019/4/04')
insert into Diaryinfo_tb values(1,1,
'温顺的青年人在图书馆里长大，他们相信他们的责任是应当接受西塞罗，洛克，培根发表的意见；他们忘了西塞罗，洛克与培根写这些书的时候，也不过是在图书馆里的青年人。'
,null,'2019/4/05')
insert into Diaryinfo_tb values(1,1,
'土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。'
,null,'2019/4/06')
insert into Diaryinfo_tb values(1,1,
'我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。'
,null,'2019/4/07')
insert into Diaryinfo_tb values(1,1,
'如果你浪费了自己的年龄，那是挺可悲的。因为你的青春只能持续一点儿时间——很短的一点儿时间。'
,null,'2019/4/08')
insert into Diaryinfo_tb values(1,1,
'真正的科学家应当是个幻想家；谁不是幻想家，谁就只能把自己称为实践家。'
,null,'2019/4/09')
insert into Diaryinfo_tb values(1,1,
'温顺的青年人在图书馆里长大，他们相信他们的责任是应当接受西塞罗，洛克，培根发表的意见；他们忘了西塞罗，洛克与培根写这些书的时候，也不过是在图书馆里的青年人。'
,null,'2019/4/10')
insert into Diaryinfo_tb values(1,1,
'土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。'
,null,'2019/4/11')
insert into Diaryinfo_tb values(1,1,
'我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。'
,null,'2019/4/12')
insert into Diaryinfo_tb values(1,1,
'如果你浪费了自己的年龄，那是挺可悲的。因为你的青春只能持续一点儿时间——很短的一点儿时间。'
,null,'2019/4/13')
insert into Diaryinfo_tb values(1,1,
'真正的科学家应当是个幻想家；谁不是幻想家，谁就只能把自己称为实践家。'
,null,'2019/4/14')
insert into Diaryinfo_tb values(1,1,
'温顺的青年人在图书馆里长大，他们相信他们的责任是应当接受西塞罗，洛克，培根发表的意见；他们忘了西塞罗，洛克与培根写这些书的时候，也不过是在图书馆里的青年人。'
,null,'2019/4/15')

select * from Diaryinfo_tb
