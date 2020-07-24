import './ContainerSection.css';

class ContainerSection extends HTMLElement {
    connectedCallback() {
        this.button = '';
        if (this.getAttribute('textButton') !== 'none')
            this.button = `<a href="#${this.getAttribute('href')}" class="btn waves-yellow waves-effect orange accent-3">${this.getAttribute('textButton')}</a>`
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="center-align row">
                <div class="head">
                    <p class="title">${this.getAttribute('title')}</p>
                    <a href="#${this.getAttribute('href') || "#"}" style="display: ${this.getAttribute('display')}">View all</a>
                </div>
                <div class="item-cont">
                    ${this.innerHTML}
                </div>
                ${this.button}
            </div>
        `;
    }
}

customElements.define('container-section', ContainerSection)