import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function ProfileDetails() {
  const [profileImage, setProfileImage] = useState(null);
  const {user}=useContext(AuthContext)
  console.log(user)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-10 max-w-4xl mx-auto mt-10 flex flex-col md:flex-row items-center gap-10 border border-gray-200">
      {/* Left: Profile Image */}
      <div className="relative flex flex-col items-center">
        <img
          src={
            profileImage ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt="Profile"
          className="w-48 h-48 rounded-full object-cover border-4 border-blue-950 shadow-md"
        />
        <label
          htmlFor="upload"
          className="absolute bottom-3 right-4 bg-blue-800 text-white p-3 rounded-full cursor-pointer hover:bg-blue-700 shadow-md transition"
          title="Change photo"
        >
          📷
        </label>
        <input
          id="upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Right: Details Section */}
      <div className="flex-1 text-left">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-b-4 border-blue-950 inline-block pb-1">
          Profile Details
        </h2>

        <div className="space-y-4 text-gray-800">
          <p className="text-lg">
            <span className="font-semibold text-blue-900 w-40 inline-block">
              Name:
            </span>{" "}
            <span className="font-bold">{user.name}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-blue-900 w-40 inline-block">
              Email:
            </span>{" "}
            <span className="font-bold">{user.email}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-blue-900 w-40 inline-block">
              Phone:
            </span>{" "}
            <span className="font-bold">{user.phone}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-blue-900 w-40 inline-block">
              Department:
            </span>{" "}
            <span className="font-bold">{user.department}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-blue-900 w-40 inline-block">
              Role:
            </span>{" "}
            <span className="font-bold">{user.role}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
