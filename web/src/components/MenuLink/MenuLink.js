import { Link, routes } from '@redwoodjs/router'

const MenuLink = (props) => {
  return (
    <div className="w-full text-lg mb-2 text-white hover:text-gray-300">
      <Link className="" to={routes[props.route]()}>
        {props.children}
      </Link>
    </div>
  )
}

export default MenuLink
