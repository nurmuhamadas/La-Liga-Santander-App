import './BallLoader.css';

class BallLoader extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
    <div class="gravity">
        <div class="ball" style="background-image: url('${this.getAttribute('image')}')"></div>
    </div>
`
    }
}

customElements.define('ball-loader', BallLoader)