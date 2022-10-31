import { IoCalendar, IoGrid, IoHelpBuoy } from 'react-icons/io5'
import { MdWeb } from 'react-icons/md'

export const links = [
  { label: 'Scorecards', href: '/scorecards' },
  { label: 'Shows', href: '/shows' },
  {
    label: 'FightSync',
    children: [
      // {
      //   label: 'Fighter Talk',
      //   description: 'Fighters discuss all things fighting.',
      //   href: '/discussions',
      //   icon: <IoGrid />,
      // },
      {
        label: 'Latest Boxing News',
        description: 'Updated in real-time.',
        href: '/news',
        icon: <IoHelpBuoy />,
      },
      {
        label: 'Blog',
        description: 'Get the latest boxing insights from the team.',
        href: '/blog',
        icon: <MdWeb />,
      },
      {
        label: 'CounterPunch Live!',
        description: 'The ultimate boxing trivia game show! Play and answer questions- live and in real time to win prizes!',
        href: '/live',
        icon: <IoCalendar />,
      },
    ],
  }
]