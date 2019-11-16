import m, { Attributes, FactoryComponent } from 'mithril';
// import { labelResolver } from 'mithril-ui-form';
import { IScenario } from '../../../common/dist';
// import { ScenarioFormGenerator } from '../template/form';

export interface IFormattedEvent extends Attributes {
  scenario: Partial<IScenario>;
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

      return m('.row', { key: scenario.$loki }, [
        m('.row', m('h4.col.s12.primary-text', title)),
        m('.row', [
          // m('span.col.s12', 'KvK nummer: ' + kvk),
          // m('span.col.s12', 'Rechtsvorm: ' + p(rechtsvorm)),
          // m(AddressView, { address: scenario }),
        ]),
        m(
          '.row',
          m('.col.s12', [
            m('h5', 'Dilemmas'),
            // locaties &&
            //   locaties.length > 0 &&
            //   m(
            //     'p',
            //     `${naam} heeft in totaal ${locaties.length} locatie${locaties.length === 1 ? '' : 's'}, waarvan ${
            //       activeLocations === 0 ? 'geen enkele actief' : `${activeLocations} actief`
            //     }.`
            //   ),
          ])
        ),
      ]);
    },
  };
};
