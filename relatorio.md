# Relatório do Projeto

## 1. Introdução

## 2. Desenvolvimento

### 2.1. Descrição do Problema

O projeto tem como ponto de partida um dataset composto por 60 ficheiros XML contendo informação relativa a ruas, imagens correspondentes a digitalizações dos desenhos das ruas do século XVIII e imagens correspondentes a um trabalho de campo realizado por alunos de engenharia biomédica que fotografaram as ruas em questão.

Os objetivos propostos passam por analisar o dataset e extrair informação para depois ser guardada num sistema de base de dados, e na criação de uma interface capaz de apresentar a informação e permitir a sua edição.

Além disto, é necessário que a interface seja protejida por um mecanismo de autenticação que permita destinguir os diferentes tipos de ultilizadores e que permita a cada um deles realizar diferentes operações.

Face a este tipo de problema foi criada uma API de dados que permite a manipulação da informação e que é consumida por uma interface que permite a navegação e manipulação da informação. Além disso, foi criado um mecanismo de autenticação que permite a distinção entre os diferentes tipos de utilizadores.

Para isso foi desenvolvido três servidores baseados em Node.js que correm em simultâneo. Um deles é responsável pela API de dados, outro pela interface e outro pelo mecanismo de autenticação.

### 2.2. Análise do dataset

