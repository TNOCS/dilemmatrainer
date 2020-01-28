import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'mithril';

import { state } from '../global';

import help from './components/help';
import hud from './components/hud';
import { compose } from 'mithril-materialized';

let charaCol: Array<boolean> = [];
let charaValue: Array<number> = [];
let charaNames: Array<string> = [];
let charaResults: any[] = [];

let hbarSize = 7;

const MODULE2 = {
  oninit: () => {
    state.currentStep = 0;
    state.showHelp = true;
    setupCharas();
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
          m('p', {id:'description', class:"flow-text"} , state.dilemmas[state.currentStep].description),
          m('h5', {id: 'title', class:"flow-text"} , state.dilemmas[state.currentStep].title)
        ])
      ]),

      m('div', {class:'row'},[
        m('div', {class:'row'},[
          m('div', {id:'topItems', class: 'col offset-s4 s7 gridItems'}, [
            m('div', {class: 'gridVbarCont'}, m('div', {class: 'gridVbar'})),

            charaNames.map( (char, i) => {
              return  [m('div', {class: 'charaDis'}, charaNames[i]), m('div', {class: 'gridVbarCont'}, m('div', {class: 'gridVbar'}))]
            })
          ]),

          m('div', {class: 'gridHbarCont col offset-s4 s' + String(hbarSize)}, m('hr', {class: 'gridHbar', id:'firstHBar'}))
        ]),
        m('div', {class:'row', style:'margin-top: 30px'},[
          m('div', {id: 'yes', class: 'col offset-s3 s1'}),

          m('div', {id:'middleItems', class: 'col offset-s4 s7 gridItems'}, [
            charaNames.map( (char, i) => {
              return  m('div', {class: 'stampPoint', id:'yesChar' + i , onclick: stamp.bind(this, i, 1)})
            })
          ]),
          m('div', {class: 'gridHbarCont col offset-s4 s' + String(hbarSize)}, m('hr', {class: 'gridHbar', id:'secondHBar'}))

        ]),
        m('div', {class:'row', style:'margin-top: 20px'},[
          m('div', {id: 'no', class: 'col offset-s3 s1'}),

          m('div', {id:'bottomItems', class: 'col offset-s4 s7 gridItems'}, [
            charaNames.map( (char, i) => {
              return  m('div', {class: 'stampPoint', id:'noChar' + i , onclick: stamp.bind(this, i, 0)})
            })
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
    charaCol[col] = false;
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
    charaCol[col] = true;
  }
  
  
  charaValue[col] = value;


  if (charaCol.every( (i) => {return i} )){
     if (state.dilemmas.length >= state.currentStep + 1) {
      let stamped = document.getElementsByClassName('stamped');

      while(stamped.length) {  //because shrinking classList
        stamped[0].classList.remove("stamped");
      }
  
      state.currentStep += 1;
      setupCharas()
    }
  else{
      m.route.set('/selection');
    }
  }
}

function setupCharas(){
  charaCol = [];
  charaValue = [];
  charaNames = [];
  charaResults = [];

  for (let char in state.dilemmas[state.currentStep].characteristics){
    charaCol.push(false);
    charaValue.push(2);
  }

  charaNames = Object.keys(state.dilemmas[state.currentStep].characteristics);
  charaResults = charaNames.map((char) => state.dilemmas[state.currentStep].characteristics[char]);
}

export default MODULE2;
