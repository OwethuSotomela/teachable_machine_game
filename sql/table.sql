-- drop table if exists players;
create table players (
    id serial NOT NULL,
    name varchar(255) NOT NULL,
    username varchar(255) NOT NULL
);

insert into players (name, username) values ('Iminathi', 'Mimie');
insert into players (name, username) values ('Liyema', 'Liye');
