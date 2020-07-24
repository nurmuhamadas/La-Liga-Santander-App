import logo from '../../../assets/logo/LaLiga_Santander.svg';
import background from '../../../assets/img/messi-ramos.jpg';
import {
    readAllSavedData
} from '../../data/db';

let saved = () => {
    const root = document.querySelector('#root');
    root.innerHTML = `<header-component title="La Liga Santadore" image="${logo}" href=""></header-component>
                        <div class="cont extra-padding" style="background-image: url('${background}')">
                            <container-section id="board" textButton="none" title="Match Result" display="none" href="schedule"></container-section>
                            <container-section id="profile" textButton="none" title="Team Profile" display="none" href="team"></container-section>
                        </div>
                        <bottom-nav></bottom-nav>
                    `;

    readAllSavedData()
        .then(data => {
            // team profile
            const containerProfileTeam = document.querySelector('#profile .item-cont');
            const clubLogoElement = document.createElement("club-logo");
            let clubData = [];
            data.forEach(data => {
                if (data.match_result != null) {
                    // board 
                    const boardContainer = document.querySelector('#board .item-cont');
                    const boardElement = document.createElement('board-item');
                    boardElement.setAttribute('id', "match-" + data.id);
                    boardElement.data = data.match_result.lastMatchData;
                    boardElement.setAttribute('saved', "saved");
                    boardContainer.appendChild(boardElement);
                } else {
                    clubData = [
                        ...clubData,
                        data.team
                    ]
                }
            })
            clubLogoElement.data = clubData;
            clubLogoElement.setAttribute('saved', "saved");
            containerProfileTeam.appendChild(clubLogoElement);
        })
}

export default saved;