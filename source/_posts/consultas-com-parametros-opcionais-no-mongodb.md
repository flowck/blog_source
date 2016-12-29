title: "Consultas com parâmetros opcionais no MongoDB"
datapost: 29/12/2016
limit: 270
shortdescription: Entenda como enviar emails dentro de aplicações web desenvolvidas em Nodejs usando o módulo Nodemailer, que é um padrão dentro da comunidade.
category: portugues
cover: "/img/posts/nodejs-dark1.jpg"
idd: 7
---

Neste artigo irei mostrar como realizar consultar numa base de dados MongoDB usando parâmetros opcionais na consulta. Os códigos abaixo partem do princípio de que se está a desenvolver uma REST API com [Nodejs](https://nodejs.org), [ExpressJS](http://expressjs.com) e [MongoDB](https://www.mongodb.com/). 

Supondo que o seu sistema possui uma coleção na base de dados com o seguinte esquema:

	var ProdutosModel = mongoose.model("produtos", new Schema({
		nome: String,
		descricao: String,
		quantidade: Number,
		imagens: [String],
		marca: String,
		data: Date,
		estado_publicacao: {type: Boolean, default: true},
		estado_desconto: {type: Boolean, default: false},
	}));

E um dos endpoints da sua API precisa retornar um `JSON` contendo todos os produtos, o seu código certamente será uma conslta como esta:

	app.get("/api/v1/produtos", function(req, res){
		ProdutosModel.find({}, function(erro, produtos){
			// Dispara o erro no terminal
			if(erro) throw erro;

			// Caso não encontrar nenhum registo na coleção
			if(produto.length === 0 || produto === null || produto === undefined){
				res.json({
					message: "Nenhuma documento na coleção produtos"
				});
				return false;
			}

			// Envia os resultados em JSON
			res.json(produtos);
		});
	});

Se tudo correr bem, o endpoint `/api/v1/produtos` deve retornar um `JSON` como este:

	[{
		nome: "Memória RAM",
		descricao: "Lorem ipsum is a DDR3 Mhz",
		quantidade: 50,
		imagens: ["/img/ram1.jpg", "/img/ram2.jpg"],
		marca: "TOSHIBA",
		data: "Thu Dec 29 2016 01:29:59 GMT+0100 (WAT)",
		estado_publicacao: true,
		estado_desconto: false
	},
	{
		nome: "Nvidia GTx",
		descricao: "Ipsum Lorem is a video card",
		quantidade: 20,
		imagens: ["/img/nvidia1.jpg", "/img/nvidia2.jpg"],
		marca: "NVIDIA",
		data: "Thu Dec 29 2016 01:31:58 GMT+0100 (WAT)",
		estado_publicacao: false,
		estado_desconto: true
	}]

Até aqui tudo bem, o endpoint retorna todos os documentos da coleção `produtos`. Se quisermos filtrar a consulta pela `marca` bastava acrescentar um parâmetro na rota e definir a propriedade marca no objecto de consulta:


	app.get("/api/v1/produtos/:marca", function(req, res){
		ProdutosModel.find({marca: req.params.marca}, function(erro, produtos){

E no final o endpoint iria retornar todos os produtos da marca NVIDIA. Simples, porém a questão que se levanta é: <b>Como podemos implementar múltiplos parâmetros na conslta?</b> Ex: Obter produtos que estejam públicados e que não tenham descontos.

Um código onde os valores dos parâmetros são passados pelas variáveis na url até resolve o problema:

	app.get("/api/v1/produtos", function(req, res){
	
		let consulta = {
			estado_publicacao: req.query.publicado,
			estado_desconto: req.query.desconto
		}

		ProdutosModel.find(consulta, function(erro, produtos){

A requisição seria feita da seguinte forma:

	http://localhost:3000/api/v1/produtos?publicado=true&desconto=false

Até aqui tudo certo. Porém o objecto de consulta espera sempre válores para os dois parâmetros. E se por ventura o utilizador quisesse simplesmente obter os produtos com descontos? Não lhe importando se o produto está ou não públicado. Neste cenário a requisição teria que ser feita deste jeito:

	http://localhost:3000/api/v1/produtos?desconto=true

Tudo bem escrito é de se esperar que a API retorne os produtos com descontos, entretanto o resultado seria um array vázio `[]`.

## Como se o código está bem escrito?!

O código acima está bem escrito porem ele não prevê a omissão de um dos parâmetros. Logo após se omitir o parâmetro `publicado` na url, o nosso código acima, envia uma consulta na base de dados com os seguintes parâmetros:

		{
			estado_publicacao: "",
			estado_desconto: true
		}

Em linguagem natural o seu sistema estária a interpretar da seguinte forma: <b>Me mostra os produtos que tenham um estado de publicação `vázio` com o estado de desconto `true`.</b>

Claramente que não existe um documento com estas características, logo é um comportamento inesperado.

## A solução: Operadores ternários

Poderiamos implmentar um monte de ifs mas isso só iria sujar o nosso código. Imaginem vocês como ficaria o código se o endpoint tivesse 20 parâmentros?

	app.get("/api/v1/produtos", function(req, res){
		let consulta = {};

		req.query.publicado ? (consulta.estado_publicado = req.query.publicado) : "";
		req.query.desconto ? (consulta.estado_desconto = req.query.desconto) : "";

		ProdutosModel.find(consulta, function(erro, produtos){

Então, acima defini um objecto vázio para a consulta, onde as suas propriedades só seriam definidas caso fossem passados valores nos parâmetros da do endpoint.

O código final ficaria assim:

	app.get("/api/v1/produtos", function(req, res){
		let consulta = {};

		req.query.publicado ? (consulta.estado_publicado = req.query.publicado) : "";
		req.query.desconto ? (consulta.estado_desconto = req.query.desconto) : "";

		ProdutosModel.find(consulta, function(erro, produtos){
			// Dispara o erro no terminal
			if(erro) throw erro;

			// Caso não encontrar nenhum registo na coleção
			if(produto.length === 0 || produto === null || produto === undefined){
				res.json({
					message: "Nenhuma documento na coleção produtos"
				});
				return false;
			}

			// Envia os resultados em JSON
			res.json(produtos);
		});
	});

O código acima funciona como se espera independentemente de que sejam passados valores nos parâmetros.

Obrigado e até a próxima. 