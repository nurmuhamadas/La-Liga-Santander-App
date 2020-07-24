import './HeroSection.css';
import '../board-item/BoardItem';
import banner from '../../../assets/img/santiago bernabeu.jpg';

class HeroSection extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {

        this.innerHTML = `
            <div id="banner" class="" style="background-image: url('${banner}')">
                <div class="cover"></div>
                <div class="items container">
                    <div class="title"></div>
                    <div id="board-cont"></div>
                    <a class="btn waves-yellow waves-effect orange accent-3" href="${this.getAttribute('href') || "#"}"  style="display: ${this.getAttribute('display')}">View All Match</a>
                    <a class="button" href="${this.getAttribute('href') || "#"}"  style="display: ${this.getAttribute('display')}">View All Macth</a>
                </div>
            </div>
        `;
    }
}

customElements.define('hero-section', HeroSection);