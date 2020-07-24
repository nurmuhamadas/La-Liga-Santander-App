import './CardItem.css';

class CardItem extends HTMLElement {

    set data(data) {
        this._data = data;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="">
            <div class="card linear-right">
                <div class="match-thumb">
                    <div class="img-container">
                        <img class="club-logo" src="${this._data.home.logo}" alt="${this._data.home.name}>
                        <p class="caption">${this._data.home.name}</p>
                    </div>
                    <ul>
                        <li class="score"></li>
                        <li>:</li>
                        <li class="score"></li>
                    </ul>
                    <div class="img-container">
                        <img class="club-logo" src="${this._data.away.logo}" alt="${this._data.away.name}">
                        <p class="caption">${this._data.away.name}</p>
                    </div>
                </div>
                <div class="match-detail left-align">
                    <div class="block schedule">${this._data.time}</div>
                    <div class="block stadium">Venue: ${this._data.venue}</div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('card-item', CardItem)