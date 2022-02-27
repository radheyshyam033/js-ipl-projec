var matchArray = [];
lonload = fetch("./archive/matches.csv").then(res => {
    return res.text()
}).then(data => {

    var result = data.split("\n");
    for (let i = 0; i < result.length; i++) {
        var cells = result[i].split(",");
        matchArray.push(cells);
    }
    totalMatchPlayedInEachYear(matchArray);
    totalWonMatchesByEachTeam(matchArray);
});
//console.log(matchArray);

function totalMatchPlayedInEachYear(result) {
    const myMap = new Map();

    for (let i = 1; i < result.length; i++) {

        if (myMap.has(result[i][1])) {
            myMap.set(result[i][1], (myMap.get(result[i][1]) + 1));
        }
        else {
            myMap.set(result[i][1], 1);
        }
    }
    for (var entery of myMap) {
        console.log(entery);
    }
}
function totalWonMatchesByEachTeam(result) {
    const myMap = new Map();

    for (let i = 1; i < result.length; i++) {
        if (myMap.has(result[i][10])) {
            myMap.set(result[i][10], (myMap.get(result[i][10]) + 1));
        }
        else {
            myMap.set(result[i][10], 1);
        }
    }
    for (var entery of myMap) {
        console.log(entery);
    }
}