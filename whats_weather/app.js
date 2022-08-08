window.addEventListener('load', (evnt) => {

	// # data initial # 
	let long;
	let lat;

	let arrElnts = [ 
		".temperature", 
		".degree-span", 
		".temperature-description", 
		".temperature-degree", 
		".location-timezone" 
	];

	// # get visual elements #
	const {
		temperatureSection,
		degreeSpan,
		temperatureDescription, 
		temperatureDegree,
		locationTimezone
	} = getElmentsHTML(arrElnts);


	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(( position ) => {

			// # get current coords from browser # 			
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxie = 'https://cors/anywere.herokuapp.com/';
			const api = `${proxie}api/${lat}, ${long}`;

			fetch(api)
			.then(response =>  {
				return response.json();
			})
			.then(data => {

				// # get elements from the API # 
				const { temperature, summary, icon } = data.currently;

				// # set elements from the API # 
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;

				// # Formula for Ceulsius # 
				let celsius = (temperature - 32) * (5 / 9);

				// # set icon # 
				setIcons(icon, document.querySelector(".icon"));

				// # change temperature to Celsius/ Farenheit
				degreeSection.addEventListener("click", () => {

					if (temperatureSpan.textContent === "F") {

						temperatureSpan.textContent = "C";
						temperatureDegree.textContent = Math.floot(celsius);

					} else {

						temperatureSpan.textContent = "F";
						temperatureDegree = temperature;
					}

				});

			});

		});

	} else {

		alert("Hey dis is not working because reason...");

	}

	function setIcons(icon, iconID) {

		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();

		skyicons.play();

		return skyicons.set(iconID, Skycons[currentIcon]);

	}

});

function getElmentsHTML(array) {
	array.forEach((element) => document.querySelector(element));
	objElements = { elnts: array};

	return objElements;
}