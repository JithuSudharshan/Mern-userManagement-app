import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='bg-slate-200'>

      <div className='flex justify-between items-center max-w-6xl mx-auto p-3  '>
        <h1 className='font-bold '>UserManagement-App</h1>
        <ul className='flex gap-5'>
          <Link to="/profile" >
            <li>Home</li>
          </Link>
          <Link to="/profile">
            {currentUser ? <img className="w-8 h-8 rounded-full object-cover" src={currentUser?.profilePicture} alt="profile" /> :
              <li>Sign in</li>}
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header