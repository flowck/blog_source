"use strict";

(function(window){

	// Get browser language
	var language = window.navigator.language;

	// Redirect to a specific directory
	if(language === "pt-PT" || "pt-BR"){
		window.location = "/pt";
	}else{
		window.location = "/en";
	}

}(window));