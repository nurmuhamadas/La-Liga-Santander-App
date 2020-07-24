import {
    loadPage
} from './script/config/module';
import './script/config/sw-config';


document.addEventListener("DOMContentLoaded", () => {
    load();

    window.addEventListener("hashchange", () => {
        load();
    })

    const elems = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(elems);

});

const load = () => {
    let page = window.location.hash.substr(1).split('/')[0];
    if (page === "") page = "home";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    loadPage(page);
}

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 24)
        document.querySelector('header-component').classList.add('linear-right');
    else
        document.querySelector('header-component').classList.remove('linear-right');
});