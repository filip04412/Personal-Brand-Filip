// Skript för personlig webbplats - Filip Löndén Berntsson

// 1. Mörkt läge (växla klassen 'morkt' på body)
const temaKnapp = document.querySelector("#tema");

if (temaKnapp) {
    temaKnapp.addEventListener("click", () => {
        document.body.classList.toggle("morkt");
        const arMorkt = document.body.classList.contains("morkt");
        temaKnapp.textContent = arMorkt ? "☀️" : "🌙";
        temaKnapp.setAttribute("aria-label", arMorkt ? "Växla till ljust läge" : "Växla till mörkt läge");
    });
}

// 2. Visa mer / Visa mindre (om funktionen används)
const knapp = document.querySelector("#visa-mer");
const mer = document.querySelector("#mer");

if (knapp && mer) {
    mer.classList.add("gomd");
    knapp.addEventListener("click", () => {
        mer.classList.toggle("gomd");
        const arGomd = mer.classList.contains("gomd");
        knapp.textContent = arGomd ? "Visa mer" : "Visa mindre";
        knapp.setAttribute("aria-expanded", String(!arGomd));
    });
}

// 3. Kopiera mejladress med ett klick (bonus)
const kopiera = document.querySelector("#kopiera");

if (kopiera) {
    kopiera.addEventListener("click", () => {
        navigator.clipboard.writeText("Filip.londen.berntsson@gmail.com");
        kopiera.textContent = "Kopierat!";
        setTimeout(() => {
            kopiera.textContent = "Kopiera mejl";
        }, 2000);
    });
}
