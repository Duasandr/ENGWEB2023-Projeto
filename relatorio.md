# Relatório do Projeto

## 1. Introdução

O projeto desenvolvido tem como objetivo a criação de uma API de dados, que permite a manipulação da informação guardada no MongoDB, um serviço que permite a autenticação dos utilizadores e a manipulação e visualização dos dados através de uma interface.

## 2. Desenvolvimento

### 2.1. Descrição do Problema

O projeto tem como ponto de partida um dataset composto por 60 ficheiros XML, contendo informações relativa a ruas, imagens correspondentes a digitalizações dos desenhos das ruas do século XVIII e imagens correspondentes a um trabalho de campo realizado por alunos de engenharia biomédica, que fotografaram as ruas em questão.

Os objetivos propostos passam por analisar o dataset e extrair informações, que serão depois guardadas num sistema de base de dados, e na criação de uma interface capaz de apresentar toda a informação e permitir a sua edição.

Além disto, é necessário que a interface seja protegida por um mecanismo de autenticação que permita destinguir os diferentes tipos de ultilizadores e que autorize a cada um deles realizar diferentes operações.

Face a este tipo de problema, foi criada uma API de dados que permite a manipulação da informação e que é consumida por uma interface que permite a navegação e manipulação da informação. Além disso, foi criado um mecanismo de autenticação que admite a distinção entre os diferentes tipos de utilizadores.

Para isso, foram desenvolvido três servidores em Node.js que correm em simultâneo. Um deles é responsável pela API de dados, outro pela interface e outro pelo mecanismo de autenticação.

### 2.2. Análise do dataset

O dataset é composto por 60 ficheiros XML, cada um deles contendo informação relativa a uma rua. No conteúdo fornecido, encontramos o ficheiro ```MRB-Rua.xsd``` que contém a descrição da estrutura dos ficheiros XML.

Estão presentes na estrutura dos ficheiros os seguintes elementos:

* ```rua```: elemento raiz, contém toda a informação relativa a uma rua. É composto por dois elementos: ```meta``` e ```corpo```;
* ```meta```: contém a informação relativa ao nome e número da rua. É composto por dois elementos: ```número``` e ```nome```;
* ```corpo```: contém a informação relativa ao corpo da página. É composto por vários elementos: ```para```, ```lista-casas``` e ```figura```;
* ```para```: contém texto e elementos mistos. Serve como parágrafo. É composto por vários elementos: ```entidade```, ```lugar``` e ```data```;
* ```lista-casas```: contém a informação relativa às casas da rua. É uma lista de elementos ```casa```;
* ```casa```: contém a informação relativa a uma casa. É composto por vários elementos: ```número```, ```enfiteuta```, ```foro```, ```desc``` e ```vista```;
* ```desc```: contém a informação relativa à descrição de uma casa. Essencialmente um elemento ```para```;
* ```figura```: contém a informação relativa a uma figura. É composto por dois elementos: ```imagem``` e ```legenda```, contendo ainda um atributo ```id```;
* ```imagem```: contém a informação relativa a uma imagem. É composto por um atributo: ```path```;
* ```legenda```: contém a informação relativa à legenda de uma imagem.

Quanto aos tipos de dados, encontramos os seguintes:

* ```TipoEntidade```: tipo enumerado com os seguintes valores: ```pessoa```, ```instituição```, ```empresa``` e ```família```;
* ```misto```: grupo de elementos mistos;
* ```Tentidade```: tipo complexo que representa uma entidade. Contém um atributo ```tipo``` do tipo ```TipoEntidade```;
* ```lugar```: tipo complexo que representa um lugar. Este pode ser uma ```string``` ou uma ```string``` com um atributo ```norm```;
* ```data```: tipo complexo que representa uma data. É uma ```string```.


Contém ainda 120 imagens, 60 correspondentes aos desenhos das ruas e 60 correspondentes às fotografias das ruas. Estas têm um dos seguintes formatos: ```.jpg``` ou ```.png```.

### 2.3. Sistema de Base de Dados

Foi escolhido o sistema de base de dados MongoDB para guardar a informação extraída do dataset. Este sistema de base de dados é um sistema não relacional orientado a documentos. Os documentos são guardados em coleções, sendo que cada documento é um objeto JSON.

