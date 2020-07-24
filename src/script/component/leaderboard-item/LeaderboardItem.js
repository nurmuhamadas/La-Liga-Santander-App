import './LeaderboardItem.css';

class LeaderboardItem extends HTMLElement {

    set data(data) {
        this._data = data;
    }

    connectedCallback() {
        this.render();
    }

    dataTable() {
        let table = "";
        for (let i = 0; i < this._data.length; i++) {
            table += `
                <tr>
                    <td>${this._data[i].position}</td>
                    <td><img src="${this._data[i].team.crestUrl}" alt="${this._data[i].team.name}">${this._data[i].team.name}</td>
                    <td>${this._data[i].playedGames}</td>
                    <td>${this._data[i].won}</td>
                    <td>${this._data[i].draw}</td>
                    <td>${this._data[i].lost}</td>
                    <td>${this._data[i].goalDifference}</td>
                    <td>${this._data[i].points}</td>
                </tr>
            `;
        }
        return table;
    }

    render() {
        this.innerHTML = `
            <table class="centered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th class="club-name">Club</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GD</th>
                        <th>Pts</th>
                    </tr>
                </thead>

                <tbody></tbody>
            </table>
        `;
        const url = new URL(window.location.href);
        const tableBody = document.querySelector('leaderboard-item tbody');
        tableBody.innerHTML = this.dataTable();
        const club = document.querySelectorAll('leaderboard-item tr td:nth-child(2)');
        for (let i = 0; i < club.length; i++) {
            club[i].addEventListener("click", () => {
                window.location = `${url.origin}#team/${this._data[i].team.id}`;
            });
        }
    }
}

customElements.define('leaderboard-item', LeaderboardItem)