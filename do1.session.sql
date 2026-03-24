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
    mission_id serial primary key,
    mission_content varchar(700)
)

select mission_content from mission_table order by 1 asc limit 1;



create table mission_record(
    record_id serial primary key,
    user_id int references users(user_id) not null,
    mission_id int references mission_table(mission_id) not null,
    record_date date not null,
    is_success boolean not null,
    failure_emotion varchar(100),
    failure_reason varchar(300),
    unique(record_id, user_id)
)

select * from mission_record;



INSERT INTO mission_table (mission_content) VALUES
('창문 열고 3분 환기하기'),
('물 한 컵 마시기'),
('방에서 쓰레기 3개 버리기'),
('스트레칭 5분 하기'),
('오늘 할 일 3개 적기'),
('감사한 일 1개 생각하기'),
('휴대폰 없이 5분 쉬기'),
('가족이나 친구에게 안부 메시지 보내기'),
('책 5페이지 읽기'),
('산책 10분 하기'),
('책상 위 정리하기'),
('새로운 노래 1곡 들어보기'),
('거울 보면서 미소 짓기'),
('오늘 찍은 사진 1장 남기기'),
('영어 단어 3개 외우기'),
('누군가에게 칭찬 한마디 하기'),
('잠들기 전 스트레칭 3분'),
('오늘 목표 하나 완료'),
('음악 들으며 눈 감고 3분 쉬기'),
('내일 할 일 미리 하나 정하기'),
('운동 5분하기'),
('자신의 장점 3가지 노트의 적기'),
('부모님과 5분동안 전화하기'),
('방청소 하기'),
('거울 보면서 미소 짓기'),
('오늘 있었던 일 한 줄 기록하기');

select * from mission_table;