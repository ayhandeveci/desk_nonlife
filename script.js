// PRIVATE REPO BİLGİLERİ
const OWNER = "ayhandeveci";
const REPO = "desk_nonlife_private_questions";
const FOLDER = "questions"; // PNG klasörü

async function login() {
    const FULL_TOKEN = document.getElementById("token").value.trim();

    if (!FULL_TOKEN.startsWith("github_pat_")) {
        alert("Geçerli bir GitHub PAT token gir.");
        return;
    }

    document.getElementById("login-box").style.display = "none";
    const q = document.getElementById("questions");
    q.style.display = "block";
    q.innerHTML = "<h3>Yükleniyor...</h3>";

    try {
        const res = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER}`,
            {
                headers: { Authorization: `token ${FULL_TOKEN}` }
            }
        );

        const files = await res.json();

        if (!Array.isArray(files)) {
            q.innerHTML = "<p>Erişim reddedildi. Token yanlış.</p>";
            return;
        }

        // PNG’leri göster
        let html = "";
        files.forEach(f => {
            if (f.name.endsWith(".png")) {
                html += `<img src="${f.download_url}" style="width:100%; max-width:700px; margin-bottom:30px;">`;
            }
        });

        q.innerHTML = html;

    } catch (err) {
        console.error(err);
        q.innerHTML = "<p>Bir hata oluştu.</p>";
    }
}
