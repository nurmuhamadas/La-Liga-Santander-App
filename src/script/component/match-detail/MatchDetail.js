import './MatchDetail.css';

class MatchDetail extends HTMLElement {

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
                        <td class="bold">Home Team</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>${this._data.awayTeam.name}</td>
                    </tr>
                    <tr>
                        <td>Score</td>
                        <td>${this._data.score.fullTime.homeTeam}</td>
                    </tr>
                    <td class="bold">Away Team</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>${this._data.awayTeam.name}</td>
                </tr>
                <tr>
                    <td>Score</td>
                    <td>${this._data.score.fullTime.awayTeam}</td>
                </tr>
                    <tr>
                        <td class="bold">Referees</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>1. ${this._data.referees[0].name}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2. ${this._data.referees[1].name}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>3. ${this._data.referees[2].name}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>4. ${this._data.referees[3].name}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>5. ${this._data.referees[4].name}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}

customElements.define('match-detail', MatchDetail)