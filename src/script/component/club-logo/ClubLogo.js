import './ClubLogo.css';
import swal from 'sweetalert';
import {
    removeData
} from '../../data/db';

class ClubLogo extends HTMLElement {

    clubData() {
        let data = "";
        this._data.forEach(club => {
            data += `
            <div class="img-container col m3 s4">
                <img class="club-logo" src="${club.crestUrl}" alt="${club.shortName}">
                <p class="caption">${club.shortName}</p>
            </div>
            `;
        });
        return data;
    }

    set data(data) {
        this._data = data;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const url = new URL(window.location.href);
        this.innerHTML = this.clubData();
        const club = document.querySelectorAll('club-logo .img-container');
        for (let i = 0; i < club.length; i++) {
            club[i].addEventListener("click", () => {
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
                                    window.location = `${url.origin}#team/${this._data[i].id}/${this.getAttribute('saved') || ""}`;
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
                                                removeData(`${this._data[i].id}`)
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
                    window.location = `${url.origin}#team/${this._data[i].id}/${this.getAttribute('saved') || ""}`;
                }
            });
        }
    }
}

customElements.define('club-logo', ClubLogo)