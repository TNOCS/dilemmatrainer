import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';
import { state } from "../global";

import hud from "./components/hud";
import help from "./components/help";

const MODULE3 = {
  oninit: () => {
    state.showHelp = false;
  },
  view: () => {
    return m("div", { class: "container" }, [
      m(hud, { done: "#!/module4" }),
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
                "Lorem Ipsum et dono",
                "This is the second page",
                "this is the final page"
              ]
            })
          : [
              m("div", { class: "agreements col s10 offset-s1" }, [
                  m('div', {class: 'col s10'}, 
                    m('textarea', {maxlength:200, rows:"4", cols:"50"})
                  ),
                  m('div', {class: 'col s10'},
                    m('textarea', {maxlength:200, rows:"4", cols:"50"})
                  ),
                  m('div', {class: 'col s10'},
                    m('textarea', {maxlength:200, rows:"4", cols:"50"})
                  )
              ])
            ]
      )
    ])
  }
}

export default MODULE3;
