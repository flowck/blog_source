title: "Requisições GET em APIs com Nodejs"
datapost: 10/06/2016
limit: 270
shortdescription: No acto de desenvolvimento de uma aplicação em algum momento, dependendo do escopo do projecto, poderá ser necessário interagir com uma REST API.
category: portugues
cover: "/img/posts/nodejs-dark1.jpg"
idd: 5
---

No acto de desenvolvimento de uma aplicação web, dependendo do escopo do projecto poderá ser necessário interagir com uma RESTfull API de um WebService. 

Nesse artigo irei demonstrar como realizar requisições GET usando somente o módulo http do Nodejs.

## Requisação GET

A requisição GET, tal como as outras do protocolo <b>http</b> são realizadas por intermédio do módulo [http](https://nodejs.org/api/http.html) do Nodejs. Para usa-lo basta um simples require no script. O método <i><b>http.request(options, callback);</b></i> é responsável por realizar as requisições http.

Procurei ser mais prático logo como primeiro exemplo irei realizar uma requisição GET na API pública do [OpenWeatherMap](http://openweathermap.org/). Para tal necessito de um chave. Inscreva-se para obter a sua chave [aqui](http://home.openweathermap.org/users/sign_up).

    // Adiciona o módulo http no script
    var http = require("http");

    var apikey = "suaAPIKey";

    // Opções da requisição
    var options = {
        method: "GET",
        hostname: "api.openweathermap.org",
        path: "/data/2.5/weather?q=Benguela&APPID=" + apikey,
        port: 80
    }

    var GET = http.request(options, function(res){

        var response = "";

        // Enquanto chegar dados na resposta
        res.on("data", function(chunk){
            response += chunk;
        });

        // Ao terminar a requisição
        res.on("end", function(){
            console.log(response);
            return response;    
        });

        // Tratamento dos erros ao requisitar
        res.on("error", function(err){
            console.log("Oops, houve um erro na requisição: " + err);
        })
    
    });

    // Termina a requisção
    GET.end();

Salve o seu script e execute-o. Se tudo correr bem o seu script irá retornar um JSON.

![Resposta da requisição](/img/posts/get-response.png)

O que realmente acontece no script acima? Como a ideia é realizar um requisição GET logo foi necessário incluir o módulo <b>http</b> que vem nativamente no Nodejs. A seguir defini as opções do método http.request(); em um objecto afim de ser passado como primeiro parâmetro no mesmo método.

Nas opções defini apenas as propriedades básicas para uma requisição GET, existem [outras](https://nodejs.org/api/http.html#http_http_request_options_callback).

- method - Recebe uma string indicando o tipo de requisição. Ex: GET, POST.
- hostname - Recebe uma string com a URL base. Ex: www.google.com
- path - Recebe uma string contendo as opções ou directorias da url base. Ex: /photos?id=5
- port - Recebe um integer especificando um número da porta em que o servidor é escutado. Ex: 3000

A seguir atribui à variável <b>GET</b> a invocação do método <b>http.request()</b>, no mesmo passei a variável <b>options</b> como primeiro parâmetro e uma função anónima como segundo parâmetro. É nesta função anonima onde a mágia acontece.

A reposta da requisição não traz somente o valor que é esperado, no caso o JSON contendo as informações metereológicas de Benguela. Na verdade é retornado um objecto gigante (mais de 500 linhas) contendo diversas informações sobre o processo todo da requisição. Veja abaixo um pequeno trecho do mesmo ou a versão completa no [Github](https://gist.github.com/flowck/708fd1d1896fc99c63172368d232a612).

    IncomingMessage {
      _readableState: 
       ReadableState {
         objectMode: false,
         highWaterMark: 16384,
         buffer: [],
         length: 0,

         .
         .
         .

     socket: [Object],
            incoming: [Circular],
            maxHeaderPairs: 2000,
            onIncoming: [Function: parserOnIncomingClient] },
         res: [Circular] } }

Pois bem, é na função anonima onde é capturado conteúdo em pedaços (chunk) enquanto a requisição é processada, armazenado e são tratados os erros caso existam. Isto por intermédio dos eventos "data", "end" e "error" escutados no objecto da requisição, acima definido como <b>res</b>.

Por último e não menos importante, declara-se o fim da requisição. O Nodejs retorna um erro para requisições inifitas. ;)

## Referências

* [Nodejs Documentation](https://nodejs.org/docs/latest-v5.x/api/http.html#http_http_request_options_callback)