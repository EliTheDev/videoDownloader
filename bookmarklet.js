const currentUrl = window.location.href;
let path = "./out.mp4";
let style = {
format: 'wav',
audio:true,
url: currentUrl
};

const apiUrl = 'https://co.wuk.sh';

const requestBody = {
  url: currentUrl,
  vCodec: 'h264',
  vQuality: '1080',
  aFormat: 'mp4',
  isAudioOnly: false,
  isNoTTWatermark: true,
  isTTFullAudio: false,
  isAudioMuted: false,
  dubLang: false
};

const requestOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
};

try {
  const response = await fetch(`${apiUrl}/api/json`, requestOptions);

  if (!response.ok) {
    throw new Error('Request failed with status ' + response.status);
  }

  const responseData = await response.json();

  if (responseData.status === 'stream') {
    console.log(responseData);
    try {
      // Handle the API response
      // Check the status in the response
      if (responseData.status === "stream") {
        // Video download was successful
    
        // Replace with the URL of the audio file you want to download
        const audioUrl = responseData.url;
        console.log(responseData.url);
        // Wrap the asynchronous file download operation in a Promise
        const downloadPromise = new Promise(async (resolve, reject) => {
          try {
            const response = await fetch(audioUrl);
            console.log(responseData.status);
            if (!response.ok) {
              throw new Error(`HTTP status ${response.status}`);
            }
    
            window.location.assign(responseData.url);
    
            console.log(`Audio file downloaded to ${path}`);
            resolve(responseData.url); // Resolve the Promise when the download is complete
          } catch (error) {
            console.error("Error downloading the audio file:", error.message);
            reject(error); // Reject the Promise in case of an error
          }
        });
    
        // Wait for the Promise to resolve before completing the function
        //return downloadPromise;
      } else {
        // Handle other response statuses (error, redirect, etc.) as needed
        console.error("Error:", responseData.status);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error.message);
    }
    //return responseData;
  }
} catch (error) {
  console.error('Error:', error);
}
