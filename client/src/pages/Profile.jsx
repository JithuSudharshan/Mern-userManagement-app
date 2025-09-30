import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";


const Profile = () => {
  const picRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState(currentUser.profilePicture);
  const [uploaded, setUploaded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [picload, setPicload] = useState(false)

  const [updatedData, setUpdatedData] = useState({
    profilePicture: currentUser.profilePicture,
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPicload(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "UserManagement App"); // Replace with your preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dl1akodpl/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();


      setImageUrl(data.secure_url);
      setUpdatedData((prev) => ({
        ...prev,
        profilePicture: data.secure_url,
      }));

      setUploaded(true);
      setPicload(false)
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
    }
  };

  const handleSubmit = async (e) => {
    setIsUpdated(false)
    e.preventDefault();

    try {

      dispatch(updateStart());
      //prevent unchanged data from updating the db

      const changes = {};
      for (let key in updatedData) {
        if (updatedData[key] && updatedData[key] !== currentUser[key]) {
          changes[key] = updatedData[key];
        }
      }

      if (Object.keys(changes).length === 0) {
        alert("No changes made!");
        return;
      }


      //fetching the backend to post the updated form data
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      setUploaded(false);
      if (data) {
        //update the current user
        dispatch(updateSuccess(data));
        setIsUpdated(true);

        // clear password after update
        setUpdatedData((prev) => ({
          ...prev,
          password: "",
        }));
      }

    } catch (error) {
      dispatch(updateFailure(error))
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={picRef}
          accept="image/*"
          hidden
          onChange={handleFileUpload}
        />

        <img
          onClick={() => picRef.current.click()}
          src={imageUrl}
          alt="profilePic"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
        />

        {picload && <p className="text-center text-sm text-gray-600">Uploading...</p>}
        {uploaded && <p className="text-center text-green-700">Image uploaded successfully!</p>}

        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          value={updatedData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          value={updatedData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          value={currentUser.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <div>
        <p className="text-red-500 mt-5 ">{error && "Something went wrong while updating!"}</p>
        <p className="text-green-400">{isUpdated && "User is updated Sucessfuly!"}</p>
      </div>
    </div>
  );
};

export default Profile;
