# Typescript API Server
Este projeto foi desenvolvido durante o desafio proposto pela Akiry com o intuito de melhor compreender o desenvolvimento de aplicações back-end.

## Introdução
Será desenvolvido uma API de Coleta Seletiva. Sendo possível cadastrar  e buscar locais de coleta.

## Pré-requisitos

Para construir e executar esta aplicação localmente, você precisará de algumas coisas:

- Instale [Node.js](https://nodejs.org/en/)
- Instale [VS Code](https://code.visualstudio.com/)
- Instale [SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)
- Instale [Insomnia](https://insomnia.rest/)

## Banco de Dados
Para esta aplicação foi utilizada a biblioteca SQLite, que implementa um banco de dados SQL embutido.

Você poderá visualizar o conteúdo do banco de dados utilizando a extensão SQLite no Visual Studio Code. Para utilizar a extensão use o comando `cmd + shift + p` e selecione `SQLite: Open Database` > `database_directory`.

Na barra lateral surgirá a opção `SQLITE EXPLORER`, utilize-a com o botão direito do mouse sobre as tabelas do banco de dados para exibir o conteúdo.

## Iniciando

 - Clone o repositório:
	```
	git clone --depth=1 https://github.com/AniltonC/akiry-typescript-server.git <project_name>
	```
 - Instale as dependências:
	```
	cd <project_name>
	npm install
	```
- Execute a aplicação:
	```
	npm run dev
	```
Para utilizar a aplicação utilize a url `http://localhost:7070`.

## Executando
Utilize o Insomnia para executar as rotas da aplicação, crie uma variável de ambiente chamada `base_url` contendo a url da aplicação.

### Buscando Itens de coleta
- Para listar todos os itens utilize uma requisição `GET: base_url/items`
- Para listar um item específico utilize uma requisição `GET: base_url/items/id`, por exemplo, `base_url/items/5`:
	```json
	{
	  "id": 5,
	  "title": "Baterias e Pilhas",
	  "image": "bateria.png"
	}
	```

### Inserindo Locais de coleta
- Utilize uma requisição `POST: base_url/locations` contendo, no corpo da requisição, um `JSON` como exemplificado a seguir:

	```json
	{
	  "name": "Recicla 01",
	  "email": "teste@email.com",
	  "whatsapp": "092994246262",
	  "latitude": -3.10719,
	  "longitude": -60.0261,
	  "city": "Manaus",
	  "uf": "AM",
	  "items": [5, 6]
	}
	```
    O campo `items` se refere aos `ids` da lista de itens de coleta.

### Buscando locais de coleta
- Para listar todos os itens utilize uma requisição `GET: base_url/locations`
- Para buscar um item específico utilize uma requisição `GET: base_url/locations/id`, por exemplo, `base_url/locations/1`:
	```json
	{
	  "name": "Recicla 01",
	  "email": "teste@email.com",
	  "whatsapp": "092994246262",
	  "latitude": -3.10719,
	  "longitude": -60.0261,
	  "city": "Manaus",
	  "uf": "AM",
	  "id": 1
	}
	```

- Para realizar uma busca utilizando filtros utilize uma requisição contendo os parâmetros:

	 `GET: base_url/locations?city=location_city&uf=location_uf&items=location_items_id`.


	Por exemplo:
	```
	base_url/locations?city=Manaus&uf=AM&items=5,%206
	```
	Retorno:
	```json
	[
	  {
	    "id": 1,
	    "name": "Recicla 01",
	    "image": null,
	    "email": "teste@email.com",
	    "whatsapp": "092994246262",
	    "latitude": -3.10719,
	    "longitude": -60.0261,
	    "city": "Manaus",
	    "uf": "AM"
	  }
	]
	```

	Utilize a opção Query do Insomnia para adicionar e manipular os parâmetros.