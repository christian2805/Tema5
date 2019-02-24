// venter på at html strukturen er loaded før den påvirker det med javascript. for at undgå fejl, -bruges mest til store sider
document.addEventListener("DOMContentLoaded", hentJson);


var filterbutton = document.querySelector("#filterbutton");
var burgerMenu = document.querySelector("#burger-menu");
// tomt array
let retter = [];
let filter = "alle";
let dest = document.querySelector("#skriv");


async function hentJson() {
    //henter array info fra onlie skema
    let myJson = await
    //første forsøg........................
    fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1b33SPLmeu6AHr0g1iGkWHxNKihz-PuicvyxBIH1o5ek");
    //Andet forsøg!!!!!!!
    //    fetch("http://helf-kea.dk//google_spread_cleaner/clean_up_spreadsheet.php?id=1b33SPLmeu6AHr0g1iGkWHxNKihz-PuicvyxBIH1o5ek");
    retter = await myJson.json();


    console.log("DOM Klar");
    udMedret();
}

function udMedret() {
    // siger at htmlen skal være tom og fylder det derefter
    dest.innerHTML = "";
    // her siger vi at hver af elementerne i retter hedder ret. Nu ved den det!
    retter.forEach(ret => {
        if (filter == "alle" || filter == ret.kategori) {
            let template =
                `<article class="enkelt"> <h3 class="h2">${ret.titel}</h3>
<img class="imgret" src="img/${ret.billede}.jpg" alt="${ret.navn}"> <p>Pris: ${ret.pris}.-</p> <p>${ret.beskrivelse}</p></br></article>`;
            // insertAdjecentHTML kan bruges sammen med eventlistener
            dest.insertAdjacentHTML("beforeend", template);
            // hvert element kommer til at være det sidste, da de bliver smidt ind en af gangen, SMART!
            dest.lastElementChild.addEventListener("click", () => {
                visSingle(ret);
            });
        }
    });
    console.log("Retter klar");
}

function visSingle(ret) {
    document.querySelector("#indhold").innerHTML = `<article class="enkelt enkelt1"> <h2 class="h2">${ret.titel}</h2><img class="etbillede" src="img/${ret.billede}.jpg" alt="${ret.titel}"><p>Pris: ${ret.pris},-</p> <p>${ret.beskrivelse}</p> </article>`;
    document.querySelector("#popup").style.display = "block";
    document.querySelector("#popup #luk").addEventListener("click", close);

}

function close() {
    document.querySelector("#popup").style.display = "none";
}

document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", filterKat);
});
// her filtrere vi arrayet efter hvilken knap der er trykket på
function filterKat() {
    console.log("filterKat");
    // data- bruges til at gemme info, og kan hentes ved getAttribute
    filter = this.getAttribute("data-ret");
    document.querySelector("h4").textContent = this.textContent;

    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    });
    this.classList.add("valgt");
    console.log("Farve på!");
    udMedret();
}


function openSidebar() {
    if (!(burgerMenu.style.display == "block")) {
        burgerMenu.style.display = "block";
    } else {
        burgerMenu.style.display = "none";
    }
}

function openFilter() {
    console.log("Somthing");
    if (!(filterbutton.style.display == "block")) {
        filterbutton.style.display = "block";

    } else {
        filterbutton.style.display = "none";
    }
}
