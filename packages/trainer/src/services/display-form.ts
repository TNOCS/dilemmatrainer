import m, { Attributes, FactoryComponent } from 'mithril';
import { LayoutForm } from 'mithril-ui-form';
// import { labelResolver } from 'mithril-ui-form';
import { IGame } from '../../../common/dist';
import { gameFormGenerator } from '../template/form';

export interface IFormattedEvent extends Attributes {
  scenario: Partial<IGame>;
  filterValue?: string;
}

/**
 * Display the form in a format that is useful for the end user.
 */
export const DisplayForm: FactoryComponent<IFormattedEvent> = () => {
  // const state = {
  //   showDetails: undefined,
  //   resolveObj: labelResolver(ScenarioForm),
  // } as {
  //   resolveObj: <T>(obj: any, parent?: string | undefined) => T | undefined;
  //   showDetails?: string;
  // };

  return {
    view: ({ attrs: { scenario } }) => {
      const { title, /** $loki */ } = scenario;
      const form = gameFormGenerator(scenario);

      return m('.row', { key: scenario.$loki }, [
        m('.row', m('h4.col.s12.primary-text', title)),
        m(
          '.row',
          m(LayoutForm, {
            form,
            obj: scenario,
            readonly: true,
          })
        ),
      ]);
    },
  };
};
