export { sessionSvc } from './services/session-service';

export const state = {
  showHelp: true,
  reflecting: false,
  roles: [],
  userRole: {
    id: '',
    title: '',
    description: '',
  },
  phases: [],
  claims: [],
  groups: [],
  dilemmas: [],
  assigned: [],
  currentStep: 0
};

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
