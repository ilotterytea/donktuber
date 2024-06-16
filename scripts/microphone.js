if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const volumeHtml = document.getElementById("volume");
    const previewHtml = document.getElementById("preview");

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);

            scriptProcessor.onaudioprocess = function () {
                const array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                let values = 0;

                for (let i = 0; i < array.length; i++) {
                    values += array[i];
                }

                const average = values / array.length;
                const volume = Math.round(average);

                const decibels = 20 * Math.log10(volume / 255);
                
                if (volumeHtml) {
                    volumeHtml.innerText = `${decibels.toFixed(2)} dB`;
                }

                const muted = localStorage.getItem("muted_img");
                const speak = localStorage.getItem("speak_img");
                const silence_db = localStorage.getItem("silence_db");

                if (muted && previewHtml.src != muted && decibels <= silence_db) {
                    previewHtml.src = muted;
                }

                if (speak && previewHtml.src != speak && decibels > silence_db) {
                    previewHtml.src = speak;
                }
            };
        })
        .catch(err => {
            console.error('The following getUserMedia error occurred: ' + err);
        });
} else {
    console.warn('getUserMedia not supported on your browser!');
}