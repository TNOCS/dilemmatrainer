import { Form, IInputField } from 'mithril-ui-form';
import { ICharacteristic, IGame } from '../../../common/src';

export const characteristicsForm = (
  characteristics = [] as ICharacteristic[]
): IInputField =>
  ({
    id: 'characteristics',
    type: characteristics.map(c => ({
      id: c.id,
      label: c.title,
      options: c.values && c.values.map(v => ({ id: v.id, label: v.title })),
      type: 'radio',
      inline: true,
      className: 'col s12',
    })),
    className: 'col s12',
  } as IInputField);

const scenarioPhaseForm = [
  {
    id: 'title',
    label: 'Scenario title',
    type: 'text',
    required: true,
    className: 'col s12',
  },
  {
    id: 'description',
    label: 'Background information (markdown)',
    type: 'textarea',
    required: true,
    className: 'col s12',
  },
  {
    id: 'mapUrl',
    label: 'URL to the map',
    type: 'url',
    className: 'col s6',
  },
  {
    id: 'legendUrl',
    label: 'URL to the legend',
    type: 'url',
    className: 'col s6',
  },
] as Form;

export const gameFormGenerator = (game: Partial<IGame>): Form => {
  const { roles = [], groups = [], characteristics = [] } = game;

  const roleOptions = roles.map(r => ({ id: r.id, label: r.title }));
  const groupOptions = groups.map(r => ({ id: r.id, label: r.title }));
  // console.log(JSON.stringify(characteristicsForm(characteristics), null, 2));
  return [
    { id: 'settings', type: 'section' },
    { type: 'md', value: '##### General information about the game.' },
    {
      id: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      className: 'col s12',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      className: 'col s12',
    },
    {
      id: 'groups',
      label: 'Add group or organisation',
      type: [
        {
          id: 'id',
          autogenerate: 'id',
        },
        {
          id: 'title',
          label: 'Group or organisation',
          type: 'text',
          required: true,
          className: 'col s12',
        },
        {
          id: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          className: 'col s12',
        },
        {
          id: 'isMain',
          label: 'Main group of the game',
          type: 'checkbox',
          className: 'col s12 m6',
        },
        {
          id: 'level',
          show: '!isMain',
          label: 'Group order',
          description:
            'Main group is at level 0, the one above at +1, below -1',
          type: 'number',
          min: -2,
          max: 2,
          className: 'col s12 m6',
        },
      ],
      repeat: true,
      pageSize: 1,
      propertyFilter: 'title',
      filterLabel: 'Filter by role',
    },
    {
      id: 'roles',
      label: 'Add role',
      type: [
        {
          id: 'id',
          autogenerate: 'id',
        },
        {
          id: 'title',
          label: 'Role',
          type: 'text',
          required: true,
          className: 'col s12',
        },
        {
          id: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          className: 'col s12',
        },
      ],
      repeat: true,
      pageSize: 1,
      propertyFilter: 'title',
      filterLabel: 'Filter by role',
    },
    {
      id: 'characteristics',
      label: 'Add characteristic',
      type: [
        {
          id: 'id',
          autogenerate: 'id',
        },
        {
          id: 'title',
          label: 'Characteristics of a (module 2) dilemma',
          type: 'text',
          required: true,
          className: 'col s12 m12',
        },
        {
          id: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          className: 'col s12',
        },
        {
          id: 'values',
          label: 'Specify qualifiers',
          type: [
            {
              id: 'id',
              autogenerate: 'id',
            },
            {
              id: 'title',
              label: 'Label',
              type: 'text',
              className: 'col s12 m9',
            },
            {
              id: 'description',
              label: 'Description',
              type: 'text',
              className: 'col s12',
            },
          ],
          repeat: true,
          pageSize: 3,
        },
      ],
      repeat: true,
      pageSize: 1,
      propertyFilter: 'title',
      filterLabel: 'Filter by characteristic',
    },

    { id: 'Claims', type: 'section' },
    {
      id: 'claimsModule',
      label: '##### Claims (module 1)',
      type: [
        {
          id: 'show',
          label: 'Play module',
          type: 'checkbox',
          class: 'col s12',
          value: true,
        },
        {
          id: 'claims',
          label: 'Add claim',
          type: [
            {
              id: 'id',
              autogenerate: 'id',
            },
            {
              id: 'title',
              label: 'Claim',
              type: 'textarea',
              required: true,
              className: 'col s12',
            },
            {
              id: 'groupId',
              label: 'Group or organisation',
              options: groupOptions,
              type: 'select',
              multiple: true,
              required: true,
              className: 'col s12 m6',
            },
            {
              id: 'reason',
              label: 'Reason for assigning it to this group',
              type: 'textarea',
              required: false,
              className: 'col s12',
            },
          ],
          repeat: true,
          pageSize: 1,
          propertyFilter: 'title',
          filterLabel: 'Filter by title',
        },
      ],
    },
    { id: 'Dilemmas', type: 'section' },
    {
      id: 'dilemmasModule',
      label: `##### Dilemmas (module 2)

In this module, the trainees need to work together to determine how they are going to deal with the presented situation.`,
      type: [
        {
          id: 'show',
          label: 'Play module',
          type: 'checkbox',
          class: 'col s12',
          value: true,
        },
        ...scenarioPhaseForm,
        {
          id: 'dilemmas',
          label: 'Add dilemma',
          type: [
            {
              id: 'description',
              label: 'Relevant context',
              type: 'textarea',
              required: true,
              className: 'col s12',
            },
            {
              id: 'title',
              label: 'Dilemma',
              type: 'text',
              required: true,
              className: 'col s12',
            },
            {
              id: 'notes',
              label: 'Notes',
              type: 'textarea',
              className: 'col s12',
            },
            characteristicsForm(characteristics),
          ],
          repeat: true,
          pageSize: 1,
          propertyFilter: 'title',
          filterLabel: 'Filter by title',
        },
      ],
    },
    { id: 'agreements', label: 'Work agreements', type: 'section' },
    {
      id: 'workAgreementsModule',
      label: `##### Work agreements (module 3)

Optionally, add some predefined work agreements.`,
      type: [
        {
          id: 'show',
          label: 'Play module',
          type: 'checkbox',
          class: 'col s12',
          value: true,
        },
        {
          id: 'workAgreements',
          label: 'Add work agreement',
          repeat: true,
          pageSize: 1,
          propertyFilter: 'title',
          filterLabel: 'Filter by title',
          type: [
            { id: 'title', label: 'Title', type: 'text' },
            { id: 'description', label: 'Description', type: 'textarea' },
            {
              id: 'roles',
              label: 'Roles that have made this agreement',
              options: roleOptions,
              type: 'select',
              multiple: true,
            },
          ],
        },
      ],
    },

    { id: 'scenarioModule', label: 'Scenario module', type: 'section' },
    {
      id: 'scenariosModule',
      label: `##### Scenario module (module 4)

In this module, the trainees will experience multiple dilemmas in the context of a fictive scenario.`,
      type: [
        {
          id: 'show',
          label: 'Play module',
          type: 'checkbox',
          class: 'col s12',
          value: true,
        },
        {
          id: 'scenarios',
          label: 'Add scenario',
          repeat: true,
          pageSize: 5,
          propertyFilter: 'title',
          filterLabel: 'Filter by title',
          type: [
            ...scenarioPhaseForm,
            {
              id: 'dilemmas',
              label: 'Add dilemma',
              type: [
                {
                  id: 'description',
                  label: 'Describe the situation',
                  type: 'textarea',
                  required: true,
                  className: 'col s12',
                },
                {
                  id: 'title',
                  label: 'Dilemma',
                  type: 'text',
                  required: true,
                  className: 'col s12',
                },
                {
                  id: 'notes',
                  label: 'Notes',
                  type: 'textarea',
                  className: 'col s12',
                },
              ],
              repeat: true,
              pageSize: 1,
              propertyFilter: 'title',
              filterLabel: 'Filter by title',
            },
          ],
        },
      ],
    },
  ] as Form;
};
