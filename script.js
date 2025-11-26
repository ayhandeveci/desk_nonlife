// Global RAM değişkeni (geçici oturum hafızası)
let sessionToken = null;

const OWNER = "ayhandeveci";
const REPO = "desk_nonlife_private_questions";
const FOLDER = "questions";

async function login() {
    const token = document.getElementById("token").value.trim();

    if (token.length < 20) {
        alert("Lütfen tam token'i gir.");
        return;
    }

    // 🔐 Token sadece RAM'de tutuluyor
    sessionToken = token;

    document.getElementById("login-box").style.display = "none";
    document.getElementById("questions").style.display = "block";
    document.getElementById("questions").innerHTML = "<h3>Yükleniyor...</h3>";

    loadQuestions();
}

async function loadQuestions() {
    if (!sessionToken) {
        document.getElementById("questions").innerHTML =
            "<p>Oturum bulunamadı. Sayfayı yenileyin.</p>";
        return;
    }

    try {
        const res = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }
        );

        const files = await res.json();

        if (!Array.isArray(files)) {
            document.getElementById("questions").innerHTML =
                "<p>Erişim reddedildi. Token yanlış.</p>";
            return;
        }

        let html = "";
        files.forEach(f => {
            if (f.name.endsWith(".png")) {
                html += `
                    <div style="margin-bottom:20px;">
                        <h4>${f.name}</h4>
                        <img src="${f.download_url}" 
                             style="width:100%; max-width:700px;">
                    </div>`;
            }
        });

        document.getElementById("questions").innerHTML = html;

    } catch (err) {
        console.error(err);
        document.getElementById("questions").innerHTML =
            "<p>Bir hata oluştu.</p>";
    }
}
