import home from './pages/home';
import match from './pages/match';
import schedule from './pages/schedule';
import table from './pages/table';
import team from './pages/team';
import saved from './pages/saved';
import profile from './pages/profile';

function loadPage(page) {
    const root = document.querySelector("#root");
    if (page == "home") {
        home();
    } else if (page == "match") {
        match();
    } else if (page == "schedule") {
        schedule();
    } else if (page == "table") {
        table();
    } else if (page == "team") {
        team();
    } else if (page == "saved") {
        saved();
    } else if (page == "profile") {
        profile();
    }
}
export default loadPage;