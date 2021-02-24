import { Link, routes } from '@redwoodjs/router'

const MenuLink = (props) => {
  return (
    <div className="w-full border-b-2 border-gray-400 text-lg mb-2 text-gray-600 hover:text-black">
      <Link className="" to={routes[props.route]()}>
        {props.children}
      </Link>
    </div>
  )
}

export default MenuLink
