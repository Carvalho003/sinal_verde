CREATE DATABASE sinal_verde;
USE sinal_verde;

-- CRIAÇÃO DA TABELA LOGRADOURO
CREATE TABLE logradouro(
	id INT PRIMARY KEY AUTO_INCREMENT 
    ,cep CHAR(9) 
    ,estado VARCHAR(45) 
    ,cidade VARCHAR(45) 
    ,bairro VARCHAR(45) 
    ,logradouro VARCHAR(80) 
    ,numLogradouro VARCHAR(6)  
    ,uf CHAR(2) 
    ,regiao_cidade VARCHAR(20)
);

-- CRIAÇÃO TABELA EMPRESA COM RELACIONAMENTO 1:1 COM A TABELA LOGRADOURO
CREATE TABLE empresa(
	id INT PRIMARY KEY AUTO_INCREMENT 
    ,nome VARCHAR(45) NOT NULL
    ,cnpj CHAR(14) NOT NULL UNIQUE
    ,logradouro_id INT UNIQUE NOT NULL
    ,CONSTRAINT fkLogradouro FOREIGN KEY (logradouro_id) REFERENCES logradouro(id)
);
-- TABELA USUARIO COM RELAÇÃO DE 1:N COM A TABELA EMPRESA
CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT 
    ,nome VARCHAR(45) NOT NULL
    ,cargo VARCHAR(35) NOT NULL
    ,dataNasc DATE NOT NULL
    ,cpf CHAR(11) NOT NULL UNIQUE
    ,email VARCHAR(40) NOT NULL UNIQUE
    ,senha VARCHAR(35) NOT NULL 
    ,nivel_permissao TINYINT NOT NULL 
    ,empresa_id INT NULL
    ,CONSTRAINT chkNivelPermissao CHECK (nivel_permissao IN (0,1,2))
    ,CONSTRAINT fkEmpresa FOREIGN KEY (empresa_id) REFERENCES empresa(id)
);

CREATE TABLE equipamento_sensor(
	id INT AUTO_INCREMENT 
    ,logradouro_id INT 
    ,equipamento TINYINT NOT NULL
    ,tipo_captura VARCHAR(45) NOT NULL
    ,CONSTRAINT chkTipoCaptura CHECK (tipo_captura IN ('veiculo', 'pedestre'))
    ,CONSTRAINT chkTipo CHECK (equipamento IN (0,1,2,3))
    ,CONSTRAINT pkEquipamentoSensor PRIMARY KEY (id, logradouro_id) 
    ,CONSTRAINT fkLogradouroSensor FOREIGN KEY(logradouro_id) REFERENCES logradouro(id)
);

CREATE TABLE dados_sensor(
	id INT AUTO_INCREMENT 
    ,sensor_id INT 
    ,distancia DOUBLE NOT NULL 
    ,dtHora DATETIME DEFAULT now()
    ,status TINYINT NULL
    ,CONSTRAINT chkStatus CHECK (status IN (0,1))
    ,CONSTRAINT pkDadosSensor PRIMARY KEY (id, sensor_id)
    ,CONSTRAINT fkSensor FOREIGN KEY (sensor_id) REFERENCES equipamento_sensor(id)
);


-- COMANDO PARA CADASTRO DO USUARIO ROOT 
INSERT INTO usuario VALUES 
(DEFAULT, 'Root', 'Root', '2000-01-01', '11111111111', 'root@sinalverde.com', 'Root#2024', 2, NULL);


