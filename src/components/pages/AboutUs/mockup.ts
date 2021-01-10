
export const breadcrumbs = [
  'Инвестиционные предложения',
  'Завод ЖБИ',
];

export const sidebar = [{
  heading: 'Предложение',
  hash: '#about',
},
{
  heading: 'О проекте',
  hash: '#about',
  items: [
    {
      label: 'Описание',
      hash: '#about',
    },
    {
      label: 'Галерея',
      hash: '#gallery',
    },
    {
      label: 'Команда',
      hash: '#team',
    },
    {
      label: 'Дорожная карта',
      hash: '#team',
    },
    {
      label: 'Контакты',
      hash: '#team',
    },
    {
      label: 'Дополнительно',
      hash: '#team',
    },
  ],
},
{
  heading: 'О заемщике',
  hash: '#bout-the-borrower',
  items: [
    {
      label: 'Организация',
      hash: '#about',
    },
    {
      label: 'Учредители',
      hash: '#about',
    },
    {
      label: 'Прочее',
      hash: '#about',
    },
  ],
},
{
  heading: 'Документы',
  hash: '#docs',
},
{
  heading: 'Эксперты',
  hash: '#experts',
}];

export const roadmap = [
  {
    label: 'Июль 2020',
    desc: 'Описание',
  },
  {
    label: 'Август 2020',
    desc: 'Описание',
  },
  {
    label: 'Сентябрь 2020',
    desc: 'Описание',
  },
  {
    label: 'Ноябрь 2020',
    desc: 'Описание',
    active: true,
  },
  {
    label: 'Декабрь 2020',
    desc: 'MVP',
  },
];

export const tabs = [
  {id: '1', label: 'Организация'},
  {id: '2', label: 'Учредители'},
  {id: '3', label: 'Прочие факты'},
];
