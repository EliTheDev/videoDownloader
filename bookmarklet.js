javascript:(function() {
  var script = document.createElement('script');
  script.textContent = `
    (async function() {
      const currentUrl = window.location.href;
      console.log(\`Searching for video\`,currentUrl);
      let path = "./out.mp4";
      let style = {
        format: "wav",
        audio: true,
        url: currentUrl
      };
      const apiUrl = "https://co.wuk.sh";
      const requestBody = {
        url: currentUrl,
        vCodec: "h264",
        vQuality: "1080",
        aFormat: "mp4",
        isAudioOnly: false,
        isNoTTWatermark: true,
        isTTFullAudio: false,
        isAudioMuted: false,
        dubLang: false
      };
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      };
      try {
        let response = await fetch("https://co.wuk.sh/api/json", requestOptions);
        if (!response.ok) throw Error("Request failed with status " + response.status);
        let responseData = await response.json();
        if (responseData.status === "stream") {
          try {
            if (responseData.status === "stream") {
              let audioUrl = responseData.url;
              console.log(responseData.url);
              new Promise(async (resolve, reject) => {
                try {
                  let audioResponse = await fetch(audioUrl);
                  if (!audioResponse.ok) throw Error(\`HTTP status \${audioResponse.status}\`);
                  window.location.assign(responseData.url);
                  console.log(\`Downloading video...\`);
                  resolve(responseData.url);
                } catch (error) {
                  console.error("Error downloading the audio file:", error.message);
                  reject(error);
                }
              });
            } else console.error("Error:", responseData.status);
          } catch (error) {
            console.error("Error:", error.message);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  `;
  document.body.appendChild(script);
})();