-- INSERT DOS LOGRADOUROS, NÃO TERA INTERFACE PARA ESSE CADASTRO SERA APENAS SIMLUAÇÃO DE UM BANCO REAL
INSERT INTO logradouro (cep, estado, cidade, bairro, logradouro, numLogradouro, uf, regiao_cidade)
VALUES 
('01310-200', 'São Paulo', 'São Paulo', 'Centro', 'Avenida Paulista', '1578', 'SP', 'Central'),
('01046-000', 'São Paulo', 'São Paulo', 'Santa Ifigênia', 'Rua dos Timbiras', '360', 'SP', 'Central'),
('30110-028', 'Minas Gerais', 'Belo Horizonte', 'Centro', 'Avenida Afonso Pena', '1500', 'MG', 'Central'),
('20040-040', 'Rio de Janeiro', 'Rio de Janeiro', 'Centro', 'Rua da Assembleia', '10', 'RJ', 'Central'),
('70040-010', 'Distrito Federal', 'Brasília', 'Asa Norte', 'Via N1', '50', 'DF', 'Central'),
('40010-010', 'Bahia', 'Salvador', 'Centro', 'Praça Municipal', '2', 'BA', 'Central'),
('88015-010', 'Santa Catarina', 'Florianópolis', 'Centro', 'Rua Tenente Silveira', '60', 'SC', 'Central'),
('60055-000', 'Ceará', 'Fortaleza', 'Centro', 'Rua Pedro Pereira', '900', 'CE', 'Central'),
('66017-010', 'Pará', 'Belém', 'Campina', 'Avenida Presidente Vargas', '1001', 'PA', 'Central'),
('80010-150', 'Paraná', 'Curitiba', 'Centro', 'Avenida Marechal Floriano Peixoto', '800', 'PR', 'Central');

-- INSERT PARA CADASTRO DE EMPRESAS, ESSES SERAO OS DADOS INSERIDOS PELOS FORMULARIOS + TRATAMENTO NO BACK-END
INSERT INTO empresa (nome, cnpj, logradouro_id)
VALUES 
('DETRAN São Paulo', '11111111000101', 1),
('CET São Paulo', '22222222000102', 2),
('DETRAN Minas Gerais', '33333333000103', 3),
('DETRAN Rio de Janeiro', '44444444000104', 4),
('DETRAN Distrito Federal', '55555555000105', 5),
('DETRAN Bahia', '66666666000106', 6),
('DETRAN Santa Catarina', '77777777000107', 7),
('DETRAN Ceará', '88888888000108', 8),
('DETRAN Pará', '99999999000109', 9),
('DETRAN Paraná', '10101010000110', 10);

-- INSERT QUE SERA USADO NO CADASTRO DE COLABORADORES, OS DADOS SERAO RECEBIDOS NO FORMULARIO

-- Inserindo usuários com diferentes níveis de permissão (1 para master, 0 para comuns)
INSERT INTO usuario (nome, cargo, dataNasc, cpf, email, senha, nivel_permissao, empresa_id)
VALUES
-- DETRAN São Paulo
('João Silva', 'Gerente de TI', '1980-05-15', '11111111122', 'joao.silva@detran.sp.gov.br', 'senha123', 1, 1), -- Master
('Maria Santos', 'Analista de Sistemas', '1985-03-22', '22222222221', 'maria.santos@detran.sp.gov.br', 'senha123', 0, 1), -- Comum
('Carlos Lima', 'Suporte Técnico', '1990-07-10', '33333333333', 'carlos.lima@detran.sp.gov.br', 'senha123', 0, 1), -- Comum

-- CET São Paulo
('Ana Souza', 'Gerente de Operações', '1979-01-12', '44444444444', 'ana.souza@cet.sp.gov.br', 'senha123', 1, 2), -- Master
('Pedro Almeida', 'Engenheiro de Tráfego', '1984-08-05', '55555555555', 'pedro.almeida@cet.sp.gov.br', 'senha123', 0, 2), -- Comum
('Rafael Gomes', 'Técnico de Tráfego', '1992-11-25', '66666666666', 'rafael.gomes@cet.sp.gov.br', 'senha123', 0, 2), -- Comum

-- DETRAN Minas Gerais
('Fernanda Costa', 'Gerente Administrativa', '1983-09-13', '77777777777', 'fernanda.costa@detran.mg.gov.br', 'senha123', 1, 3), -- Master
('Luiz Pereira', 'Analista de Dados', '1986-02-18', '88888888888', 'luiz.pereira@detran.mg.gov.br', 'senha123', 0, 3), -- Comum
('Aline Rocha', 'Suporte Técnico', '1991-06-30', '99999999999', 'aline.rocha@detran.mg.gov.br', 'senha123', 0, 3), -- Comum

