CREATE DATABASE sinalVerde;
use sinalverde;

CREATE TABLE empresa (
	id int primary key auto_increment,
    nome varchar(40),
    cnpj char(14),
    logradouro varchar(80),
    cep char(8),
    bairro varchar(45),
    cidade varchar(45),
    estado varchar(45),
    complemento varchar(30)
);

CREATE TABLE sensor (
	idSensor int primary key auto_increment,
    dtRegistro datetime,
    distancia float,
    tipoEquipamento tinyint,
    latlng varchar(16),
    fkEmpresa int,
    CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa (id)
);

CREATE TABLE colaborador(
	idColaborador int primary key auto_increment,
    nome varchar(45),
    cargo varchar(35),
    dataNasc date,
    cpf char(11),
    email varchar(40),
    senha varchar(35),
    nivel_permissao tinyint,
    fkEmpresa2 int,
    CONSTRAINT fkEmpresa2 FOREIGN KEY (fkEmpresa2) REFERENCES empresa (id)
);

-- Inserindo dados na tabela empresa
INSERT INTO empresa (nome, cnpj, logradouro, cep, bairro, cidade, estado, complemento)
VALUES 
('Empresa Alpha', '12345678000195', 'Rua das Flores, 123', '12345678', 'Centro', 'São Paulo', 'SP', 'Próximo ao parque'),
('Empresa Beta', '98765432000112', 'Avenida Central, 456', '87654321', 'Jardins', 'Rio de Janeiro', 'RJ', 'Em frente à praça');

-- Inserindo dados na tabela sensor (com correção no campo latlng)
INSERT INTO sensor (dtRegistro, distancia, tipoEquipamento, latlng, fkEmpresa)
VALUES 
('2023-09-15 10:30:00', 15.5, 1, '-23.55,-46.63', 1),
('2023-09-16 11:00:00', 20.0, 2, '-22.90,-43.17', 2);

-- Inserindo dados na tabela colaborador (relacionada com empresa)
INSERT INTO colaborador (nome, cargo, dataNasc, cpf, email, senha, nivel_permissao, fkEmpresa2)
VALUES 
('João Silva', 'Gerente de Operações', '1985-07-10', '12345678901', 'joao.silva@empresaalpha.com', 'senha123', 3, 1),
('Maria Souza', 'Analista de TI', '1990-05-22', '98765432100', 'maria.souza@empresabeta.com', 'senha456', 2, 2);

select empresa.nome as Empresa,
	empresa.cnpj as Cnpj,
    empresa.estado as Estado,
    colaborador.nome as Colaborador,
    colaborador.email as Email,
    sensor.dtRegistro as 'Data do Registro',
    sensor.latlng as Coordenadas
    FROM colaborador JOIN empresa
    ON colaborador.fkEmpresa2 = empresa.id
    JOIN sensor
    ON sensor.fkEmpresa = empresa.id;
    
    

