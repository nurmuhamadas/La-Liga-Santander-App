import './HeaderComponent.css';
import '../nav-menu/NavMenu';


class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <img alt="La Liga Santander Logo" src="${this.getAttribute('image')}">
            <div id="header-title">${this.getAttribute('title')}</div>
            <nav-menu></nav-menu>
        `;

        document.querySelector('header-component img').addEventListener("click", () => {
            if (this.getAttribute('click') == "true")
                window.history.back();
        })
    }
}

customElements.define("header-component", HeaderComponent);