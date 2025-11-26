// TOKEN’IN SENDE KALAN İLK KISMI (örnek)
const TOKEN_PREFIX = "github_pat_11AVQUQKA0KNiexhIMylGz_UelSquaedESvzJD63ZQ7mn7xrniKyYychPmK5A69IgiILVHFXNK";  

let FULL_TOKEN = null; // burada birleşmiş token tutulacak

// Kullanıcı giriş yapınca çağrılır
function login() {
    const suffix = document.getElementById("pwd").value.trim(); // son 8 hane
    if (suffix.length !== 8) {
        alert("Son 8 haneyi girmelisin.");
        return;
    }

    // Tam token oluştur
    FULL_TOKEN = TOKEN_PREFIX + suffix;

    document.getElementById("login-box").style.display = "none";
    document.getElementById("questions").style.display = "block";

    loadImages();
}

// Private repo bilgileri
const OWNER = "ayhandeveci";
const REPO  = "desk_nonlife_private_questions";
const PATH  = "questions";  // PNG klasörü

// Private repo'dan PNG listesini çek
async function loadImages() {

    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${FULL_TOKEN}` }
    });

    if (!response.ok) {
        document.getElementById("questions").innerHTML =
            "<p style='color:red;'>Token hatalı veya erişim yok.</p>";
        return;
    }

    const files = await response.json();
    const pngs = files.filter(f => f.name.endsWith(".png"));

    const container = document.getElementById("questions");

    pngs.forEach(file => {
        const img = document.createElement("img");
        img.src = file.download_url + `?auth=${FULL_TOKEN}`;
        img.style.width = "100%";
        img.style.marginBottom = "30px";
        container.appendChild(img);
    });
}
