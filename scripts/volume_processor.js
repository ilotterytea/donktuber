class VolumeProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.volume = 0;
    }

    process(inputs) {
        const input = inputs[0];
        if (input.length > 0) {
            const channelData = input[0];
            let sum = 0;

            for (let i = 0; i < channelData.length; i++) {
                sum += channelData[i] * channelData[i];
            }

            this.volume = Math.sqrt(sum / channelData.length);

            // Отправляем громкость в основной поток
            this.port.postMessage(this.volume);
        }

        return true;
    }
}

registerProcessor('volume_processor', VolumeProcessor);
