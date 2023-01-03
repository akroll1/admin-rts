import { IoCalendar, IoGrid, IoHelpBuoy } from 'react-icons/io5'
import { MdWeb } from 'react-icons/md'

export const links = [
  { label: 'Shows', href: '/shows' },
  { label: 'Scorecards', href: '/scorecards' },
  {
    label: 'FightSync',
    children: [
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
      // {
      //   label: 'CounterPunch Live!',
      //   description: 'The ultimate boxing trivia game show! Play and answer questions- live and in real time to win prizes!',
      //   href: '/live',
      //   icon: <IoCalendar />,
      // },
    ],
  }
]