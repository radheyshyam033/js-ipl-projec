var matchArray = [];
var deliveryArray = [];

onloadMatch = fetch("./archive/matches.csv").then(response => {
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response.text();
}).then(data => {
    var array = data.split("\n");
    array.forEach(row => {
        var cells = row.split(",");
        matchArray.push(cells);

    });

    onloadDelivery = fetch("./archive/deliveries.csv").then(response => {
        if(!response.ok){
            throw Error(response.statusText);
        }
        return response.text()
    }).then(data => {
        var array = data.split("\n");
        array.forEach(row => {
            var cells = row.split(",");
            deliveryArray.push(cells);

        });
        solveScenario();
    });
});

function solveScenario() {
    totalMatchPlayedInEachYear(matchArray);
    totalWonMatchesByEachTeam(matchArray);
    extraRunMadeByEachTeamIn2016(matchArray, deliveryArray);
    topEconomicalBowlerOf2015(matchArray, deliveryArray);

}

const MATCH_SEASON = 1;
function totalMatchPlayedInEachYear(matchArray) {
    var totalMatchesBySeason = new Map();
    var flag = false;

    matchArray.forEach(row => {
        if (totalMatchesBySeason.has(row[MATCH_SEASON])) {
            totalMatchesBySeason.set(row[MATCH_SEASON],
                (totalMatchesBySeason.get(row[MATCH_SEASON]) + 1));
        }
        else if (row[MATCH_SEASON] !== undefined && flag === true) {
            totalMatchesBySeason.set(row[MATCH_SEASON], 1);
        }
        flag = true;
    });

    console.log("1. Number of matches played per year of all the years in IPL.");
    console.log(totalMatchesBySeason);

}

const MATCH_WINNER = 10;
function totalWonMatchesByEachTeam(matchArray) {
    var WonMatchesByEachTeam = new Map();
    var flag = false;

    matchArray.forEach(row => {
        if (WonMatchesByEachTeam.has(row[MATCH_WINNER])) {
            WonMatchesByEachTeam.set(row[MATCH_WINNER],
                (WonMatchesByEachTeam.get(row[MATCH_WINNER]) + 1));
        }
        else if (row[MATCH_WINNER] != undefined && flag === true) {
            WonMatchesByEachTeam.set(row[MATCH_WINNER], 1);
        }
        flag = true;
    });

    console.log("2. Number of matches won of all teams over all the years of IPL.");
    console.log(WonMatchesByEachTeam);
}

const BATTING_TEAM = 2;
const EXTRA_RUNS = 16;
const deliveryId = 0;

function extraRunMadeByEachTeamIn2016(matchArray, deliveryArray) {
    const yearOfMatch = 2016;
    var idOfMatch = getIdByYear(matchArray, yearOfMatch);

    var extraRunByTeam = new Map();
    idOfMatch.forEach(matchId => {
        deliveryArray.forEach(row => {
            if (matchId === row[deliveryId]) {
                if (extraRunByTeam.has(row[BATTING_TEAM])) {
                    extraRunByTeam.set(row[BATTING_TEAM], extraRunByTeam.get(row[BATTING_TEAM]) + parseInt(row[EXTRA_RUNS]));
                }
                else if (row[BATTING_TEAM] !="" && row[BATTING_TEAM] != undefined) {
                    extraRunByTeam.set(row[BATTING_TEAM], parseInt(row[EXTRA_RUNS]));
                }
            }
        });
    });
    console.log("3. For the year 2016 the extra runs conceded per team.")
    console.log(extraRunByTeam);
}

const BOWLER = 8;
const TOTAL_RUNS = 17;
const MAX_VALUE = 1000;
const WIDE_RUN = 10;

function topEconomicalBowlerOf2015() {
    const yearOfMatch = 2015;
    var idOfMatch = getIdByYear(matchArray, yearOfMatch);

    var totalRunByBowler = new Map();
    var totalBallByBowler = new Map();

    idOfMatch.forEach(matchId => {
        deliveryArray.forEach(row => {
            if (matchId === row[deliveryId]) {
                if (totalRunByBowler.has(row[BOWLER])) {
                    totalRunByBowler.set(row[BOWLER], (totalRunByBowler.get(row[BOWLER]) + parseInt(row[TOTAL_RUNS])));
                    if (parseInt(row[WIDE_RUN]) === 0) {
                        totalBallByBowler.set(row[BOWLER], (totalRunByBowler.get(row[BOWLER]) + 1));
                    }
                }
                else {
                    totalRunByBowler.set(row[BOWLER], parseInt(row[TOTAL_RUNS]));
                    if (parseInt(row[WIDE_RUN] === 0)) {
                        totalBallByBowler.set(row[BOWLER], 1);
                    }

                }
            }
        });
    });

    var bowlerName = "";
    var minEcoValue = MAX_VALUE;
    totalRunByBowler.forEach((value, key) => {
        var score = value;
        var ball = totalBallByBowler.get(key);
        var economic = (score * 6) / ball;
        if (economic < minEcoValue) {
            minEcoValue = economic;
            bowlerName = key;
        }
    });
    console.log("4. Top economical bowler of 2015.")
    console.log(bowlerName + " " + minEcoValue);
}

function getIdByYear(matchArray, yearOfMatch) {
    var idOfMatch = [];
    matchArray.forEach(row => {
        if (row[1] == yearOfMatch) {
            idOfMatch.push(row[0]);
        }
    });
    return idOfMatch;
}
