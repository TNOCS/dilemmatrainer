export { gameSvc } from './services/game-service';
import { ISession } from '../../common/src';
import {
  ICharacteristic,
  IClaim,
  IDilemma,
  IGroup,
  IRole,
  IScenarioPhase,
} from '../../common/src';
export { sessionSvc } from './services/session-service';

export const state = {
  showHelp: true,
  reflecting: false,
  roles: [] as IRole[],
  userRole: {
    id: '',
    title: '',
    description: '',
  } as IRole,
  groups: [] as IGroup[],
  claims: [] as IClaim[],
  dilemmas: [] as IDilemma[],
  charas: [] as ICharacteristic[],
  scenarios: [] as IScenarioPhase[],
  session: undefined as Partial<ISession>,
};

// export const session = {
//   api: sessionSvc.trainerAPI,
//   active: true,
//   gameId: -1,
//   activeModule: 'claims',
//   activeStepIndex: 0,
//   answeredClaims: [],
//   workAgreements: [],
//   answeredDilemmas: [],
//   activeScenarioDilemmaIndex: { activeStepIndex: 0 },
//   send: () => {
//     const sessionSend = {
//       active: session.active,
//       activeModule: session.activeModule,
//       activeStepIndex: session.activeStepIndex,
//       answeredClaims: session.answeredClaims,
//       workAgreements: session.workAgreements,
//       answeredDilemmas: session.answeredDilemmas,
//       activeScenarioDilemmaIndex: session.activeScenarioDilemmaIndex,
//     };
//     sessionSvc.update(sessionSend);
//   },
// } as Partial<ISession>;

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

// shift + alt + F
