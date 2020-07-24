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
    getDataTeam
} from '../../data/data-source';


const team = () => {
    const root = document.querySelector('#root');
    const loader = document.createElement('ball-loader');
    loader.setAttribute('image', ball);
    const urlSplit = window.location.href.split('/');
    root.innerHTML = `  <header-component title="La Liga Santander" image="${back}"  click="true"></header-component>
                        <hero-section display="none"></hero-section>
                        <div class="cont" style="background-image: url('${background}')">
                            <container-section id="detail" class="extra-padding" textButton="none" title="General Information" display="none"></container-section>
                            <container-section id="line-up" class="extra-padding" textButton="none" title="Squad" display="none"></container-section>
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

    if (urlSplit[5] == "saved") {
        readSavedData(urlSplit[4])
            .then(data => {
                const boardContainer = document.querySelector('#board-cont');
                boardContainer.innerHTML = `<div class="img-container logo">
                                                <img class="club-logo" src="${data.team.crestUrl}" alt="${data.team.shortName}">
                                                <p class="caption">${data.team.name}</p>
                                            </div>
                                        `;

                // club detail
                const detailContainer = document.querySelector('.cont #detail');
                const detailElement = document.createElement('card-detail');
                detailElement.data = data.team;
                detailContainer.appendChild(detailElement);

                // line up
                const lineUpContainer = document.querySelector('.cont #line-up');
                const lineUpElement = document.createElement('line-up');
                lineUpElement.data = data.team;
                lineUpContainer.appendChild(lineUpElement);

                // hide FAB 
                document.querySelector(".fixed-action-btn").classList.add("none");
            })
    } else {

        getDataTeam(urlSplit[4])
            .then(club => {
                root.appendChild(loader);
                const boardContainer = document.querySelector('#board-cont');
                boardContainer.innerHTML = `<div class="img-container logo">
                                            <img class="club-logo" src="${club.crestUrl}" alt="${club.shortName}">
                                            <p class="caption">${club.name}</p>
                                        </div>
                                    `;

                // club detail
                const detailContainer = document.querySelector('.cont #detail');
                const detailElement = document.createElement('card-detail');
                detailElement.data = club;
                detailContainer.appendChild(detailElement);

                // line up
                const lineUpContainer = document.querySelector('.cont #line-up');
                const lineUpElement = document.createElement('line-up');
                lineUpElement.data = club;
                lineUpContainer.appendChild(lineUpElement);

                //FAB event
                const save = document.getElementById("save");
                save.onclick = function () {
                    saveData({
                            id: urlSplit[4],
                            team: club
                        })
                        .then(() => {
                            swal("SUCCESS!", "This page is saved!", "success");
                        })
                        .catch(() => {
                            swal("FAILED!", "You can't save this page!", "error");
                        });
                }

                root.removeChild(loader);
            })
    }
}

export default team;