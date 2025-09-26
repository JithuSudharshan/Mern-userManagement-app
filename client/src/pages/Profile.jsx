import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const picRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [imageUrl, setImageUrl] = useState(currentUser.profilePicture);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false)


  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "UserManagement App"); // replace with your preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dl1akodpl/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setImageUrl(data.secure_url); // Cloudinary hosted image URL
      setLoading(false);

      if (data) {
        setUploaded(true)
      }


    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* Hidden file input */}
        <input
          type="file"
          ref={picRef}
          accept="image/*"
          hidden
          onChange={handleFileUpload}
        />

        {/* Profile Picture */}
        <img
          onClick={() => picRef.current.click()}
          src={imageUrl}
          alt="profilePic"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
        />
        {loading && <p className="text-center text-sm text-gray-500">Uploading...</p>}
        {uploaded && <p className="text-center text-green-500">image uploaded sucessfully!</p>}

        {/* Inputs */}
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
