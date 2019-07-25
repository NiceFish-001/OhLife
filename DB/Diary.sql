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
User_tbID int primary key identity(1,1),--�˺�ID
Accountnumber nvarchar(11) not null,--�û��˺�
Passwordr nvarchar(12) not null,--�û�����
Registertime datetime not null,--ע��ʱ��
Memberstate bit not null,--��Ա״̬
Accountstate bit not null,--�˺�״̬
Memberopen datetime ,--��Ա��ͨʱ��
Memberover datetime,--��Ա����ʱ��
)
select * from User_tb
insert into User_tb values('15138735162','145251',getdate(),0,1,'2019/4/28','2020/4/28')
if exists(select 1 from sysobjects where id=OBJECT_ID('Diaryinfo_tb'))
drop table Diaryinfo_tb
go
create table Diaryinfo_tb
(
DiaryinfoID int primary key identity(1,1),--�ռ�ID
User_tbID int foreign key references User_tb(User_tbID),--�û�ID
Diarytype int not null,--�ռ�����
Diarycontent nvarchar(1000),--�ռ�����
Diarymedia nvarchar(200),--�ռ�����
Diarytime datetime not null,--�ռǷ���ʱ��
)
insert into Diaryinfo_tb values(1,1,
'�����������ķ��ֺ��ջ�������۵ģ�����Ҳ�����أ������������Ĳ�����ʳ�������������ֻ���������ͻ���Ļ�����ʹ�ٴ�Ĳ���Ҳֻ��ɰ�ػ��γأ���������С��Ҳ���������ġ�'
,null,'2019/4/01')
insert into Diaryinfo_tb values(1,1,
'����Ҫ�������������������ͼ�顣Ȼ��������֮�������ͨ�����ȵİ�����Գ�ʵͼ������ݣ�ͼ��������������ʵ�����ѡ�'
,null,'2019/4/02')
insert into Diaryinfo_tb values(1,1,
'������˷����Լ������䣬����ͦ�ɱ��ġ���Ϊ����ഺֻ�ܳ���һ���ʱ�䡪���̵ܶ�һ���ʱ�䡣'
,null,'2019/4/03')
insert into Diaryinfo_tb values(1,1,
'�����Ŀ�ѧ��Ӧ���Ǹ�����ң�˭���ǻ���ң�˭��ֻ�ܰ��Լ���Ϊʵ���ҡ�'
,null,'2019/4/04')
insert into Diaryinfo_tb values(1,1,
'��˳����������ͼ����ﳤ�������������ǵ�������Ӧ�����������ޣ���ˣ���������������������������ޣ���������д��Щ���ʱ��Ҳ��������ͼ�����������ˡ�'
,null,'2019/4/05')
insert into Diaryinfo_tb values(1,1,
'�����������ķ��ֺ��ջ�������۵ģ�����Ҳ�����أ������������Ĳ�����ʳ�������������ֻ���������ͻ���Ļ�����ʹ�ٴ�Ĳ���Ҳֻ��ɰ�ػ��γأ���������С��Ҳ���������ġ�'
,null,'2019/4/06')
insert into Diaryinfo_tb values(1,1,
'����Ҫ�������������������ͼ�顣Ȼ��������֮�������ͨ�����ȵİ�����Գ�ʵͼ������ݣ�ͼ��������������ʵ�����ѡ�'
,null,'2019/4/07')
insert into Diaryinfo_tb values(1,1,
'������˷����Լ������䣬����ͦ�ɱ��ġ���Ϊ����ഺֻ�ܳ���һ���ʱ�䡪���̵ܶ�һ���ʱ�䡣'
,null,'2019/4/08')
insert into Diaryinfo_tb values(1,1,
'�����Ŀ�ѧ��Ӧ���Ǹ�����ң�˭���ǻ���ң�˭��ֻ�ܰ��Լ���Ϊʵ���ҡ�'
,null,'2019/4/09')
insert into Diaryinfo_tb values(1,1,
'��˳����������ͼ����ﳤ�������������ǵ�������Ӧ�����������ޣ���ˣ���������������������������ޣ���������д��Щ���ʱ��Ҳ��������ͼ�����������ˡ�'
,null,'2019/4/10')
insert into Diaryinfo_tb values(1,1,
'�����������ķ��ֺ��ջ�������۵ģ�����Ҳ�����أ������������Ĳ�����ʳ�������������ֻ���������ͻ���Ļ�����ʹ�ٴ�Ĳ���Ҳֻ��ɰ�ػ��γأ���������С��Ҳ���������ġ�'
,null,'2019/4/11')
insert into Diaryinfo_tb values(1,1,
'����Ҫ�������������������ͼ�顣Ȼ��������֮�������ͨ�����ȵİ�����Գ�ʵͼ������ݣ�ͼ��������������ʵ�����ѡ�'
,null,'2019/4/12')
insert into Diaryinfo_tb values(1,1,
'������˷����Լ������䣬����ͦ�ɱ��ġ���Ϊ����ഺֻ�ܳ���һ���ʱ�䡪���̵ܶ�һ���ʱ�䡣'
,null,'2019/4/13')
insert into Diaryinfo_tb values(1,1,
'�����Ŀ�ѧ��Ӧ���Ǹ�����ң�˭���ǻ���ң�˭��ֻ�ܰ��Լ���Ϊʵ���ҡ�'
,null,'2019/4/14')
insert into Diaryinfo_tb values(1,1,
'��˳����������ͼ����ﳤ�������������ǵ�������Ӧ�����������ޣ���ˣ���������������������������ޣ���������д��Щ���ʱ��Ҳ��������ͼ�����������ˡ�'
,null,'2019/4/15')

select * from Diaryinfo_tb
