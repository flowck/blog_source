title: "Como enviar emails com o Nodejs"
datapost: 19/12/2016
limit: 270
shortdescription: No acto de desenvolvimento de uma aplicação em algum momento, dependendo do escopo do projecto, poderá ser necessário interagir com uma REST API.
category: portugues
cover: "/img/posts/nodejs-dark1.jpg"
idd: 6
---

Em algum momento a sua aplicação poderá necessitar informar o utilizador. Emails de confirmação de inscrição, emails de recuperação de password, emails informativos. São vários os motivos que fazem com que a sua aplicação tenha que agir como um pseudo-cliente de emails. 

Então, irei demonstrar como enviar e-mails usando nada mais nada menos que Nodejs e o módulo [nodemailer](https://nodemailer.com/).

## Sobre o nodemailer

É um módulo Nodejs devidamente testado que permite o envio de emails a partir de uma aplicação node. O projecto existe desde 2010 e hoje é uma opção standard na comunidade para envio de emails. Foi inicialmente desenvolvido pelo [Andris Reinman](https://github.com/andris9).

## Script básico para envio de emails

Comece por criar um diretório e dentro da mesma crie um ficheiro `mail.js`:

	mkdir enviodeemail
	cd enviodeemail

Dentro do ficheiro `mail.js` digite o seguinte código:

	var nodemailer = require("nodemailer");

	var transporter = nodemailer.createTransport({
		host: "smtp.teudominio.co.ao",
		port: 465,
		secure: true,
		auth: {
			user: "voce@teudominio.co.ao",
			pass: "tuapassword"
		}
	});

	var mailOptions = {
		from: '"Você" <voce@teudominio.co.ao>',
		to: "flowck96@gmail.com",
		subject: "Nodejs - Teste para o tutorial ✔✔",
		text: "O teste foi efectuado com sucesso"
	}

	transporter.sendMail(mailOptions, function(err, info){
		if(err){
			console.log(err);
		}else{
			console.log("Mensagem enviada com sucesso");
		}
	});


Substitua com os seus dados e faça o teste:

	node mail.js
	
Se os teus dados estiverem correctos então o terminal irá retornar:

	Mensagem enviada com sucesso


![enviada com sucesso](/img/posts/nodemailer-gmail.png)

Ok, no script acima foi importado o módulo nodemailer. Para envio de emails com o mesmo, é necessário um `transporter`, que é o objecto que irá realizar a tarefa de enviar mails. O `nodemailer` permite criar <i>transporters</i> através do método `createTransport()`, este por sua vez recebe como parâmetro um objecto com os dados do seu servidor de email.

	var transporter = nodemailer.createTransport({
		host: "smtp.teudominio.co.ao",
		port: 465,
		secure: true,
		auth: {
			user: "voce@teudominio.co.ao",
			pass: "password_do_teu_email"
		}
	});

Tendo o <i>transporter</i> criado e bem configurado, já se pode definir os dados do mail, como destino, assunto e corpo do email. Por meio de um objecto passamos essas definições da seguinte forma:

	var mailOptions = {
		from: '"Você" <voce@teudominio.co.ao>',
		to: "flowck96@gmail.com",
		subject: "Nodejs - Teste para o tutorial ✔✔",
		text: "O teste foi efectuado com sucesso"
	}

Uma vez criado o transporter e o objecto com as definições do mail, podemos então proceder com o envio do mail usando o método `sendMail()` que fica disponível no transporter tão logo ele é criado.

O método `sendMail()` recebe como parâmetros o objecto com as definições do mail e uma função callback para lidar com os erros e a mensagem de sucesso:

	transporter.sendMail(mailOptions, function(err, info){
		if(err){
			console.log(err);
		}else{
			console.log("Mensagem enviada com sucesso");
		}
	});


Com este script básico você poderá enviar mails a partir da sua aplicação em node. Este é um post bastante curto e objectivo para demonstrar como são enviados mails a partir de aplicações em Node. Para mais informações recomendo a leitura da [documentação oficial](https://nodemailer.com/). Até a próxima.

