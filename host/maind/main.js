function updateName() {
    var nameInput = document.getElementById("name");
    var name = nameInput.value;

    var nameText = document.getElementById("nameText");
    nameText.innerHTML = name;
    nameInput.disabled = true
}

function selectTeam() {
    var teamSelect = document.getElementById("team");
    var selectedTeam = teamSelect.options[teamSelect.selectedIndex].text;

    var teamText = document.getElementById("teamText");
    teamText.innerHTML = selectedTeam;
}