-- DETRAN Rio de Janeiro
('Lucas Ferreira', 'Coordenador de TI', '1982-04-25', '10101010101', 'lucas.ferreira@detran.rj.gov.br', 'senha123', 1, 4), -- Master
('Bruna Faria', 'Engenheira de Tráfego', '1987-12-12', '11111111112', 'bruna.faria@detran.rj.gov.br', 'senha123', 0, 4), -- Comum
('Jorge Mendes', 'Técnico de TI', '1993-05-14', '12121212121', 'jorge.mendes@detran.rj.gov.br', 'senha123', 0, 4), -- Comum

-- DETRAN Distrito Federal
('Paula Azevedo', 'Gerente Geral', '1978-10-20', '13131313131', 'paula.azevedo@detran.df.gov.br', 'senha123', 1, 5), -- Master
('Thiago Martins', 'Analista de Sistemas', '1986-07-07', '14141414141', 'thiago.martins@detran.df.gov.br', 'senha123', 0, 5), -- Comum
('Isabela Nunes', 'Suporte Técnico', '1990-03-19', '15151515151', 'isabela.nunes@detran.df.gov.br', 'senha123', 0, 5), -- Comum

-- DETRAN Bahia
('Ricardo Oliveira', 'Coordenador de TI', '1981-11-22', '16161616161', 'ricardo.oliveira@detran.ba.gov.br', 'senha123', 1, 6), -- Master
('Larissa Ramos', 'Engenheira de Tráfego', '1988-06-30', '17171717171', 'larissa.ramos@detran.ba.gov.br', 'senha123', 0, 6), -- Comum
('Gabriel Souza', 'Técnico de TI', '1992-02-08', '18181818181', 'gabriel.souza@detran.ba.gov.br', 'senha123', 0, 6), -- Comum

-- DETRAN Santa Catarina
('Juliana Melo', 'Gerente Administrativa', '1984-08-16', '19191919191', 'juliana.melo@detran.sc.gov.br', 'senha123', 1, 7), -- Master
('Eduardo Silva', 'Analista de Sistemas', '1989-01-30', '20202020202', 'eduardo.silva@detran.sc.gov.br', 'senha123', 0, 7), -- Comum
('Flávia Monteiro', 'Suporte Técnico', '1994-04-22', '21212121212', 'flavia.monteiro@detran.sc.gov.br', 'senha123', 0, 7), -- Comum

-- DETRAN Ceará
('Marcos Vieira', 'Coordenador de TI', '1982-03-11', '22222222222', 'marcos.vieira@detran.ce.gov.br', 'senha123', 1, 8), -- Master
('Helena Borges', 'Engenheira de Tráfego', '1987-10-05', '23232323232', 'helena.borges@detran.ce.gov.br', 'senha123', 0, 8), -- Comum
('Felipe Barros', 'Técnico de TI', '1991-12-17', '24242424242', 'felipe.barros@detran.ce.gov.br', 'senha123', 0, 8), -- Comum

-- DETRAN Pará
('Victor Duarte', 'Gerente de TI', '1979-09-09', '25252525252', 'victor.duarte@detran.pa.gov.br', 'senha123', 1, 9), -- Master
('Tatiana Lima', 'Analista de Sistemas', '1986-06-06', '26262626262', 'tatiana.lima@detran.pa.gov.br', 'senha123', 0, 9), -- Comum
('André Cardoso', 'Suporte Técnico', '1993-03-14', '27272727272', 'andre.cardoso@detran.pa.gov.br', 'senha123', 0, 9), -- Comum

