import './LineUp.css';


class LineUp extends HTMLElement {

    set data(data) {
        this._data = data;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <td colspan="3">${this._data.name}<img src="${this._data.crestUrl}" alt="${this._data.name}" class="left"></td>
                    </tr
                </thead>
                <tbody></tbody>
            </table>
            
        `;
        let squad = "";
        this._data.squad.forEach(player => {
            squad += `
                <tr>
                    <td>${player.name}</td>
                    <td>${player.position || ""}</td>
                </tr>
            `;
        });

        document.querySelector('#line-up tbody').innerHTML = squad;
    }
}

customElements.define('line-up', LineUp)