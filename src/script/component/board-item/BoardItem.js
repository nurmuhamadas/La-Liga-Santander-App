import './BoardItem.css';
import swal from 'sweetalert';
import {
    removeData
} from '../../data/db';

class BoardItem extends HTMLElement {

    set data(data) {
        this._data = data;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="linear-left">
                <div class="img-container">
                    <img class="club-logo" src="${this._data.home.logo}" alt="${this._data.home.name}">
                    <p class="caption">${this._data.home.name} FC</p>
                </div>
                <ul>
                    <li class="">${this._data.scores.homeTeam || "0"}</li>
                    <li>:</li>
                    <li class="">${this._data.scores.awayTeam || "0"}</li>
                </ul>
                <div class="img-container">
                    <img class="club-logo" src="${this._data.away.logo}" alt="${this._data.away.name}">
                    <p class="caption">${this._data.away.name} FC</p>
                </div>
            </div>
        `;

        document.querySelector(`board-item#match-${this._data.matchId}`).addEventListener("click", () => {
            const url = new URL(window.location.href);
            if (window.location.hash.substr(1).split('/')[0] == "saved") {
                swal("What do you want to do?", {
                        buttons: {
                            cancel: "cancel",
                            catch: {
                                text: "delete",
                                value: "delete",
                            },
                            defeat: {
                                text: "open",
                                value: "open",
                            }
                        },
                    })
                    .then((value) => {
                        switch (value) {
                            case "open":
                                window.location = `${url.origin}#match/${this._data.matchDay}/${this._data.matchId}/${this.getAttribute('saved') || ""}`;
                                break;
                            case "delete":
                                swal({
                                        title: "WARNING!",
                                        text: "Are you sure to remove it from saved page?",
                                        icon: "warning",
                                        buttons: true,
                                        dangerMode: true,
                                    })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            removeData(`${this._data.matchId}`)
                                                .then(() => {
                                                    swal("This data has been removed!", {
                                                        icon: "success",
                                                    }).then(() => location.reload());
                                                });
                                        } else {
                                            swal("Delete canceled!");
                                        }
                                    });
                                break;
                        }
                    });
            } else {
                window.location = `${url.origin}#match/${this._data.matchDay}/${this._data.matchId}/${this.getAttribute('saved') || ""}`;
            }
        })
    }
}

customElements.define('board-item', BoardItem)