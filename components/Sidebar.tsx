import React, { useEffect, useState } from 'react'
import HomeIcon from '@material-ui/icons/Home'
import {
  faChevronRight,
  faGamepad,
  faCode,
  faBook,
  faUserCircle,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SidebarData = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Scripting Extensions',
    icon: <FontAwesomeIcon icon={faCode} />,
    link: '/droprates',
  },
  {
    title: 'Video Game Tools',
    icon: <FontAwesomeIcon icon={faGamepad} />,
    link: '/gw2',
  },
  {
    title: 'Documentaion',
    icon: <FontAwesomeIcon icon={faBook} />,
    link: '/map',
  },
  {
    title: 'Private Services',
    icon: <FontAwesomeIcon icon={faUserLock} />,
    link: '/memes',
  },
  {
    title: 'Account',
    icon: <FontAwesomeIcon icon={faUserCircle} />,
    link: '/account',
  },
]

function Sidebar() {
  const [ActivePath, setActivePath] = useState('/')
  const [SidebarExpanded, setSidebarExpanded] = useState(false)

  useEffect(() => {
    setActivePath(window.location.pathname)
  }, [])

  function ToggleSidebarExpansion() {
    setSidebarExpanded(!SidebarExpanded)
  }
  return (
    <div className={`sidebar ${SidebarExpanded ? 'expanded' : ''}`}>
      <ol className={`sidebar-list ${SidebarExpanded ? 'expanded' : ''}`}>
        {SidebarData.map(({ title, icon, link }, key) => {
          return (
            <li
              id={ActivePath == link ? 'active' : ''}
              className={`sidebar-row flex flex-row ${
                SidebarExpanded ? 'expanded' : ''
              }`}
              key={key}
              onClick={(e) => {
                window.location.pathname = link
              }}
            >
              <div
                className={`sidebar-item-icon ${
                  SidebarExpanded ? 'expanded' : ''
                }`}
              >
                {icon}
              </div>
              <div className="link-text">{title}</div>
            </li>
          )
        })}
        <li
          className={`sidebar-row flex flex-row ${
            SidebarExpanded ? 'expanded' : ''
          }`}
          key={SidebarData.length}
          onClick={(e) => {
            ToggleSidebarExpansion()
          }}
        >
          <div
            className={`sidebar-item-icon animate-hflip ${
              SidebarExpanded ? 'expanded' : ''
            }`}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          <div className="link-text">Collapse Sidebar</div>
        </li>
      </ol>
    </div>
  )
}

export default Sidebar

{
  /* <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="angle-double-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
          >
            <g className="fa-group">
              <path
                fill="currentColor"
                d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                className="fa-secondary"
              ></path>
              <path
                fill="currentColor"
                d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                className="fa-primary"
              ></path>
            </g>
          </svg> */
}