Para tal, foi criada uma script em JavaScript que lê os ficheiros XML e guarda a informação extraída num ficheiro JSON. Este ficheiro JSON é depois importado para o MongoDB.

### 2.4. API de Dados

A API de dados foi desenvolvida em Node.js. Esta API permite a manipulação da informação guardada no MongoDB. Para tal, foi utilizado o módulo ```mongoose```, que permite a ligação ao MongoDB e a manipulação dos dados.

Como decisão de implementação, foi estipulado que a API consegue manipular apenas a coleção ```ruas```. Esta coleção contém a informação extraída do dataset, bem como a informação relativa aos posts e comentários.

Esta decisão foi tomada de forma a tirar proveito da flexibilidade que o MongoDB e o modelo de dados não relacional oferecem.

Importante referir que a API de dados não permite a manipulação da informação relativa aos utilizadores. Essa informação é manipulada pelo serviço de autenticação, que está associado a uma base de dados separada.

#### 2.4.1. Modelos e Controladores

Foi criada uma coleção denominada de ```ruas``` para guardar a informação extraída dos ficheiros XML. 

Com base nos ficheiros do dataset, foram criados os seguintes modelos:

* ```rua```: contém o nome, número e lista de parágrafos, lista de casas, lista de imagens e lista de referências;
* ```imagem```: contém o ```path``` e a legenda;
* ```casa```: contém o número, foro, descrição e vista;
* ```referência```: contém o tipo e texto da referência;
* ```post```: contém o título, texto, data de criação, data da última modificação, autor e lista de comentários;
* ```comentário```: contém o texto, data de criação, data da última modificação e autor.

O modelo ```rua``` utiliza os modelos ```imagem```, ```casa``` e ```referência``` para definir a estrutura dos documentos. Este recebe ainda um controlador, que permite a manipulação dos documentos da coleção.

#### 2.4.2. Rotas

A API de dados disponibiliza da rota ```/api/ruas``` que permite a manipulação dos documentos da coleção ```ruas```. Esta rota permite a manipulação dos documentos da coleção.

Encontram-se disponíveis as seguintes rotas:

* ```GET /api/ruas```: retorna a lista de ruas;
* ```GET /api/ruas/:id```: retorna a rua com o id especificado;
* ```GET /api/ruas/lugares```: retorna a lista de lugares;
* ```GET /api/ruas/entidades```: retorna a lista de entidades;
* ```GET /api/ruas/datas```: retorna a lista de datas;
* ```GET /api/ruas/data/:data```: retorna a lista de ruas com a data especificada;
* ```GET /api/ruas/posts```: retorna a lista de posts;
* ```POST /api/ruas```: cria uma nova rua;
* ```POST /api/update/:id```: atualiza a rua com o id especificado;
* ```POST /api/delete/:id```: apaga a rua com o id especificado;
* ```POST /api/ruas/posts/add?idRua=...```: cria um novo post;
* ```POST /api/ruas/comments/add?idPost=...```: cria um novo comentário.

Nas rotas são usadas callbacks genericas que constituiem o pipeline de execução. Acabam todas com handleResponse, que trata de enviar a resposta ao cliente.

#### 2.5 Serviço de Autenticação

O serviço de autenticação foi desenvolvido em Node.js. Este serviço permite a autenticação dos utilizadores e a manipulação da informação relativa aos utilizadores.

Este serviço utiliza o módulo ```passport```, que permite a autenticação dos utilizadores e está ligado a uma base de dados MongoDB separada da API de dados.
Utiliza o plugin do mongoose ```passport-local-mongoose```, que cria um modelo de utilizador com autenticação local.

#### 2.5.1. Modelos e Controladores

Foi criada uma coleção denominada de ```users``` para guardar a informação relativa aos utilizadores. 
Contém os seguintes campos:

* ``email``: email do utilizador;
* ```username```: nome do utilizador;
* ```filiacao```: filiação do utilizador;
* ```nivel```: nível de acesso do utilizador, pode ser ```admin``` ou ```user```;
* ```dataRegisto```: data de registo do utilizador;
* ```dataUltimoAcesso```: data do último acesso do utilizador.

