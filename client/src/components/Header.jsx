import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='bg-slate-200'>

        <div className='flex justify-between items-center max-w-6xl mx-auto p-3  '>
            <h1 className='font-bold '>UserManagement-App</h1>
            <ul className='flex gap-5'>
                <Link to="/" >
                  <li>Home</li>
                </Link>
                <Link to="/sign-In">
                  <li>Sign in</li>
                </Link>
            </ul>
        </div>

    </div>
  )
}

export default Header