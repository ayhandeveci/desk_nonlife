const PASSWORD = "1234";   // ŞİFRE — değiştirilebilir

function login() {
    const entered = document.getElementById("pwd").value;

    if (entered !== PASSWORD) {
        alert("Yanlış şifre!");
        return;
    }

    document.getElementById("login-box").style.display = "none";
    document.getElementById("questions").style.display = "block";

    loadImages();
}

// PNG dosyalarını burada listeleyeceksin
function loadImages() {

    const images = [
        // ÖRNEK — kendi PNG isimlerinle değiştireceksin
        "Finans_2014_1.png",
        "Finans_2014_2.png"
    ];

    const container = document.getElementById("questions");

    images.forEach(file => {
        const img = document.createElement("img");
        img.src = "../questions/" + file;
        container.appendChild(img);
    });
}
