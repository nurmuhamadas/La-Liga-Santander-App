import './NavMenu.css';

class NavMenu extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <ul>
                <li class="nav-menu"><a href="#home">Home</a></li>
                <li class="nav-menu"><a href="#saved">Saved Pages</a></li>
                <li class="nav-menu"><a href="#profile">Pofile</a></li>
            </ul>
        `;
    }
}

customElements.define('nav-menu', NavMenu);