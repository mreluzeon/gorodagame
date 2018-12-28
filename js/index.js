const cities = Object.keys(nerobegula);
var myMap;

var scoreDelta = nerobegula["Москва"];
var lastLetter = '';
var team = 0; // only 0 or 1
var teamScores = [0, 0];
var flip = team => team ? 0 : 1;
var forbiddenLetters = ["Ь", "Ъ", "Ы", "Й"];

document.getElementById("submit").onclick = (e) => {

    let city = document.getElementById("city").value;
    if (!lastLetter || city.slice(0, 1) == lastLetter) {
        if (cities.indexOf(city) != -1) {
            delete cities[cities.indexOf(city)];
            let score = Math.round((scoreDelta - nerobegula[city]) / 10000)
            teamScores[team] += score;
            cityNameArr = city.split("");
            lastLetter = cityNameArr.pop().toUpperCase();
            while (forbiddenLetters.indexOf(lastLetter) > -1) {
                lastLetter = cityNameArr.pop().toUpperCase();
            }

            document.getElementById(`team${team}score`).innerHTML = teamScores[team];
            document.getElementById(`letter`).innerHTML = lastLetter;
            // Display on the map
            ymaps.geocode(city).then(res => {
                var coords = res.geoObjects.get(0).geometry.getCoordinates();
                var placement = new ymaps.Placemark(coords, {
                    hintContent: city,
                    balloonContent: `${city}: ${score} очков.`
                });
                myMap.geoObjects.add(placement);
            }).catch(e => alert("Error: " + e.message));
            team = flip(team);
        } else {
            alert("Нет такого города");
        }
    } else {
        alert("Город должен начинаться на букву " + lastLetter);
    }
};

document.getElementById("giveup").onclick = (e) => {document.getElementById("submit").onclick = null}

ymaps.ready(function () {
    myMap = new ymaps.Map("map", {
        center: [65.76, 90.64],
        zoom: 2
    });
});
