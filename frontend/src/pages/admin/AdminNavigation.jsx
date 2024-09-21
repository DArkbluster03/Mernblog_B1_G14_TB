import React from "react";
import { NavLink } from "react-router-dom";
import AdminImg from "../../assets/admin.png";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { FaTachometerAlt, FaPlusCircle, FaCog, FaUsers } from "react-icons/fa";

const AdminNavigation = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  // Access the user's information from the Redux store
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <div className="space-y-5 bg-white p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between">
      <div>
        <div className="mb-5">
          <img src={AdminImg} alt="Admin" className="size-14" />
          <p className="font-semibold">Admin</p>
          {/* Display the logged-in user's email */}
          {user && <p className="text-gray-500">Logged in as: {user.email}</p>}
        </div>
        <hr />
        <ul className="space-y-5 pt-5">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              <FaTachometerAlt className="inline-block mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-new-post"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              <FaPlusCircle className="inline-block mr-2" />
              Add New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-items"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              <FaCog className="inline-block mr-2" />
              Manage Items
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              <FaUsers className="inline-block mr-2" />
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 font-medium px-5 py-1 rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavigation;
