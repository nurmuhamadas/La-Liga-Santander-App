import back from '../../../assets/icon/arrow_back-24px.svg';
import background from '../../../assets/img/messi-ramos.jpg';
import ball from '../../../assets/img/ball.svg';
import {
    getDataCompetitions
} from '../../data/data-source';

const schedule = () => {
    const root = document.querySelector('#root');
    const loader = document.createElement('ball-loader');
    loader.setAttribute('image', ball);
    const urlSplit = window.location.href.split('/');
    if (urlSplit[5] == undefined || urlSplit[5] == "") {
        root.innerHTML = `
            <header-component title="Upcoming Macth" image="${back}" click="true"></header-component>
            <tab-items></tab-items>
            <div id="upcoming" class="cont extra-padding" style="background-image: url('${background}')"></div>
        `;
        getDataCompetitions({
            type: "matches",
            matchday: urlSplit[4]
        }).then(schedules => {
            root.appendChild(loader);
            getDataCompetitions({
                    type: "teams",
                    matchday: ""
                })
                .then(data => data.teams)
                .then(teams => {
                    const containerUpcoming = document.querySelector('#upcoming');
                    for (let i = 0; i < schedules.matches.length; i++) {
                        const cardItemElement = document.createElement("card-item");
                        cardItemElement.setAttribute('id', "match-" + schedules.matches[i].id)
                        let matchData = {
                            matchDay: urlSplit[4],
                            matchId: schedules.matches[i].id,
                            time: schedules.matches[i].utcDate
                        }
                        teams.forEach(team => {
                            if (team.id == schedules.matches[i].homeTeam.id) {
                                matchData = {
                                    ...matchData,
                                    venue: team.venue,
                                    home: {
                                        name: team.shortName,
                                        logo: team.crestUrl
                                    }
                                }
                            } else if (team.id == schedules.matches[i].awayTeam.id) {
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
                    root.removeChild(loader);
                })
        })
    }
};

export default schedule;