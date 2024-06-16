const img_preview = document.getElementById("preview");

const muted_img = document.getElementById("muted_img");

muted_img.addEventListener("change", function () {
    show_and_save_image(muted_img, "muted_img");
});

const speak_img = document.getElementById("speak_img");

speak_img.addEventListener("change", function () {
    show_and_save_image(speak_img, "speak_img");
});

function show_and_save_image(input, name) {
    const files = input.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            localStorage.setItem(name, this.result);
        });
    }
}

const silence_slider = document.getElementById("silence_slider");

if (localStorage.getItem("silence_db")) {
    silence_slider.value = localStorage.getItem("silence_db");
} else {
    localStorage.setItem("silence_db", silence_slider.value);
}

const silence_slider_db = document.getElementById("silence_slider_db");
silence_slider_db.innerHTML = silence_slider.value;

silence_slider.addEventListener("change", function () {
    localStorage.setItem("silence_db", silence_slider.value);
    silence_slider_db.innerHTML = silence_slider.value;
});