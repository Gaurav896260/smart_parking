import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";
import Loader from "../../component/Loader"; // Import your Loader component
import "../Auth/style/styleProfile.css"; // Import CSS file for profile page styling

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null); // State for profile image

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const formData = new FormData();
        formData.append("_id", userInfo._id);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        if (profileImage) {
          formData.append("profileImage", profileImage);
        }

        const res = await updateProfile(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2 className="profile-heading">Update Profile</h2>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-input"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-update">
              Update
            </button>
            {loadingUpdateProfile && <Loader />}
          </div>
        </form>
      </div>
      <div className="profile-preview">
        <h2 className="profile-heading">Preview</h2>
        <div className="profile-preview-image">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile Preview"
            />
          ) : (
            <img
              src={userInfo.profileImage || "/default-profile-image.jpg"}
              alt="Profile Preview"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
