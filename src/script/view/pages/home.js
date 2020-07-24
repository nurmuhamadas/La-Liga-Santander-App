import logo from '../../../assets/logo/LaLiga_Santander.svg';
import ball from '../../../assets/img/ball.svg';
import background from '../../../assets/img/messi-ramos.jpg';
import {
    getDataCompetitions
} from '../../data/data-source';

const home = () => {
    const root = document.querySelector('#root');
    const loader = document.createElement('ball-loader');
    loader.setAttribute('image', ball);
    root.innerHTML = `
        <header-component title="La Liga Santander" image="${logo}"></header-component>
        <hero-section></hero-section>
        <div class="cont" style="background-image: url('${background}')">
            <container-section id="upcoming" textButton="View all" title="Upcoming"  href="schedule"></container-section>
            <container-section id="leaderboard" textButton="View all" title="Leaderboard" href="table"></container-section>
            <container-section id="profile" textButton="none" title="Team Profile" display="none"></container-section>
        </div>
        <bottom-nav></bottom-nav>
    `;

    getDataCompetitions({
            type: "",
            matchday: ""
        })
        .then(data => {
            root.appendChild(loader);
            const currentMatchday = getDataCompetitions({
                type: "matches",
                matchday: data.currentSeason.currentMatchday - 1
            });
            const nextMatchday = getDataCompetitions({
                type: "matches",
                matchday: data.currentSeason.currentMatchday
            });

            document.querySelector('hero-section .title').innerHTML = "Match Day " + (data.currentSeason.currentMatchday - 1);
            // set button link of each section
            document.querySelector('hero-section .btn').setAttribute('href', `#match/${data.currentSeason.currentMatchday - 1}`);
            document.querySelector('hero-section .button').setAttribute('href', `#match/${data.currentSeason.currentMatchday - 1}`);
            document.querySelector('#upcoming .btn').setAttribute('href', `#schedule/${data.currentSeason.currentMatchday}`);
            document.querySelector('#upcoming .head a').setAttribute('href', `#schedule/${data.currentSeason.currentMatchday}`);

            return Promise.all([currentMatchday, nextMatchday]);
        })
        .then(data => {
            // HERO SECTION
            const boardContainer = document.querySelector('#board-cont');
            const boardItemElement = document.createElement("board-item");
            boardItemElement.setAttribute('id', "match-" + data[0].matches[0].id);
            let lastMatchData = {
                matchDay: data[0].filters.matchday,
                matchId: data[0].matches[0].id,
                scores: data[0].matches[0].score.fullTime
            }

            getDataCompetitions({
                    type: "teams",
                    matchday: ""
                })
                .then(data => data.teams)
                .then(teams => {
                    teams.forEach(team => {
                        if (team.id == data[0].matches[0].homeTeam.id) {
                            lastMatchData = {
                                ...lastMatchData,
                                home: {
                                    name: team.shortName,
                                    logo: team.crestUrl
                                }
                            }
                        } else if (team.id == data[0].matches[0].awayTeam.id) {
                            lastMatchData = {
                                ...lastMatchData,
                                away: {
                                    name: team.shortName,
                                    logo: team.crestUrl
                                }
                            }
                        }
                    });
                    boardItemElement.data = lastMatchData;
                    boardContainer.appendChild(boardItemElement);


                    // UPCOMING SECTION
                    const containerUpcoming = document.querySelector('#upcoming .item-cont');

                    for (let i = 0; i < 3; i++) {

                        const cardItemElement = document.createElement("card-item");
                        cardItemElement.setAttribute('id', "match-" + data[1].matches[i].id);
                        let matchData = {
                            matchDay: data[1].filters.matchday,
                            matchId: data[1].matches[i].id,
                            time: data[1].matches[i].utcDate
                        }
                        teams.forEach(team => {
                            if (team.id == data[1].matches[i].homeTeam.id) {
                                matchData = {
                                    ...matchData,
                                    venue: team.venue,
                                    home: {
                                        name: team.shortName,
                                        logo: team.crestUrl
                                    }
                                }
                            } else if (team.id == data[1].matches[i].awayTeam.id) {
                                matchData = {
                                    ...matchData,
                                    away: {
                                        name: team.shortName,
                                        logo: team.crestUrl
                                    }
                                }
                            }
                        });
                        cardItemElement.data = matchData;
                        containerUpcoming.appendChild(cardItemElement);
                    }


                    // PROFILE TEAM SECTION
                    const containerProfileTeam = document.querySelector('#profile .item-cont');
                    const clubLogoElement = document.createElement("club-logo");
                    clubLogoElement.data = teams;
                    containerProfileTeam.appendChild(clubLogoElement);
                })
        }).then(() => {

            // LEADERBOARD SECTION
            getDataCompetitions({
                type: "standings",
                matchday: ""
            }).then(data => {
                const containerLeaderboard = document.querySelector('#leaderboard .item-cont');
                const leaderboardItemElement = document.createElement("leaderboard-item");
                let standings = [];
                for (let i = 0; i < 5; i++) {
                    standings[i] = data.standings[0].table[i];
                }
                leaderboardItemElement.data = standings;
                root.removeChild(loader);
                containerLeaderboard.appendChild(leaderboardItemElement);
            });
        })
}
export default home;