import './BottomNav.css';
import home from '../../../assets/icon/home';
import saved from '../../../assets/icon/saved';
import profile from '../../../assets/icon/profile';

class BottomNav extends HTMLElement {
    connectedCallback() {
        this.height = window.screen.height;
        this.render();
    }

    render() {
        this.innerHTML = `
            <a href="#home" id="home" class="active">
                ${home()}
            </a>
            <a href="#saved" id="saved">
                ${saved()}
            </a>
            <a href="#profile" id="profile">
                ${profile()}
            </a>
        `;

        var page = window.location.hash.substr(1).split('/')[0];
        document.querySelectorAll('bottom-nav a').forEach(e => {
            e.classList.remove('active');
        });
        if (page == "" || page == "#")
            page = "home";
        const menu = document.querySelector(`#${page}`)
        if (page == "profile")
            menu.innerHTML = profile('white');
        else if (page == "saved")
            menu.innerHTML = saved('white');
        else
            menu.innerHTML = home('white');

        menu.classList.add('active');
    }
}

customElements.define('bottom-nav', BottomNav)