#### 2.5.2. Rotas

O serviço de autenticação disponibiliza da rota ```/auth```, que autoriza a manipulação dos documentos da coleção ```users```.

Encontram-se disponíveis as seguintes rotas:

* ```GET /auth/verify```: verifica se o utilizador está autenticado;
* ```POST /auth/register```: cria um novo utilizador;
* ```POST /auth/login```: autentica o utilizador.

### 2.6. Interface

A interface foi desenvolvida em Node.js, que permite a navegação e manipulação da informação.
As rotas estão protegidas por um mecanismo de autenticação, distinguindo os diferentes tipos de utilizadores, o que possibilita a cada um deles realizar diferentes operações.

#### 2.6.1. Rotas

Existem 5 rotas principais: ```/```, ```/ruas```, ```/auth```, ```/posts``` e ```/imagens```.

A rota ```/``` é a rota principal. Esta rota verifica se o utilizador está autenticado e redireciona para a rota ```/ruas```, caso esteja autenticado, ou para a rota ```/auth```, caso não esteja.

A rota ```/ruas``` é a rota que permite a navegação e manipulação das ruas. Caso seja um utilizador autenticado, é apresentada uma lista de ruas. Caso contrário, é apresentado um erro. Se o utilizador for administrador, é apresentado um botão que permite a criação de uma nova rua, bem como a edição e eliminação de ruas existentes. 

A rota ```/auth``` é a rota que permite a autenticação dos utilizadores. Esta rota apresenta um formulário que permite fazer login ou registar um novo utilizador.

A rota ```/posts``` é a rota que permite a navegação e manipulação dos posts. Um utilizador consumidor consegue criar um novo post e fazer comentários a posts existentes.

A rota ```/imagens``` é a rota que serve as imagens. Esta rota recebe o caminho da imagem e devolve a imagem.

## 3. Conclusão

De forma sucinta, foi desenvolvido um projeto que permite a manipulação da informação guardada no MongoDB, um serviço que permite a autenticação dos utilizadores e a manipulação e visualização dos dados através de uma interface.

Com o seu desenvolvimento, várias dificuldades foram encontradas, encontrando-se inumeradas abaixo:

* Formulários de edição de ruas: foi necessário criar um formulário que permitisse a edição de uma rua. Para tal, foi preciso criar um formulário dinâmico, que permitisse a edição de uma rua com um número variável de parágrafos, casas e imagens. No entanto, foi possível resolver este problema, recorrendo à manipulação do documento json que é enviado para o servidor. Este documento é manipulado de forma a que seja possível a edição de uma rua.
* Upload de imagens para a API de dados: foi imperativo criar um mecanismo que possibilitasse o upload de imagens para a API de dados. Não foi possível resolver este problema numa primeira fase, pois fazer um request com o axios da parte da interface com um multipart/form-data não é suportado. No entanto, foi implementado uma outra forma de dar a volta ao problema: o upload da imagem é feito diretamente para a interface, sendo depois estabelecida uma rota que permite servir a imagem.
* Serviço de tratamento de dados: é possivel adicionar ruas através de ficherios xml. Foi considerado um serviço à parte da interface para fazer o tratamento dos dados, de modo a aliviar a carga computacional na interface. No entanto, não foi possível implementar este serviço. A interface faz o tratamento dos dados e envia-os para a API de dados.
* Paginação: não foi possível implementar a paginação. A interface apresenta todos os resultados de uma só vez. No entanto, foi possível implementar um mecanismo de pesquisa que permite filtrar os resultados.
* Generalização das rotas e código: esta parte foi a mais difícil de implementar, tendo sido a grande maioria do tempo de desenvolvimento deste projeto dispendido nesta parte. Apesar de agora exitir pouca repetição de código, foi necessário fazer inumeras alterações de cada vez que se queria adicionar uma nova funcionalidade.

Apesar de tudo e tendo em conta os aspetos ainda a melhorar, foi possível desenvolver uma API de dados que permite a manipulação da informação guardada no MongoDB, um serviço de autenticação que permite a autenticação dos utilizadores e a manipulação e visualização através de uma interface.