import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';

import { state } from '../global';

import { Button } from 'mithril-materialized';
import help from './components/help';
import hud from './components/hud';

let charaCol: Array<boolean> = [false, false, false];
let charaValue: Array<number> = [2, 2, 2];

let hbarSize = 7;

const MODULE2 = {
  oninit: () => {
    state.currentStep = 0;
    state.showHelp = true;
  },
  view: () => {
    return m('div', { class: 'container' }, [
      m(hud, { done: '/module3' }),
      m(interaction),
    ]);
  },
};

const interaction = {
  view: () => {
    return m('div', {class: 'interactionArea'}, [
      m('div', {class:'row'},[
        m('div', {class: 'col s10', id:'dilemmaBG'}, [
          m('p', {id:'description', class:"flow-text"} , 'desccription'), //state.dilemmas[state.currentStep].description
          m('h5', {id: 'title', class:"flow-text"} , 'title?' ) //state.dilemmas[state.currentStep].title
        ])
      ]),

      m('div', {class:'row'},[
        m('div', {class:'row'},[
          m('div', {id:'topItems', class: 'col offset-s4 s7 gridItems'}, [
            m('div', {class: 'gridVbarCont'}, m('div', {class: 'gridVbar'})),

            m('div', {class: 'charaDis'}, 'ICON/TITLE'),
            m('div', {class: 'gridVbarCont'}, m('div', {class: 'gridVbar'})),
          ]),

          m('div', {class: 'gridHbarCont col offset-s4 s' + String(hbarSize)}, m('hr', {class: 'gridHbar', id:'firstHBar'}))
        ]),
        m('div', {class:'row', style:'margin-top: 30px'},[
          m('div', {id: 'yes', class: 'col offset-s3 s1'}),

          m('div', {id:'middleItems', class: 'col offset-s4 s7 gridItems'}, [
            m('div', {class: 'stampPoint', id:'yesChar' + 0 , onclick: stamp.bind(this, 0, 1)}),
          ]),
          m('div', {class: 'gridHbarCont col offset-s4 s' + String(hbarSize)}, m('hr', {class: 'gridHbar', id:'secondHBar'}))

        ]),
        m('div', {class:'row', style:'margin-top: 20px'},[
          m('div', {id: 'no', class: 'col offset-s3 s1'}),

          m('div', {id:'bottomItems', class: 'col offset-s4 s7 gridItems'}, [
            m('div', {class: 'stampPoint',id:'noChar' + 0 , onclick: stamp.bind(this, 0, 0)}),
          ]),


          m('div', {class: 'gridHbarCont col offset-s4 s' + String(hbarSize)}, m('hr', {class: 'gridHbar', id:'thirdHBar'}))
        ]),
      ])
  ])
  }
};


function stamp(col, value){
  let target = event.target as HTMLTextAreaElement;

  if(charaValue[col] == value){
    target.classList.remove("stamped");
  }
  else{
    if(charaValue[col] != 2){
      if (charaValue[col] == 1){
        document.getElementById('yesChar' + col).classList.remove("stamped");
      }
      else{
        document.getElementById('noChar' + col).classList.remove("stamped");
      }
    }
    target.classList.add("stamped");
  }
  
  charaCol[col] = true;
  charaValue[col] = value;
}

export default MODULE2;
