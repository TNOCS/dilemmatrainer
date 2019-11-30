import m from 'mithril';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import state from './global';

var pages:Array<string> = [];
var currentPage:number = 0;
var currentPageText:String
var helpCard:any

const help = {
    view: (vnode) => {
        pages = vnode.attrs.desc
        currentPageText = pages[currentPage];
        

        const visP = pages.length > 2 && currentPage != 0 ? "visible" : "hidden";
        const visN = pages.length > 2 && currentPage != (pages.length - 1) ? true : false;

        if (visN){
            var cardActions = [
                m('a', {href: "#!/hello", style: "color:#4E77A0; visibility:" + visP + ";", onclick: prevPage}, "PREVIOUS"),
                m('a', {href: "#!/hello", style: "color:#4E77A0; float:right;", onclick: nextPage }, "NEXT"),
            ]
        }
        else{
            var cardActions = [
                m('a', {href: "#!/hello", style: "color:#4E77A0; visibility:" + visP + ";",  onclick: prevPage}, "PREVIOUS"),
                m('a', {href: "#!/hello", style: "color:#4E77A0; float:right;",  onclick:()=>{state.showHelp = false}}, "START")
            ]
        }

        if(!state.showHelp){
            helpCard = null;
            currentPage = 0;
        }
        else{
            helpCard = m('div', {class: "row col offset-s4 s4", id:"help"}, [
                m('div', {class: "card"}, [
                    m('div', {class: "card-content"}, [
                        m('h6', {class: "card-title"}, vnode.attrs.title),
                        m('p', currentPageText)
                    ]),
                    m('div', {class: "card-action"}, cardActions) 
                ])
        }

        return helpCard;
    } 
}

function nextPage(){
    currentPage += 1;
}

function prevPage(){
    currentPage -= 1;
}

export default help;
