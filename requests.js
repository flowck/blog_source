var http = require("http");

var apikey = "63193c0cc45c99f031a929e0e3b6b6d5";

var options = {
	method: "GET",
	hostname: "api.openweathermap.org",
	path: "/data/2.5/weather?q=Benguela&APPID=" + apikey,
	port: 80
}

var GET = http.request(options, function(res){

	console.log(res);

	var response = "";

	res.on("data", function(chunk){
		response += chunk;
	});

	res.on("end", function(){
		//console.log(response);
		return response;	
	});

	res.on("error", function(err){
		console.log("Oops, houve um erro na requisição: " + err);
	})
	
});

// Termina a requisção
GET.end();

