import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUserData } from "../Utils/UserSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const Profile = () => {
  const {
    username,
    firstName,
    lastName,
    displayPicture,
    bio,
    followers = [],
    following = [],
    posts = [],
  } = useSelector((store) => store.user);

  const [uploadedImg, setUploadedImg] = useState(null);

  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (!uploadedImg) return;

    const formData = new FormData();
    formData.append("file", uploadedImg);
    formData.append("upload_preset", "Socially");

    async function uploadImg() {
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/derddgaed/image/upload",
          formData
        );

        const res2 = await axios.patch(
          import.meta.env.VITE_BACKEND_URL + "/profile/edit/dp",
          {
            displayPicture: res.data.secure_url,
          },
          {
            withCredentials: true,
          }
        );

        dispatch(addUserData(res2.data.data));
      } catch (error) {
        console.log(error);
      }
    }

    uploadImg();
  }, [uploadedImg, dispatch]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="flex flex-col items-center">
                  <img
                    onClick={() => {
                      document.getElementById("dp").click();
                    }}
                    src={
                      displayPicture ||
                      "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                    }
                    alt="Profile"
                    className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow cursor-pointer"
                  />

                  <p className="text-sm text-gray-500 mt-3">
                    Click image to change
                  </p>

                  <input
                    onChange={(e) => {
                      setUploadedImg(e.target.files[0]);
                    }}
                    id="dp"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {firstName} {lastName}
                  </h2>

                  <p className="text-gray-500 text-lg mt-1">@{username}</p>

                  <p className="text-gray-700 mt-4 leading-relaxed">
                    {bio || "No bio added yet."}
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <button
                    onClick={() => {
                      nav("/profile/edit");
                    }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
                  >
                    <i className="fa-regular fa-pen-to-square mr-2"></i>
                    Edit Profile
                  </button>
                  <button
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
                  >
                    <i className="fa-regular fa-pen-to-square mr-2"></i>
                    Create Post
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {followers.length}
                  </h2>
                  <p className="text-gray-500 mt-1">Followers</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {following.length}
                  </h2>
                  <p className="text-gray-500 mt-1">Following</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {posts.length}
                  </h2>
                  <p className="text-gray-500 mt-1">Posts</p>
                </div>
              </div>

              {/* Posts */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Posts
                </h2>

                {posts.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
                    <h1 className="text-gray-500 text-xl">No posts yet...</h1>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {posts.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-gray-800"
                        >
                          Item
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;