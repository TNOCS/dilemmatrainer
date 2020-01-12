import { Form, IInputField } from 'mithril-ui-form';
import { IScenario } from '../../../common/dist';
import { ICharacteristic } from '../../../common/dist/models/characteristic';

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
      className: 'col s12'
    })),
    className: 'row'
  } as IInputField);

export const scenarioFormGenerator = (scenario: Partial<IScenario>): Form => {
  const { roles = [], characteristics = [] } = scenario;

  const roleOptions = roles.map(r => ({ id: r.id, label: r.title }));
  // console.log(JSON.stringify(characteristicsForm(characteristics), null, 2));
  return [
    { id: 'Overview', type: 'section' },
    { type: 'md', value: '##### General information about the game.' },
    {
      id: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      className: 'col s12'
    },
    {
      id: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      className: 'col s12'
    },

    { id: 'settings', label: 'Roles & Characteristics', type: 'section' },
    {
      id: 'roles',
      label: 'Add role',
      type: [
        {
          id: 'id',
          autogenerate: 'id'
        },
        {
          id: 'title',
          label: 'Role',
          type: 'text',
          required: true,
          className: 'col s12'
        },
        {
          id: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          className: 'col s12'
        }
      ],
      repeat: true,
      pageSize: 1,
      propertyFilter: 'title',
      filterLabel: 'Filter by role'
    },
    {
      id: 'characteristics',
      label: 'Add characteristic',
      type: [
        {
          id: 'id',
          autogenerate: 'id'
        },
        {
          id: 'title',
          label: 'Characteristic',
          type: 'text',
          required: true,
          className: 'col s12 m12'
        },
        {
          id: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          className: 'col s12'
        },
        {
          id: 'values',
          label: 'Specify qualifiers',
          type: [
            {
              id: 'id',
              autogenerate: 'id'
            },
            {
              id: 'title',
              label: 'Label',
              type: 'text',
              className: 'col s12 m9'
            },
            {
              id: 'description',
              label: 'Description',
              type: 'text',
              className: 'col s12'
            }
          ],
          repeat: true,
          pageSize: 3
        }
      ],
      repeat: true,
      pageSize: 1,
      propertyFilter: 'title',
      filterLabel: 'Filter by characteristic'
    },

    { id: 'Claims', type: 'section' },
    {
      id: 'claims',
      label: 'Add claim',
      type: [
        {
          id: 'id',
          autogenerate: 'id'
        },
        {
          id: 'description',
          label: 'Claim',
          type: 'textarea',
          required: true,
          className: 'col s12'
        },
        {
          id: 'roleId',
          label: 'Role',
          options: roleOptions,
          type: 'select',
          multiple: true,
          required: true,
          className: 'col s12 m6'
        },
        {
          id: 'reason',
          label: 'Reason for accepting or rejecting the dilemma',
          type: 'textarea',
          required: false,
          className: 'col s12'
        },
      ],
      repeat: true,
      pageSize: 1,
      propertyFilter: 'title',
      filterLabel: 'Filter by title'
    },
    { id: 'Dilemmas', type: 'section' },
    {
      id: 'dilemmas',
      label: 'Add dilemma',
      type: [
        {
          id: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          className: 'col s12 m9'
        },
        {
          id: 'score',
          label: 'Belongs to team [%] ',
          type: 'number',
          min: 0,
          max: 100,
          className: 'col s12 m3'
        },
        {
          id: 'description',
          label: 'Dilemma',
          type: 'textarea',
          required: true,
          className: 'col s12'
        },
        {
          id: 'shouldAccept',
          label: 'Should be accepted',
          type: 'checkbox',
          required: true,
          className: 'col s12 acceptDilemmaToggle'
        },
        {
          id: 'reason',
          label: 'Reason for accepting or rejecting the dilemma',
          type: 'textarea',
          className: 'col s12'
        },
        { type: 'md', value: 'Characteristics of the dilemma' },
        characteristicsForm(characteristics),
        {
          id: 'forRoles',
          label: 'Add role that should perform this job',
          type: [
            {
              id: 'roleId',
              label: 'Role',
              options: roleOptions,
              type: 'select',
              className: 'col s12 m6'
            },
            {
              id: 'score',
              label: 'Score [%]',
              type: 'number',
              min: 0,
              max: 100,
              className: 'col s12 m6'
            }
            /*
            {
              id: 'description',
              label: 'Explanation',
              options: roles,
              type: 'textarea',
              className: 'col s12',
            },*/
          ],
          repeat: true,
          pageSize: 1
        }
      ],
      repeat: true,
      pageSize: 1,
      propertyFilter: 'title',
      filterLabel: 'Filter by title'
    },

    { id: 'agreements', label: 'Work agreements', type: 'section' },
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
          roles: roleOptions,
          type: 'options',
          multiple: true
        }
      ]
    },

    { id: 'phases', label: 'Scenario phases', type: 'section' },
    {
      id: 'phases',
      label: 'Add scenario phase',
      repeat: true,
      pageSize: 1,
      propertyFilter: 'title',
      filterLabel: 'Filter by title',
      type: [
        { id: 'title', label: 'Title', type: 'text' },
        { id: 'description', label: 'Description', type: 'textarea' },
        {
          id: 'lat',
          label: 'Add latitude of location',
          type: 'text'
        },
        {
          id: 'long',
          label: 'Add longitude of location',
          type: 'text'
        }
      ]
    }
  ] as Form;
};
