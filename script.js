//---------------------------------------------------------
// 1) Kullanıcı tokenini tam girecek
//---------------------------------------------------------
let USER_TOKEN = "";

//---------------------------------------------------------
// 2) Repo bilgileri (private repo)
//---------------------------------------------------------
const OWNER = "ayhandeveci";
const REPO = "desk_nonlife_private_questions";
const FOLDER = "questions";

//---------------------------------------------------------
// 3) Panel aç/kapa
//---------------------------------------------------------
let isMenuOpen = true;

function toggleMenu() {
    const menu = document.getElementById("file-list");

    if (isMenuOpen) {
        menu.style.transform = "translateX(-260px)";
    } else {
        menu.style.transform = "translateX(0)";
    }

    isMenuOpen = !isMenuOpen;
}

//---------------------------------------------------------
// 4) Login → Kullanıcıdan tam token al
//---------------------------------------------------------
function login() {
    USER_TOKEN = prompt("Lütfen GitHub tokeninizi tamamen giriniz:");

    if (!USER_TOKEN || USER_TOKEN.length < 10) {
        alert("Geçersiz token!");
        return;
    }

    loadFiles();
}

//---------------------------------------------------------
// 5) PNG LISTESINI ÇEK
//---------------------------------------------------------
async function loadFiles() {
    const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER}`,
        {
            headers: { Authorization: `token ${USER_TOKEN}` }
        }
    );

    const data = await res.json();

    if (!Array.isArray(data)) {
        alert("Yetkisiz erişim. Token yanlış.");
        return;
    }

    let html = "";

    data
        .filter(f => f.name.endsWith(".png"))
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(f => {
            html += `
                <div 
                    onclick="showImage('${f.download_url}')"
                    style="cursor:pointer; padding:6px 0; border-bottom:1px solid #eee;">
                    ${f.name}
                </div>
            `;
        });

    document.getElementById("files").innerHTML = html;
}

//---------------------------------------------------------
// 6) SAĞ PANELDE SORU GÖSTER
//---------------------------------------------------------
function showImage(url) {
    document.getElementById("question-area").innerHTML =
        `<img src="${url}" style="width:100%; max-width:900px;">`;
}

//---------------------------------------------------------
// 7) SAYFA AÇILDIĞINDA TOKEN SOR
//---------------------------------------------------------
window.onload = login;
