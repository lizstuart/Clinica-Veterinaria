create database veterinaria;

create table usuarios (
	id serial primary key,
  	nome text,
  	email text,
  	senha text
);

create table animais (
	id serial primary key,
  	nome text,
  	especie text,
  	idade integer,
  	id_usuario integer references usuarios(id)
);