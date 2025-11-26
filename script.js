let sessionToken = null;

const OWNER = "ayhandeveci";
const REPO = "desk_nonlife_private_questions";
const FOLDER = "questions";

// GİRİŞ
async function login() {
    const token = document.getElementById("token").value.trim();

    if (token.length < 20) {
        alert("Tam token gir.");
        return;
    }

    sessionToken = token;

    document.getElementById("login-box").style.display = "none";
    document.getElementById("app").style.display = "flex";

    loadFiles();
}

// DOSYA LİSTESİNİ ÇEK
async function loadFiles() {
    const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER}`,
        { headers: { Authorization: `Bearer ${sessionToken}` } }
    );

    const files = await res.json();

    if (!Array.isArray(files)) {
        document.getElementById("file-list").innerHTML =
            "<p>Erişim reddedildi. Token yanlış.</p>";
        return;
    }

    // Sadece PNG'leri al
    const pngs = files.filter(f => f.name.endsWith(".png"));

    // A-Z sıralama
    pngs.sort((a, b) => a.name.localeCompare(b.name));

    // Sol menüye bas
    let html = "";
    pngs.forEach(f => {
        html += `
            <div onclick="showImage('${f.download_url}', '${f.name}')"
                 style="padding:8px; cursor:pointer; border-bottom:1px solid #eee;">
                ${f.name}
            </div>
        `;
    });

    document.getElementById("files").innerHTML = html;
}

// SAĞ PANELDE PNG GÖSTER
function showImage(url, name) {
    const img = document.getElementById("preview");
    img.src = url;
    img.style.display = "block";

    document.getElementById("viewer").scrollTop = 0;
}
