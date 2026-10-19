// Skript för personlig webbplats - Filip Löndén Berntsson

// 1. Mörkt läge (växla klassen 'morkt' på body)
const temaKnapp = document.querySelector("#tema");

function uppdateraTemaKnapp(arMorkt) {
    if (!temaKnapp) return;
    temaKnapp.innerHTML = arMorkt
        ? '<span class="tema-ikon" aria-hidden="true">☀️</span><span class="tema-text">Ljust läge</span>'
        : '<span class="tema-ikon" aria-hidden="true">🌙</span><span class="tema-text">Mörkt läge</span>';
    temaKnapp.setAttribute("aria-label", arMorkt ? "Växla till ljust läge" : "Växla till mörkt läge");
}

if (temaKnapp) {
    temaKnapp.addEventListener("click", () => {
        document.body.classList.toggle("morkt");
        const arMorkt = document.body.classList.contains("morkt");
        uppdateraTemaKnapp(arMorkt);
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

// 4. Hantera kontaktformulär
const kontaktForm = document.querySelector("#kontakt-form");
const formSvar = document.querySelector("#form-svar");

if (kontaktForm && formSvar) {
    kontaktForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const namnFalt = document.querySelector("#namn");
        const epostFalt = document.querySelector("#epost");
        const meddelandeFalt = document.querySelector("#meddelande");
        const knapp = kontaktForm.querySelector('button[type="submit"]');

        formSvar.textContent = "Skickar ditt meddelande…";
        formSvar.className = "form-meddelande synlig";
        knapp.disabled = true;

        try {
            const response = await fetch(
                "https://api-eu1.hsforms.com/submissions/v3/integration/submit/149565939/53ae1ec7-d6e5-458b-8a0e-580a6689b705",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fields: [
                            { name: "firstname", value: namnFalt.value.trim() },
                            { name: "email", value: epostFalt.value.trim() },
                            { name: "message", value: meddelandeFalt.value.trim() }
                        ],
                        context: {
                            pageUri: window.location.href,
                            pageName: document.title
                        }
                    })
                }
            );

            if (!response.ok) throw new Error("HubSpot kunde inte ta emot formuläret.");

            const namn = namnFalt.value.trim();
            formSvar.textContent = `Tack för ditt meddelande, ${namn}! Jag återkommer så snart som möjligt.`;
            formSvar.className = "form-meddelande synlig framgang";
            kontaktForm.reset();
        } catch (error) {
            formSvar.textContent = "Det gick inte att skicka meddelandet just nu. Försök igen eller mejla mig direkt.";
            formSvar.className = "form-meddelande synlig";
        } finally {
            knapp.disabled = false;
        }
    });
}
