create table users(
    user_id serial primary key,
    user_name varchar(255) not null,
    user_email varchar(300) not null,
    user_password varchar(200) not null,
    user_birth varchar(10) not null
)

select * from users;
drop table mission_record;
drop table mission_table;
drop table users;

create table mission_table(
    mission_id int primary key,
    mission_content varchar(700),
    is_active boolean default true
)

create table mission_record(
    record_id int primary key,
    user_id int references users(user_id) not null,
    mission_id int references mission_table(mission_id) not null,
    record_date date not null,
    is_success boolean not null,
    failure_emotion varchar(100),
    failure_reason varchar(300)
)

select * from mission_record;

insert all
into mission_table values(1, '물 500ml 마시기', false)
select * from dual;
