/** A component to show a decision */
import m, { Attributes, FactoryComponent } from 'mithril';
import { Select } from 'mithril-materialized';
import { ICharacteristic, IDilemma } from '../../../../common/src';

export interface IDecisionTypeView extends Attributes {
  characteristics: ICharacteristic[];
  dilemma: IDilemma;
  readonly?: boolean;
}

export type YesNo = 'yes' | 'no';

export const DecisionTypeView: FactoryComponent<IDecisionTypeView> = () => {
  const expectedProps = ['time', 'uncertainty', 'conflicts'];
  return {
    view: ({ attrs: { characteristics, dilemma, readonly } }) => {
      const checkCharacteristics = () =>
        characteristics.reduce(
          (acc, c) => acc && expectedProps.indexOf(c.id) >= 0,
          true
        );
      const decisionModel = () => {
        const { characteristics: cv } = dilemma;
        const decision = (cv['time'] === 'yes' ? 4 : 0) + (cv['uncertainty'] === 'yes' ? 2 : 0) + (cv['conflicts'] === 'yes' ? 1 : 0);
        switch (decision) {
          case 0: return { decision, label: 'Routinely'};
          case 1: return { decision, label: 'Negociating'};
          case 2: return { decision, label: 'Consultative'};
          case 3: return { decision, label: 'Consultative & Negociating'};
          case 4: return { decision, label: 'Hammer piece'};
          case 5: return { decision, label: 'Authoritative'};
          default: return { decision, label: 'Intuititive'};
        }
      };
      const { decision: d, label } = decisionModel();
      console.log(d);
      if (!checkCharacteristics()) {
        return;
      }
      if (readonly) {
        return m('p', label + ' decision making');
      }
      return m(Select, {
        checkedId: d,
        label: 'Decision making type',
        options: [
          { id: 0, label: 'Routinely' },
          { id: 1, label: 'Negociating' },
          { id: 2, label: 'Consultative' },
          { id: 3, label: 'Consultative & Negociating' },
          { id: 4, label: 'Hammer piece' },
          { id: 5, label: 'Authoritative' },
          { id: 6, label: 'Intuititive (no conflicts)' },
          { id: 7, label: 'Intuititive (with conflicts)' },
        ],
        onchange: dec => {
          const d = dec instanceof Array ? +dec[0] : +dec;
          dilemma.characteristics = {
            time: d >= 4 ? 'yes' : 'no',
            uncertainty: d - 4 >= 2 ? 'yes' : 'no',
            conflicts: d - 6 >= 1 ? 'yes' : 'no',
          };
        }
      });
    },
  };
};
