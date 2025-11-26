let sessionToken = null;

const OWNER = "ayhandeveci";
const REPO = "desk_nonlife_private_questions";
const QUESTIONS = "questions";
const ANSWERS = "answers";

let isMenuOpen = true;

// SOL MENÜYÜ AÇ/KAPAT
function toggleMenu() {
    const menu = document.getElementById("file-list");

    if (isMenuOpen) {
        menu.style.width = "0px";
        menu.style.padding = "0px";
    } else {
        menu.style.width = "260px";
        menu.style.padding = "10px";
    }

    isMenuOpen = !isMenuOpen;
}


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


// SORULARI LİSTELE
async function loadFiles() {
    const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${QUESTIONS}`,
        { headers: { Authorization: `Bearer ${sessionToken}` } }
    );

    const files = await res.json();

    if (!Array.isArray(files)) {
        document.getElementById("files").innerHTML =
            "<p>Erişim reddedildi. Token yanlış.</p>";
        return;
    }

    const pngs = files.filter(f => f.name.endsWith(".png"));

    pngs.sort((a, b) => a.name.localeCompare(b.name));

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


// SORU + CEVAP GÖSTERME
async function showImage(url, fileName) {
    // SORUYU GÖSTER
    const qImg = document.getElementById("questionImg");
    qImg.src = url;
    qImg.style.display = "block";

    // CEVAP BULMAYA ÇALIŞ
    const answerUrl = await findAnswer(fileName);

    const aImg = document.getElementById("answerImg");
    const noAnswer = document.getElementById("noAnswer");

    if (answerUrl) {
        aImg.src = answerUrl;
        aImg.style.display = "block";
        noAnswer.style.display = "none";
    } else {
        aImg.style.display = "none";
        noAnswer.style.display = "block";
    }

    document.getElementById("viewer").scrollTop = 0;
}


// SORU DOSYASINA GÖRE CEVABI BUL
async function findAnswer(questionFileName) {
    const answerName = questionFileName.replace(".png", "_cevap.png");

    try {
        const res = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${ANSWERS}/${answerName}`,
            { headers: { Authorization: `Bearer ${sessionToken}` } }
        );

        const data = await res.json();

        if (data.download_url) return data.download_url;

        return null;
    } catch {
        return null;
    }
}
