set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "memories"(
  "memoryId"         serial,
  "placeVisited"     varchar(255)   not null,
  "date"             date           not null,
  "favoriteMoments"  varchar(255)   null,
  "createdAt"        timestamptz(6) not null default now(),
  "updatedAt"        timestamptz(6) not null default now(),
  primary key ("memoryId")
)
