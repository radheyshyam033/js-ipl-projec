var matchArray = [];
var deliveryArray = [];

onloadMatch = fetch("./archive/matches.csv").then(response => {
    return response.text()
}).then(data => {
    var array = data.split("\n");
    array.forEach(row => {
        var cells = row.split(",");
        matchArray.push(cells);

    });

    onloadDelivery = fetch("./archive/deliveries.csv").then(response => {
        return response.text()
    }).then(data => {

        var array = data.split("\n");
        array.forEach(row => {
            var cells = row.split(",");
            deliveryArray.push(cells);

        });
        totalMatchPlayedInEachYear(matchArray);
        totalWonMatchesByEachTeam(matchArray);
    });
});

function totalMatchPlayedInEachYear(result) {
    const totalMatchesBySeason = new Map();

    for (var index = 1; index < result.length; index++) {

        const matchSeason = 1;
        if (totalMatchesBySeason.has(result[index][matchSeason])) {
            totalMatchesBySeason.set(result[index][matchSeason],
                (totalMatchesBySeason.get(result[index][matchSeason]) + 1));
        }
        else {
            totalMatchesBySeason.set(result[index][matchSeason], 1);
        }
    }
    console.log(totalMatchesBySeason);
    
}

function totalWonMatchesByEachTeam(result) {
    const WonMatchesByEachTeam = new Map();

    for (let index = 1; index < result.length; index++) {
        const matchWinner = 10;
        if (WonMatchesByEachTeam.has(result[index][matchWinner])) {
            WonMatchesByEachTeam.set(result[index][matchWinner],
                (WonMatchesByEachTeam.get(result[index][matchWinner]) + 1));
        }
        else {
            WonMatchesByEachTeam.set(result[index][matchWinner], 1);
        }
    }
    console.log(WonMatchesByEachTeam);
}
