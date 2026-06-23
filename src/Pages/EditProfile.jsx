import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUserData } from "../Utils/UserSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const EditProfile = () => {
  const { firstName, lastName, bio } = useSelector((store) => store.user);

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    bio: bio || "",
  });

  const dispatch = useDispatch();
  const nav = useNavigate();

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
    try {
      const res = await axios.patch(
        import.meta.env.VITE_BACKEND_URL + "/profile/edit",
        formData,
        {
          withCredentials: true,
        }
      );

      dispatch(addUserData(res.data.data));
      nav("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Edit Profile
            </h1>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2">
                  First Name
                </label>

                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={changeHandler}
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Last Name
                </label>

                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={changeHandler}
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={changeHandler}
                  rows={4}
                  maxLength={250}
                  placeholder="Write something about yourself..."
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none resize-none focus:border-indigo-500"
                ></textarea>

                <p className="text-right text-sm text-gray-400">
                  {formData.bio.length}/250
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => nav("/profile")}
                  className="w-full py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={saveHandler}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;