O dataset é composto por 60 ficheiros XML, cada um deles contendo informação relativa a uma rua. No conteúdo fornecido encontramos o ficheiro ```MRB-Rua.xsd``` que contém a descrição da estrutura dos ficheiros XML. A estrutura dos ficheiros encontra-se em anexo ([aqui](#42-estrutura-dos-ficheros-xml)).

Estão presentes na estrutura dos ficheiros os seguintes elementos:

* ```rua```: elemento raiz, contém toda a informação relativa a uma rua. É composto por dois elementos: ```meta``` e ```corpo```;
* ```meta```: contém a informação relativa ao nome e número da rua. É composto por dois elementos: ```número``` e ```nome```;
* ```corpo```: contém a informação relativa ao corpo da página. É composto por vários elementos: ```para```, ```lista-casas``` e ```figura```;
* ```para```: contém texto e elmentos mistos. Serve como parágrafo. É composto por vários elementos: ```entidade```, ```lugar``` e ```data```;
* ```lista-casas```: contém a informação relativa às casas da rua. É uma lista de elementos ```casa```;
* ```casa```: contém a informação relativa a uma casa; É composto por vários elementos: ```número```, ```enfiteuta```, ```foro```, ```desc``` e ```vista```;
* ```desc```: contém a informação relativa à descrição de uma casa. Essencialmente um elemento ```para```;
* ```figura```: contém a informação relativa a uma figura. É composto por dois elementos: ```imagem``` e ```legenda``` contendo ainda um atributo ```id```;
* ```imagem```: contém a informação relativa a uma imagem. É composto por um atributo: ```path```;
* ```legenda```: contém a informação relativa à legenda de uma imagem.

Quanto aos tipos de dados, encontramos os seguintes:

* ```TipoEntidade```: tipo enumerado com os seguintes valores: ```pessoa```, ```instituição```, ```empresa``` e ```família```;
* ```misto```: grupo de elementos mistos;
* ```Tentidade```: tipo complexo que representa uma entidade. Contém um atributo ```tipo``` do tipo ```TipoEntidade```;
* ```lugar```: tipo complexo que representa um lugar. Este pode ser uma ```string``` ou uma ```string``` com um atributo ```norm```;
* ```data```: tipo complexo que representa uma data. É uma ```string```;


Contem ainda 120 imagens, 60 correspondentes aos desenhos das ruas e 60 correspondentes às fotografias das ruas. Estas têm um dos seguintes formatos: ```.jpg``` ou ```.png```.

### 2.3. Sistema de Base de Dados

Foi escolhido o sistema de base de dados MongoDB para guardar a informação extraída do dataset. Este sistema de base de dados é um sistema de base de dados não relacional orientado a documentos. Os documentos são guardados em coleções, sendo que cada documento é um objeto JSON.

Para tal, foi criada uma script em JavaScript que lê os ficheiros XML e guarda a informação extraída num ficheiro JSON. Este ficheiro JSON é depois importado para o MongoDB.

### 2.4. API de Dados

A API de dados foi desenvolvida em Node.js. Esta API permite a manipulação da informação guardada no MongoDB. Para tal, foi utilizado o módulo ```mongoose``` que permite a ligação ao MongoDB e a manipulação dos dados.

Como decisão de implementação, foi decidido que a API consegue manipular as seguintes coleções:

Ruas, Imagens, Casas, Lugares, Datas, Entidades, Enfiteutas, Posts e Comentários.

Deste modo permite a separação da informação em diferentes coleções, o que permite uma maior flexibilidade na manipulação da informação, bem como a pssibilidade de extender os tipos de dados. As coleções ```lugares```, ```datas```  foram criadas de modo a facilitar a implementação da navegação por índice topomínico e cronológico ([RM3](#411-requisitos-de-manipulação) e [RM4](#411-requisitos-de-manipulação)). Foi consideredo que a navegação por lugar e data é relativa às referências encontradas nas descrições presentes nos ficheiros XML.


#### 2.4.1. Modelos e Controladores

Foi criada uma coleção denominada de ```ruas``` para gurdar a informação extraida dos ficheiros XML. 

Com base no modelo apresentado nos ficheiros do dataset, foram criados os seguintes modelos:

* ```rua```: contém o nome, número e lista de parágrafos, lista de casas, lista de imagens e lista de referências;
* ```imagem```: contém o ```path``` e a legenda;
* ```casa```: contém o número, foro, descrição e vista;
* ```referência```: contém o tipo e texto da referência;

O modelo ```rua``` utiliza os modelos ```imagem```, ```casa``` e ```referência``` para definir a estrutura dos documentos. E este recebe um controlador que permite a manipulação dos documentos da coleção.

#### 2.4.2. Rotas

A API de dados disponibiliza da rota ```/api/ruas``` que permite a manipulação dos documentos da coleção ```ruas```. Esta rota permite a manipulação dos documentos da coleção.

Encontram-se disponíveis as seguintes rotas:

* ```GET /api/ruas```: retorna a lista de ruas;
* ```GET /api/ruas/:id```: retorna o documento com o id especificado;
* ```POST /api/ruas```: cria um novo documento;
* ```POST /api/ruas/update```: atualiza o documento com o id especificado;
* ```POST /api/ruas/delete```: elimina o documento com o id especificado;

Nestas rotas são utilazadas callbacks que populam o ```request``` com o resultado das operações, passando a verificação do resultado para o middleware seguinte.

Em muitas rotas é utilizado a mesma callback no final do pipeline horizontal de middlware para responder ao pedido. Esta callback é a ```handleResponse```que verifica a existência de erros ou dados obtidos e responde ao pedido com o resultado.


## 3. Conclusão

## 4. Apêndice

### 4.1. Requisitos

#### 4.1.1. Requisitos de Manipulação

| Número | Descrição | Área | Completo |
| :---: | :--- | :---: | :---: |
| RM1 | A interface deve permitir a navegação em toda a informação disponibilizada | Interface | &#9744; |
| RM2 | A interface deve permitir a navegação por nome | Interface | &#9744; |
| RM3 | A interface deve permitir a navegação por lugar | Interface | &#9744; |
| RM4 | A interface deve permitir a navegação por data | Interface | &#9744; |
| RM5 | A interface deve permitir ao utilizador inserir novos registos | Interface | &#9744; |
| RM6 | A interface deve permitir ao utilizador editar registos existentes | Interface | &#9744; |
| RM7 | A interface deve permitir ao faça um post sobre o registo | Interface | &#9744; |
| RM8 | A interface deve permitir ao utilizador fazer um comentário sobre um post | Interface | &#9744; |
| RM9 | Um utilizador tem de ter nome, email, filiação, nível, data de registo, data de ultimo acesso e password | API | &#9744; |

#### 4.1.2. Requisitos de controlo

| Número | Descrição | Área | Completo |
| :---: | :--- | :---: | :---: |
| RC1 | A interface deve permitir ao utilizador fazer login através de autenticação com username e password | Interface | &#9744;  |
| RC2 | Devem existir dois niveis de acesso: Administrador e Consumidor | API | &#9744; |
| RC3 | O administrador deve ter acesso a todas as operações | Auth | &#9744; |
| RC4 | O consumidor pode apenas consultar, fazer posts e sugerir alterações | Auth | &#9744; |

### 4.2 Estrutura dos ficheros XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">
    <xs:complexType name="Tentidade" mixed="true">
        <xs:attribute name="tipo" type="TipoEntidade"/>
    </xs:complexType>
    <xs:simpleType name="TipoEntidade">
        <xs:restriction base="xs:string">
            <xs:enumeration value="pessoa"/>
            <xs:enumeration value="instituição"/>
            <xs:enumeration value="empresa"/>
            <xs:enumeration value="família"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:group name="misto">
        <xs:choice>
            <xs:element name="entidade" type="Tentidade"/>
            <xs:element name="lugar">
                <xs:complexType>
                    <xs:simpleContent>
                        <xs:extension base="xs:string">
                            <xs:attribute name="norm" type="xs:string"/>
                        </xs:extension>
                    </xs:simpleContent>
                </xs:complexType>
            </xs:element>
            <xs:element name="data" type="xs:string"/>
        </xs:choice>
    </xs:group>
    <xs:element name="rua">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="meta">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="número" type="xs:string"/>
                            <xs:element name="nome" type="xs:string"/>
                        </xs:sequence>
                    </xs:complexType>
                </xs:element>
                <xs:element name="corpo">
                    <xs:complexType>
                        <xs:choice maxOccurs="unbounded">
                            <xs:element name="para">
                                <xs:complexType mixed="true">
                                    <xs:group maxOccurs="unbounded" minOccurs="0" ref="misto"/>
                                </xs:complexType>
                            </xs:element>
                            <xs:element name="lista-casas">
                                <xs:complexType>
                                    <xs:sequence>
                                        <xs:element maxOccurs="unbounded" name="casa">
                                            <xs:complexType>
                                                <xs:sequence>
                                                  <xs:element name="número" type="xs:string"/>
                                                  <xs:element minOccurs="0" name="enfiteuta"
                                                  type="xs:string" maxOccurs="unbounded"/>
                                                  <xs:element minOccurs="0" name="foro"
                                                  type="xs:string"/>
                                                  <xs:element minOccurs="0" name="desc">
                                                  <xs:complexType>
                                                  <xs:sequence>
                                                  <xs:element maxOccurs="unbounded" minOccurs="0"
                                                  name="para">
                                                  <xs:complexType mixed="true">
                                                  <xs:group maxOccurs="unbounded" minOccurs="0"
                                                  ref="misto"/>
                                                  </xs:complexType>
                                                  </xs:element>
                                                  </xs:sequence>
                                                  </xs:complexType>
                                                  </xs:element>
                                                  <xs:element minOccurs="0" name="vista"
                                                  type="xs:string"/>
                                                </xs:sequence>
                                            </xs:complexType>
                                        </xs:element>
                                    </xs:sequence>
                                </xs:complexType>
                            </xs:element>
                            <xs:element name="nome" type="xs:string"/>
                            <xs:element name="figura">
                                <xs:complexType>
                                    <xs:sequence>
                                        <xs:element name="imagem">
                                            <xs:complexType>
                                                <xs:attribute name="path" type="xs:string"
                                                  use="required"/>
                                                <xs:attribute name="largura" type="xs:int"/>
                                            </xs:complexType>
                                        </xs:element>
                                        <xs:element name="legenda" type="xs:string"/>
                                    </xs:sequence>
                                    <xs:attribute name="id" type="xs:ID" use="required"/>
                                </xs:complexType>
                            </xs:element>
                        </xs:choice>
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>
    </xs:element>
</xs:schema>
```

