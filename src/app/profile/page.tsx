"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import { updateProfile } from "@/apis/userApi";

export default function ProfilePage() {
  const { user, isLoggedIn, logout, updateUser } = useUserStore();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    address: "",
    pincode: "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        city: user.city || "",
        state: user.state || "",
        address: user.address || "",
        pincode: user.pincode || "",
      });
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || !user) {
    return null; // or a loading spinner
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    
    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        formPayload.append(key, formData[key as keyof typeof formData]);
      });
      // Assuming no profile photo upload for now, can be added later

      const res = await updateProfile(formPayload);
      if (res.success) {
        updateUser(res.data);
        setSuccessMsg("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-brand px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">My Profile</h2>
          <button
            onClick={handleLogout}
            className="bg-white/20 text-white hover:bg-white/30 px-4 py-1.5 rounded text-sm font-medium transition"
          >
            Logout
          </button>
        </div>

        <div className="p-6">
          {successMsg && (
            <div className="mb-4 bg-green-50 text-green-700 p-4 rounded-md text-sm border border-green-200">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mb-4 bg-red-50 text-red-700 p-4 rounded-md text-sm border border-red-200">
              {errorMsg}
            </div>
          )}

          <div className="flex items-center gap-6 mb-8 border-b pb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden shrink-0">
              {user.profilePhoto?.url ? (
                <Image src={user.profilePhoto.url} alt="Profile" width={96} height={96} className="w-full h-full object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold uppercase">
                  {user.name ? user.name[0] : "U"}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{user.name || "Add Your Name"}</h3>
              <p className="text-gray-500 font-medium">+91 {user.mobile}</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="ml-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand focus:border-brand disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setErrorMsg("");
                    setFormData({
                      name: user.name || "",
                      email: user.email || "",
                      city: user.city || "",
                      state: user.state || "",
                      address: user.address || "",
                      pincode: user.pincode || "",
                    });
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-brand text-white rounded-md hover:bg-brand/90 font-medium transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
