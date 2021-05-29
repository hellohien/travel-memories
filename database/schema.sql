set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "memories"(
  "memoryId"         serial,
  "placeVisited"     text           not null,
  "date"             date           not null,
  "favoriteMoments"  text           null,
  "lat"              decimal(8,6)   not null,
  "long"             decimal(9,6)   not null,
  "createdAt"        timestamptz(6) not null default now(),
  "updatedAt"        timestamptz(6) not null default now(),
  primary key ("memoryId")
)
