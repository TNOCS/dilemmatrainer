import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';
import { state, session } from "../global";

import hud from "./components/hud";
import help from "./components/help";

const MODULE3 = {
  oninit: () => {
    state.showHelp = true;
  },
  view: () => {
    return m("div", { class: "container" }, [
      m(hud, { done: sendAgreements}),
      m(interaction)
    ]);
  }
};


const interaction = {
  view: () => {
    return m('div', {class: 'interactionArea'}, [
      m(
        "div",
        { class: "row" },
        state.showHelp
          ? m(help, {
              title: "Title",
              desc: [
                "Bespreek en voer 3 werkafspraken in.",
              ]
            })
          : [
              m("div", { class: "agreements col s8 offset-s2" }, [
                  m('div', {class: 'row textareaWrap'}, 
                    m('textarea', {class: 'col s10 offset-s1', maxlength:200})
                  ),
                  m('div', {class: 'row textareaWrap'},
                    m('textarea', {class: 'col s10 offset-s1', maxlength:200})
                  ),
                  m('div', {class: 'row textareaWrap'},
                    m('textarea', {class: 'col s10 offset-s1', maxlength:200})
                  )
              ])
            ]
      )
    ])
  }
}


function sendAgreements(org){
  return "#!/selections"
}

export default MODULE3;
