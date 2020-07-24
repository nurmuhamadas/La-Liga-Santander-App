import back from '../../../assets/icon/arrow_back-24px.svg';
import background from '../../../assets/img/messi-ramos.jpg';
import ball from '../../../assets/img/ball.svg';
import {
    getDataCompetitions
} from '../../data/data-source';

let table = () => {
    const root = document.querySelector('#root');
    const loader = document.createElement('ball-loader');
    loader.setAttribute('image', ball);
    root.innerHTML = `<header-component title="Leaderboard" image="${back}" click="true"></header-component>
                        <div class="cont extra-padding" style="background-image: url('${background}')"></div>
                    `;

    getDataCompetitions({
        type: "standings",
        matchday: ""
    }).then(data => {
        root.appendChild(loader);
        const containerLeaderboard = document.querySelector('.cont');
        const leaderboardItemElement = document.createElement("leaderboard-item");
        leaderboardItemElement.data = data.standings[0].table;
        containerLeaderboard.appendChild(leaderboardItemElement);
        root.removeChild(loader);
    })
}
export default table;