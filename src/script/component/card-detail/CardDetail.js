import './CardDetail.css';

class CardDetail extends HTMLElement {

    set data(data) {
        this._data = data;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>${this._data.name}</td>
                    </tr>
                    <tr>
                        <td>Short Name</td>
                        <td>${this._data.shortName}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>${this._data.address}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>${this._data.phone}</td>
                    </tr>
                    <tr>
                        <td>Website</td>
                        <td>${this._data.website}</td>
                    </tr>
                    <tr>
                        <td>Founded</td>
                        <td>${this._data.founded}</td>
                    </tr>
                    <tr>
                        <td>Venue</td>
                        <td>${this._data.venue}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}

customElements.define('card-detail', CardDetail)