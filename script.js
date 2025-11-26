// Token'in sabit kısmı (son 8 hane yok)
const TOKEN_PREFIX = "github_pat_11AVQUQKA0KNiexhIMylGz_UelSquaedESvzJD63ZQ7mn7xrniKyYychPmK5A69IgiILVHFXNK"; 

// PNG'lerin olduğu private repo
const OWNER = "ayhandeveci";
const REPO = "desk_nonlife_private_questions";
const FOLDER = "questions"; // PNG klasörü

async function login() {
    const last8 = document.getElementById("pwd").value.trim();

    if (last8.length !== 8) {
        alert("Token'in son 8 hanesini girmelisin!");
        return;
    }

    const FULL_TOKEN = TOKEN_PREFIX + last8;

    document.getElementById("login-box").style.display = "none";
    document.getElementById("questions").style.display = "block";
    document.getElementById("questions").innerHTML = "<h3>Yükleniyor...</h3>";

    try {
        const res = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER}`,
            {
                headers: { Authorization: `token ${FULL_TOKEN}` }
            }
        );

        const files = await res.json();

        if (!Array.isArray(files)) {
            document.getElementById("questions").innerHTML =
                "<p>Erişim reddedildi. Son 8 yanlış.</p>";
            return;
        }

        // PNG’leri göster
        let html = "";
        files.forEach(f => {
            if (f.name.endsWith(".png")) {
                html += `<img src="${f.download_url}" style="width:100%; max-width:700px; margin-bottom:30px;">`;
            }
        });

        document.getElementById("questions").innerHTML = html;

    } catch (err) {
        console.error(err);
        document.getElementById("questions").innerHTML =
            "<p>Bir hata oluştu.</p>";
    }
}
