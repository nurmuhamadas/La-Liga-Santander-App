import logo from '../../../assets/logo/LaLiga_Santander.svg';
import background from '../../../assets/img/messi-ramos.jpg';
import photo from '../../../assets/img/fotoku.jpg';

const profile = () => {
    const root = document.querySelector('#root');
    root.innerHTML = `<header-component title="La Liga Santander" image="${logo}"></header-component>
                        <hero-section display="none"></hero-section>
                        <div class="cont" style="background-image: url('${background}')"></div>
                        <bottom-nav></bottom-nav>
                    `;

    const boardContainer = document.querySelector('#board-cont');
    boardContainer.innerHTML = `<div class="img-container logo">
                                <img class="club-logo" src="${photo}" alt="Nur Muhamad AS">
                                <p class="caption">Nur Muhamad AS</p>
                            </div>
                        `;
}

export default profile;