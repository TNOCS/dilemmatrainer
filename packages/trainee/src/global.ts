import m from 'mithril';

const state = {
    showHelp : true,
    roles: [],
    phases: [],
    dilemmas: [],
    pickedDilemmas: [],
    currentDilemma: 0,
    getPickedDilemmas : getPickedDilemmas,
    rejectPickedDilemma : rejectPickedDilemma
}
/*
m.request({
    method: "GET",
    url: "http://localhost:3030/api/scenarios/view", //put domain in config 
    params: {props: "dilemmas"},
    body: {}
})
.then(function(result) {
    state.dilemmas = result[0].dilemmas //get result that corresponds with game title
})

m.request({
    method: "GET",
    url: "http://localhost:3030/api/scenarios/view", //put domain in config
    params: {props: "phases"},
    body: {}
})
.then(function(result) {
    state.phases = result[0].phases
})
*/

function getPickedDilemmas(){
    state.dilemmas.forEach(topic => {
        if (topic.accepted){
            state.pickedDilemmas.push(topic)
        }
    });
}

function rejectPickedDilemma(){
    if (!state.showHelp){
        state.pickedDilemmas[state.currentDilemma]["accepted"] = false;
        if (state.pickedDilemmas.length >= (state.currentDilemma + 1)){
            state.currentDilemma +=1;
        }
    }
}

export default state;

//add accepted property default false to 