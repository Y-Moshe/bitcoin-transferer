import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Navbar,
  NavbarGroup,
  Alignment,
  Button,
  Position,
  Menu,
  MenuItem,
  MenuDivider,
  Switch,
  Icon,
  Classes,
} from '@blueprintjs/core'
import { Popover2 as Popover } from '@blueprintjs/popover2'
import MediaQuery from 'react-responsive'

import BitcoinIcon from './Icons/BitcoinIcon'
import { logoutUser, setUserSettings } from '../store/actions/user.actions'

const links = [
  {
    href: '/home',
    text: 'Home',
    icon: 'home',
  },
  {
    href: '/contact',
    text: 'Contact',
    icon: 'id-number',
  },
  {
    href: '/statistic',
    text: 'Statistics',
    icon: 'timeline-bar-chart',
  },
]

export default function AppHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const { loggedInUser } = useSelector(({ userModule }) => userModule)
  const dispatch = useDispatch()

  const [isUserNavOpen, setIsUserNavOpen] = useState(false)

  const openUserNav = () => setIsUserNavOpen(true)
  const closeUserNav = () => setIsUserNavOpen(false)
  const handleDarkModeChange = ({ target }) =>
    dispatch(setUserSettings({ isDark: target.checked }))

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/signup', { replace: true })
  }

  const isNavActive = (path) => {
    const currentPath = location.pathname
    return currentPath === path
  }

  const userName = loggedInUser?.name || ''
  const isDark = loggedInUser?.settings?.isDark

  return (
    <header className='main-header main-layout full'>
      <Navbar className='full'>
        {/* <Navbar> */}

        <NavbarGroup align={Alignment.LEFT}>
          <Navbar.Heading className='flex align-center gap-5'>
            <BitcoinIcon />
            Bitcoin Transferer
          </Navbar.Heading>
        </NavbarGroup>

        {loggedInUser && (
          <NavbarGroup align={Alignment.RIGHT} className='gap-5'>
            <MediaQuery minWidth={568}>
              {links.map((link) => (
                <Link to={link.href} key={link.text}>
                  <Button
                    minimal
                    icon={link.icon}
                    text={link.text}
                    active={isNavActive(link.href)}
                  />
                </Link>
              ))}
            </MediaQuery>

            <Navbar.Divider />

            <Popover
              isOpen={isUserNavOpen}
              position={Position.BOTTOM_RIGHT}
              onClose={closeUserNav}
              interactionKind='hover'
              onInteraction={openUserNav}
              content={UserNav({
                userName,
                isDark,
                navigate,
                onDarkModeChange: handleDarkModeChange,
                onLogout: handleLogout,
                isNavActive,
              })}>
              <Button minimal icon='cog' onClick={openUserNav} />
            </Popover>
          </NavbarGroup>
        )}
      </Navbar>
    </header>
  )
}

function UserNav({
  userName,
  isDark,
  onDarkModeChange,
  navigate,
  isNavActive,
  onLogout,
}) {
  const darkIcon = <Icon icon='contrast' color={isDark ? 'darkblue' : 'gold'} />
  const darkSwitch = (
    <Switch
      checked={isDark}
      onChange={onDarkModeChange}
      className={Classes.FOCUS_DISABLED + ' m-0'}
    />
  )

  return (
    <Menu onClick={(ev) => ev.stopPropagation()}>
      <MediaQuery maxWidth={567}>
        {links.map((link) => (
          <MenuItem
            key={link.text}
            text={
              <Button
                alignText='left'
                minimal
                fill
                icon={link.icon}
                text={link.text}
                onClick={() => navigate(link.href)}
                active={isNavActive(link.href)}
              />
            }></MenuItem>
        ))}
        <MenuDivider />
      </MediaQuery>

      <MenuItem icon='user' text={userName} onClick={() => navigate('/home')} />
      <MenuItem icon={darkIcon} text={darkSwitch} />
      <MenuDivider />
      <MenuItem
        icon='log-out'
        text='Log-out'
        intent='danger'
        onClick={onLogout}
      />
    </Menu>
  )
}
