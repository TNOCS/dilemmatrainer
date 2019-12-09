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