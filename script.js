// Load spells from JSON file
document.addEventListener("DOMContentLoaded", function () {
    fetch("spells.json")
        .then(response => response.json())
        .then(data => renderSpells(data));
});

// Render spells in the list
function renderSpells(spells) {
    const spellList = document.getElementById("spellList");
    spellList.innerHTML = "";

    spells.forEach(spell => {
        let listItem = document.createElement("li");

        listItem.innerHTML = `
            <span>${spell.name} (Level ${spell.level})</span>
            ${spell.description.includes("Heightened") ? '<span class="heightened-icon">H</span>' : ""}
            <button onclick="showSpellDetails('${spell.name}')">Details</button>
        `;

        spellList.appendChild(listItem);
    });
}

// Show spell details in modal
function showSpellDetails(spellName) {
    fetch("spells.json")
        .then(response => response.json())
        .then(spells => {
            const spell = spells.find(s => s.name === spellName);
            if (!spell) return;

            let spellDetails = document.getElementById("spellDetails");
            spellDetails.innerHTML = `
                <h2>${spell.name} (Level ${spell.level})</h2>
                <p>${spell.description.replace(/(Heightened \(\+\d+\))/g, '<span class="heightened-text">$1</span>')}</p>
            `;

            let spellModal = document.getElementById("spellModal");
            spellModal.style.display = "block";
        });
}

// Close modal
function closeModal() {
    document.getElementById("spellModal").style.display = "none";
}
