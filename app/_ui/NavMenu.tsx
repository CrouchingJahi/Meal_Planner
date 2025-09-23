'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentType } from "react"
import { HomeIcon, RecipesIcon, PantryIcon } from "./Icons"

export default function NavMenu () {
  const currentPath = usePathname()
  /*
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const navClass = `transition-[width] ${isNavExpanded ? 'w-[100px]' : 'w-[40px]'}`

  function toggleNav () {
    setIsNavExpanded(!isNavExpanded)
  }
  */

  return <nav>
    {/* Expanding nav functionality causes icons to rerender, which gives jumpy animations
    <button onClick={toggleNav}>
      <MenuIcon />
    </button>
    */}
    <div className="flex flex-col gap-2">
      <NavLink link="/" label="Home" Icon={HomeIcon} />
      <NavLink link="/recipes" label="Recipes" Icon={RecipesIcon} />
      <NavLink link="/pantry" label="Pantry" Icon={PantryIcon} />
      {/* <NavLink link="/schedule" label="Meal Schedule" Icon={CalendarIcon} /> */}
    </div>
  </nav>

  function NavLink ({link, label, Icon}: {link: string, label: string, Icon: ComponentType}) {
    const isActive = currentPath == link
    const isAncestorActive = currentPath.startsWith(link) && link != '/'
    const linkClasses = `nav p-1 p-r-4 flex gap-1 items-end border-r-4 hover:text-links transition-colors ${isActive ? 'text-links border-links' : isAncestorActive ? 'text-foreground border-links' : 'text-foreground border-transparent'}`
    return <Link href={link} title={label} className={linkClasses}>
      <Icon />
      {/* <div className={isNavExpanded ? '' : 'hidden'}>{ label }</div> */}
    </Link>
  }
}
