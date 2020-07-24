import back from '../../../assets/icon/arrow_back-24px.svg';
import bookmark from '../../../assets/icon/bookmark';
import background from '../../../assets/img/messi-ramos.jpg';
import ball from '../../../assets/img/ball.svg';
import swal from 'sweetalert';
import {
    saveData,
    readSavedData
} from '../../data/db';
import {
    getDataCompetitions,
    getDataMatch
} from '../../data/data-source';


let match = () => {
    const root = document.querySelector('#root');
    const loader = document.createElement('ball-loader');
    loader.setAttribute('image', ball);
    const urlSplit = window.location.href.split('/');
    if (urlSplit[5] == undefined || urlSplit[5] == "") {
        root.innerHTML = `
            <header-component title="Match Result" image="${back}" click="true"></header-component>
            <div id="tab"></div>
            <div class="cont extra-padding" id="profile" style="background-image: url('${background}')"></div>
        `;
        getDataCompetitions({
            type: "matches",
            matchday: urlSplit[4]
        }).then(results => {
            root.appendChild(loader);
            const tabContainer = document.querySelector('#tab');
            const tabElement = document.createElement('tab-items');
            tabElement.data = {
                matchDay: parseInt(urlSplit[4])
            };
            tabContainer.appendChild(tabElement);
            getDataCompetitions({
                    type: "teams",
                    matchday: ""
                })
                .then(data => data.teams)
                .then(teams => {
                    const boardContainer = document.querySelector('.cont');
                    for (let i = 0; i < results.matches.length; i++) {
                        const boardItemElement = document.createElement("board-item");
                        boardItemElement.setAttribute('id', "match-" + results.matches[i].id);
                        let lastMatchData = {
                            matchDay: urlSplit[4],
                            matchId: results.matches[i].id,
                            scores: results.matches[i].score.fullTime
                        }

                        teams.forEach(team => {
                            if (team.id == results.matches[i].homeTeam.id) {
                                lastMatchData = {
                                    ...lastMatchData,
                                    home: {
                                        name: team.shortName,
                                        logo: team.crestUrl
                                    }
                                }
                            } else if (team.id == results.matches[i].awayTeam.id) {
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
                    }
                    root.removeChild(loader);
                })
        });
    } else {
        root.innerHTML = `
            <header-component title="Match Detail" image="${back}" click="true"></header-component>
            <hero-section display="none"></hero-section>
            <div class="cont" style="background-image: url('${background}')">
                <container-section id="match-detail" textButton="none" title="Statistics" display="none"></container-section>
            </div>
            <div class="fixed-action-btn">
                <a class="btn-floating btn-large blue" id="save">
                    ${bookmark}
                </a>
            </div>
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Information</h4>
                    <p>Data is successfully saved!</p>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        `;
        // if data from saved
        if (urlSplit[6] == "saved") {
            readSavedData(urlSplit[5])
                .then(data => {
                    const detailContainer = document.querySelector('#match-detail');
                    const detailElement = document.createElement("match-detail");
                    detailElement.data = data.match_result.match;
                    detailContainer.appendChild(detailElement);


                    const boardContainer = document.querySelector('#board-cont');
                    const boardElement = document.createElement("board-item");
                    boardElement.data = data.match_result.lastMatchData;
                    boardContainer.appendChild(boardElement);

                    // hide FAB 
                    document.querySelector(".fixed-action-btn").classList.add("none");
                });
        } else {

            getDataMatch(urlSplit[5])
                .then(results => {
                    root.appendChild(loader);
                    const detailContainer = document.querySelector('#match-detail');
                    const detailElement = document.createElement("match-detail");
                    detailElement.data = results.match;
                    detailContainer.appendChild(detailElement);

                    getDataCompetitions({
                            type: "teams",
                            matchday: ""
                        })
                        .then(data => data.teams)
                        .then(teams => {
                            const boardContainer = document.querySelector('#board-cont');
                            const boardElement = document.createElement("board-item");
                            let lastMatchData = {
                                matchDay: results.match.matchday,
                                matchId: results.match.id,
                                scores: results.match.score.fullTime
                            }
                            teams.forEach(team => {
                                if (team.id == results.match.homeTeam.id) {
                                    lastMatchData = {
                                        ...lastMatchData,
                                        home: {
                                            name: team.shortName,
                                            logo: team.crestUrl
                                        }
                                    }
                                } else if (team.id == results.match.awayTeam.id) {
                                    lastMatchData = {
                                        ...lastMatchData,
                                        away: {
                                            name: team.shortName,
                                            logo: team.crestUrl
                                        }
                                    }
                                }
                            });
                            boardElement.data = lastMatchData;
                            boardContainer.appendChild(boardElement);

                            const save = document.getElementById("save");
                            save.onclick = function () {
                                saveData({
                                        id: urlSplit[5],
                                        match_result: {
                                            lastMatchData: lastMatchData,
                                            match: results.match
                                        }
                                    })
                                    .then(() => {
                                        swal("SUCCESS", "This page is saved!", "success");
                                    })
                                    .catch(() => {
                                        swal("FAILED!", "You can't save this page!", "error");
                                    });
                            }
                            root.removeChild(loader);
                        });
                });
        }
    }

};

export default match;