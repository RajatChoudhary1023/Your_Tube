function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        }, function(error) {
          reject('Error occurred. Error code: ' + error.code);
        });
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  function isSouthIndia(latitude, longitude) {
    // Latitude and Longitude boundaries for South India
    const southIndiaLatRange = [8.0, 14.5];  
    const southIndiaLngRange = [76.5, 92.0]; 

    return latitude >= southIndiaLatRange[0] && latitude <= southIndiaLatRange[1] &&
           longitude >= southIndiaLngRange[0] && longitude <= southIndiaLngRange[1];
  }

    async function checkIfSouthIndia() {
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position;

      const isInSouthIndia = isSouthIndia(latitude, longitude);

      // Return 1 if location is in South India, else 0
      return isInSouthIndia ? 1 : 0;
    } catch (error) {
      console.error(error);
      return 0;  
    }
  }
export default checkIfSouthIndia;