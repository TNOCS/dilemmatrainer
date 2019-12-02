import m from 'mithril';

const state = {
    showHelp : true,
    dilemmas: [],
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

export default state;

//add accepted property default false to 