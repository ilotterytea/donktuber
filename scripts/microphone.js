if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const volumeHtml = document.getElementById("volume");

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(stream);

            audioContext.audioWorklet.addModule("scripts/volume_processor.js")
                .then(() => {
                    const volumeNode = new AudioWorkletNode(audioContext, "volume_processor");
                    source.connect(volumeNode).connect(audioContext.destination);

                    volumeNode.port.onmessage = (event) => {
                        const volume = event.data;
                        const db = 20 * Math.log10(volume);

                        volumeHtml.innerHTML = `${db.toFixed(2)} dB`;
                    };
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.error('The following getUserMedia error occurred: ' + err);
        });
} else {
    console.warn('getUserMedia not supported on your browser!');
}