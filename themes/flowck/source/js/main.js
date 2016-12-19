(function(){
	
	/*
	* Projects page
	*/

	// DOM ELEMENTS
	var mobileMenu = document.querySelector(".mobile-menu");
	var menuButton = document.querySelector(".menu-button");

	// Enable / Disable menu
	menuButton.addEventListener("click", function(){
		
		console.log(menuButton.id === "off");

		if(menuButton.id === "off"){

			// Enable menu
			menuButton.classList.add("menu-button-on");
			mobileMenu.classList.add("mobile-menu-on");
			console.log("OK ON");

			menuButton.id = "on";

		}else{

			// Disable menu
			menuButton.classList.remove("menu-button-on");
			mobileMenu.classList.remove("mobile-menu-on");
			console.log("OK OFF");

			menuButton.id = "off";

		}

	}, false);



}())