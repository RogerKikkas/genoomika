import { Link, routes } from '@redwoodjs/router'

const MenuLink = (props) => {
  return (
    <div className="w-full border-b-2 text-lg mb-2 text-gray-400 hover:text-gray-600">
      <Link className="" to={routes[props.route]()}>
        {props.children}
      </Link>
    </div>
  )
}

export default MenuLink
