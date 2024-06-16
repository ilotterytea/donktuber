function get_link_for_obs() {
    const muted_img = localStorage.getItem("muted_img");
    const speak_img = localStorage.getItem("speak_img");
    const silence_db = localStorage.getItem("silence_db");

    if (!muted_img || !speak_img || !silence_db) {
        alert("settings not set!");
        return;
    }

    const url_part = `show.html?silence_db=${silence_db}&muted_img=${muted_img}&speak_img=${speak_img}`;

    navigator.clipboard.writeText(window.location.href + url_part);
    alert("copied the url to clipboard!");

    window.location.replace(url_part);
}