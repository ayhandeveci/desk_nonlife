const PASSWORD = "1234";   // Şifreyi buradan değiştir

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

function loadImages() {

    const images = [

"2013_Aralik_1.png",
"2013_Aralik_2.png",
"2013_Aralik_3.png",
"2013_Aralik_4.png",
"2013_Aralik_5.png",
"2013_Aralik_6.png",
"2013_Aralik_7.png",
"2013_Aralik_8.png",

"2014_Aralik_1.png",
"2014_Aralik_2.png",
"2014_Aralik_3.png",
"2014_Aralik_4.png",
"2014_Aralik_5.png",
"2014_Aralik_6.png",
"2014_Aralik_7.png",

"2015_Aralik_1.png",
"2015_Aralik_2.png",
"2015_Aralik_3.png",
"2015_Aralik_4.png",
"2015_Aralik_5.png",
"2015_Aralik_6.png",
"2015_Aralik_7.png",

"2016_Aralik_1.png",
"2016_Aralik_2.png",
"2016_Aralik_3.png",
"2016_Aralik_4.png",
"2016_Aralik_5.png",
"2016_Aralik_6.png",
"2016_Aralik_7.png",

"2017_Aralik_1.png",
"2017_Aralik_2.png",
"2017_Aralik_3.png",
"2017_Aralik_5.png",
"2017_Aralik_6.png",
"2017_Aralik_7.png",

"2018_Aralik_1.png",
"2018_Aralik_2.png",
"2018_Aralik_3.png",
"2018_Aralik_4.png",
"2018_Aralik_5.png",
"2018_Aralik_6.png",
"2018_Aralik_7.png",

"2019_Aralik_1.png",
"2019_Aralik_2.png",
"2019_Aralik_3.png",
"2019_Aralik_4.png",
"2019_Aralik_5.png",
"2019_Aralik_6.png",
"2019_Aralik_7.png",

"2021_Kasim_1.png",
"2021_Kasim_2.png",
"2021_Kasim_3.png",
"2021_Kasim_4.png",
"2021_Kasim_5.png",
"2021_Kasim_6.png",
"2021_Kasim_7.png",

"2021_Mayis_1.png",
"2021_Mayis_2.png",
"2021_Mayis_3.png",
"2021_Mayis_4.png",
"2021_Mayis_5.png",
"2021_Mayis_6.png",
"2021_Mayis_7.png",

"2022_Aralik_1.png",
"2022_Aralik_2.png",
"2022_Aralik_3.png",
"2022_Aralik_4.png",
"2022_Aralik_5.png",
"2022_Aralik_6.png",
"2022_Aralik_7.png",

"2023_Aralik_2.png",
"2023_Aralik_5.png",
"2023_Aralik_7.png",
"2023_Aralik_9.png",
"2023_Aralik_12.png",
"2023_Aralik_13.png",
"2023_Aralik_15.png",

"2024_Aralik_1.png",
"2024_Aralik_2.png",
"2024_Aralik_3.png",
"2024_Aralik_4.png",
"2024_Aralik_5.png",
"2024_Aralik_6.png",
"2024_Aralik_7.png",
"2024_Aralik_8.png",
"2024_Aralik_9.png",
"2024_Aralik_11.png",
"2024_Aralik_13.png",
"2024_Aralik_15.png"

    ];

    const container = document.getElementById("questions");

    images.forEach(file => {
        const img = document.createElement("img");
        img.src = "../questions/" + file;
        container.appendChild(img);
    });
}
