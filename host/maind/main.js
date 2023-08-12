(() => {
    var nm = document.getElementById("nameBtn"),
    tm = document.getElementById("teamBtn");
    nm.addEventListener("mousedown" ,updateName,false);
    function updateName() {
    var nameInput = document.getElementById("name");
    var name = nameInput.value;

    var nameText = document.getElementById("nameText");
    nameText.innerHTML = name;
    nameInput.disabled = true
    }
    
    tm.addEventListener("mousedown" ,updateTeam,false);
    function done() {
        var teamSelect = document.getElementById("team");
        var selectedTeam = teamSelect.options[teamSelect.selectedIndex].text;

        var teamText = document.getElementById("teamText");
        teamText.innerHTML = selectedTeam;

        
    }

})();

document.addEventListener("DOMContentLoaded", ()=>{},false);
