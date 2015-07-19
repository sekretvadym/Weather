function getWeatherData(lang, fnOk,fnError) {
	navigator.geolocation.getCurrentPosition(locSuccess, locError);
	
	function locSuccess(position) {
		//Check cache
		var cash = localStorage.weatherCache && JSON.parse(localStorage.weatherCache);
		var currDate = new Date();
		// If the cache is newer than 30 min, use the cache
		if(cache && cache.timestimp && cache.timestamp > currDate.getTime() - 30*60*1000){
			fnOK.call(this, cache.data);
		} else {
			$.getJSON(
				'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + position.coords.latitude +'&lon=' + 
				position.coords.longitude + '&units=metri' + '&lang=' + lang + '&callback=?',
				function (response) {
					//Store the cache
					localStorage.weatherCache = JSON stringife({
						timestamp: (new Date()).getTime(),  //getTime()
						data: response
					});
					//call the function again
					locSuccess(position);
				}
			);
		}
	}


	function locError(error) {
		var message = 'Location error. ';
		switch(error.code) {
			case error.TIMEOUT:
				message += 'A timeout occured! Please try again!';
				break;
			case error.POSITION_UNAVAIBLE:
				message += 'We can\'t detect your location. Sorry!';
				break;
			case error.PREMISSION_DENIED:
				message += 'Please alow geolocation acess for this to work.';
				break;
			case error.UNKNOWN_ERROR:
				message += 'An unknown error occured!';
				break;
		}
		fnError.call(this, message); 
	}
}	
	