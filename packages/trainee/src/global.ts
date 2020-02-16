export { gameSvc } from './services/scenario-service';
export { sessionSvc } from './services/session-service';

export var state = {
  showHelp: true,
  reflecting: false,
  roles: [],
  userRole: {
    id: '',
    title: '',
    description: '',
  },
  groups: [],
  claims: [],
  dilemmas: [],
  charas: [],
  scenarios: []
};

export var session = {
  active: true,
  activeModule: "claims",
  activeStepIndex: 0,
  answeredClaims: [],
  workAgreements: [],
  answeredDilemmas: [],
  activeScenarioDilemmaIndex: { activeStepIndex: 0 },
  send: () => {
    this.sessionSvc.update(session)
  }
} 

/*
export const getPickedDilemmas = () => {
  state.dilemmas.forEach(topic => {
    if (topic.accepted) {
      state.pickedDilemmas.push(topic);
    }
  });
};

export const rejectPickedDilemma = () => {
  const { showHelp, pickedDilemmas, currentDilemma } = state;

  if (!showHelp) {
    pickedDilemmas[currentDilemma]['accepted'] = false;
    if (pickedDilemmas.length >= currentDilemma + 1) {
      state.currentDilemma += 1;
    }
  }
};
*/

//shift + alt + F
