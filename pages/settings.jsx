import axios from "axios";
import { useEffect, useState } from "react";
import uploadFile from "./utils/mediaUpload";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null) {
      axios
        .get(import.meta.env.VITE_API_URL + "/users/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response.data);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setExistingImageUrl(response.data.image);
        })
        .catch(() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        });
    } else {
      window.location.href = "/login";
    }
  }, []);

  async function updateProfile() {
    const token = localStorage.getItem("token");

    const updatedInfo = {
      firstName: firstName,
      lastname: lastName,
      image: existingImageUrl,
    };
    if (file != null) {
      updatedInfo.image = await uploadFile(file);
    }
    const response = await axios.put(
      import.meta.env.VITE_API_URL + "/users/",
      updatedInfo,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    localStorage.setItem("token", response.data.token);

    toast.success("Profile updated successfully");
    window.location.reload();
  }

  async function changePassword(params) {
    if (password != confirmPassword) {
      toast.error("passwords do not match");
      return;
    }
    const token = localStorage.getItem("token");
    await axios.post(
      import.meta.env.VITE_API_URL + "/users/update-password",
      {
        password: password,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    toast.success("Password changed successfully");
    window.location.reload();
  }

  return (
    <div className="w-full min-h-[calc(100vh-50px)] flex flex-col md:flex-row justify-center items-start md:items-center gap-6 bg-gray-50 px-4 py-6 md:py-0">
      {/* Account Settings Card */}
      <div className="w-full md:w-[400px] rounded-2xl bg-white shadow-lg p-6 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-accent text-center">
          Account Settings
        </h1>
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent shadow-md">
          <img
            src={existingImageUrl || "images/default-profile.png"}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <input
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          className="w-full h-12 px-4 border border-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition"
          placeholder="First Name"
        />

        <input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          className="w-full h-12 px-4 border border-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition"
          placeholder="Last Name"
        />

        <div className="w-full flex flex-col sm:flex-row items-center border border-secondary rounded-xl overflow-hidden">
          {/* Custom Browse Button */}
          <label className="bg-accent text-white px-4 py-2 cursor-pointer hover:opacity-90 transition whitespace-nowrap">
            Browse...
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>

          {/* File Name Display */}
          <span className="px-4 py-2 text-gray-600 truncate text-center sm:text-left w-full sm:w-auto">
            {file ? file.name : "No file selected."}
          </span>
        </div>

        <button
          className="w-full h-12 bg-accent text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition mt-2"
          onClick={updateProfile}
        >
          Update Profile
        </button>
      </div>

      {/* Change Password Card */}
      <div className="w-full md:w-[400px] rounded-2xl bg-white shadow-lg p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-accent text-center">
          Change Password
        </h1>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full h-12 px-4 border border-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition"
          placeholder="Enter new password"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="w-full h-12 px-4 border border-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition"
          placeholder="Confirm new password"
        />

        <button
          className="w-full h-12 bg-accent text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition mt-2"
          onClick={changePassword}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}