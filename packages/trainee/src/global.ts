import m from 'mithril';

const state = {
    showHelp : true,
    dilemmas: [],
    currentDilemma: 0,
    acceptDilemma: acceptDilemma
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
    //check if we are on the last dilemma
    //go to the next dillema if not
    //show done if you are 
}

export default state;

//add accepted property default false to 