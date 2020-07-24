import './TabItems.css';

class TabItems extends HTMLElement {

    set data(data) {
        this._data = data;
    }
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="row">
                <div class="col s12">
                    <ul class="tabs">
                        <li class="tab col s3"><a href="#match/${this._data.matchDay - 1}">Day ${this._data.matchDay - 1}</a></li>
                        <li class="tab col s3"><a class="active" href="#match/${this._data.matchDay}">Day ${this._data.matchDay}</a></li>
                        <li class="tab col s3"><a href="#match/${this._data.matchDay + 1}">Day ${this._data.matchDay + 1}</a></li>
                    </ul>
                </div>\
            </div>
        `;
    }
}

customElements.define('tab-items', TabItems)