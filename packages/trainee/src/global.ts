import m from 'mithril';

const state = {
    showHelp : true,
    dilemmas: [],
    currentDilemma: 0,
    acceptDilemma: acceptDilemma,
    getPickedDilemmas : getPickedDilemmas
}

m.request({
    method: "GET",
    url: "http://localhost:3030/api/scenarios/view", //put domain in config
    params: {props: "dilemmas"},
    body: {}
})
.then(function(result) {
    state.dilemmas = result[0].dilemmas
})


function acceptDilemma(choice){
    if (!state.showHelp){
        state.dilemmas[state.currentDilemma]["accepted"] = choice;
        if (state.dilemmas.length >= (state.currentDilemma + 1)){
            state.currentDilemma +=1;
        }
    }
}

function getPickedDilemmas(){
    var picked = []
    state.dilemmas.forEach(topic => {
        if (topic.accepted){
            picked.push(topic)
        }
    });

    return picked
}

export default state;

//add accepted property default false to 