-- DETRAN Paraná
('Vanessa Franco', 'Gerente de Operações', '1981-12-21', '28282828282', 'vanessa.franco@detran.pr.gov.br', 'senha123', 1, 10), -- Master
('Renato Vieira', 'Engenheiro de Tráfego', '1987-05-27', '29292929292', 'renato.vieira@detran.pr.gov.br', 'senha123', 0, 10), -- Comum
('Mariana Teixeira', 'Técnico de TI', '1990-11-03', '30303030303', 'mariana.teixeira@detran.pr.gov.br', 'senha123', 0, 10); -- Comum


-- SELECT PARA A TELA DE LISTAGEM DE COLABORES COM A IDEIA DE PAGINAÇÃO, ONDE SO APARECERÃO 15 POR TELA
-- OFFSET É PARA FALAR APARTIR DE QUAL REGISTRO CONTA, POR EXEMPLO PARA PUXAR DO 15 AO 30, COLOCA-SE 15 NO OFFSET
SELECT id,nome, cargo, 
    CASE 
        WHEN nivel_permissao = 1 THEN 'ROOT'
        WHEN nivel_permissao = 2 THEN 'TODAS'
        WHEN nivel_permissao = 0 THEN 'COMUM'
        ELSE 'DESCONHECIDO'
    END AS permissao
FROM usuario
ORDER BY nome ASC LIMIT 15 OFFSET 0;

-- SELECT PARA FAZER QUANDO FOR EDITAR UM USUARIO
SELECT id,nome, cargo, DATE_FORMAT(dataNasc, '%d/%m/%Y') AS 'Data de Nascimento', cpf, email,
    CASE 
        WHEN nivel_permissao = 1 THEN 'ROOT'
        WHEN nivel_permissao = 2 THEN 'TODAS'
        WHEN nivel_permissao = 0 THEN 'COMUM'
        ELSE 'DESCONHECIDO'
    END AS permissao
FROM usuario
WHERE id = 2;

-- COMANDO PARA DAR UPDATE EM UM USUARIO, TANTO PARA O PROPRIO ALTERAR SEUS DADOS COMO OS USUARIOS COM PERMISSOES ALTERAREM
UPDATE usuario SET nome = 'Raniele Moreira', cargo = 'SCRUM MASTER', dataNasc = '2003-09-30',
cpf = '99999999998', email = 'raniele@email.com'
WHERE id =2;

-- COMANDO PARA ALTERAR SENHA, SOMENTE PELO USUARIO 
UPDATE usuario SET senha = 'novasenha123' WHERE id =2;

-- SELECT DE LISTAGEM DE EMPRESAS COM COUNT E GROUP BY PARA CONTAR O NUMERO DE COLABORADORES
SELECT e.nome AS Nome, l.cidade AS Localidade, COUNT(c.id) AS Colaboradores, e.id as 'Id empresa' FROM empresa AS e
JOIN logradouro l
ON e.logradouro_id = l.id
JOIN usuario c
ON c.empresa_id = e.id 
GROUP BY e.id
ORDER BY nome ASC LIMIT 15 OFFSET 0;

-- COMANDO CLICAR EM EDITAR OS DADOS DA EMPRESA


SELECT nome, bairro, cnpj, cep, regiao_cidade, logradouro, numLogradouro, cidade, uf, logradouro.id AS 'Id Logradouro' FROM empresa
JOIN logradouro 
ON logradouro_id = logradouro.id
WHERE empresa.id =1;

-- comando para realmente atualizar os dados da empresa
UPDATE empresa 
SET nome = 'SINAL VERDE',
 cnpj = '11111111111111'
 WHERE id = 1;
 
 desc logradouro;
 -- atualizar dados de um logradouro, sera utilizado tambem se os dados do logradouro sede de uma empresa forem alterados
 UPDATE logradouro SET cep = '08021900',
 estado = 'São Paulo', 
 cidade ='São Paulo', 
 bairro = 'São Miguel Paulista',
 logradouro = 'Rua Maria Susano Polilo',
 numLogradouro = '516',
 uf = 'SP',
 regiao_cidade = 'Zona Leste'
 WHERE id =1;
 
 -- comando de login 
 SELECT COUNT(id) AS Logou FROM usuario
 WHERE email = 'root@sinalverde.com' AND senha = 'Root#2024';