import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../redux/userDetailsSlice";
import { setCurrentSection } from "../redux/activeSection";
import { useNavigate } from "react-router-dom";

interface UserDetails {
  firstname: string;
  lastname: string;
  phoneNumber: number;
  email: string;
  password: string;
  addressLine1: string;
  city1: string;
  state1: string;
  pincode1: number;
  addressLine2: string;
  city2: string;
  state2: string;
  pincode2: number;
}

function BasicDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstname: "",
    lastname: "",
    phoneNumber: 0,
    email: "",
    password: "",
    addressLine1: "",
    city1: "",
    state1: "",
    pincode1: 0,
    addressLine2: "",
    city2: "",
    state2: "",
    pincode2: 0,
  });

  const handleChange = (field: keyof UserDetails, value: string) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(updateUserDetails(userDetails));
    dispatch(setCurrentSection("DropZone"));
  };

  const handleReset = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to cancel? All progress will be lost."
    );
    if (confirmed) {
      setUserDetails({
        firstname: "",
        lastname: "",
        phoneNumber: 0,
        email: "",
        password: "",
        addressLine1: "",
        city1: "",
        state1: "",
        pincode1: 0,
        addressLine2: "",
        city2: "",
        state2: "",
        pincode2: 0,
      });
    }
  };

  const handleLogout = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to cancel? All progress will be lost."
    );
    if(confirmed){
      navigate('/');
    }
  }

  return (
    <form>
      <div className="grid grid-cols-3 gap-5">
        {/* Name, Middlename and Lastname */}
        <input
          type="text"
          placeholder="Firstname"
          className="border border-gray-400 py-1 px-2"
          value={userDetails.firstname}
          onChange={(e) => handleChange("firstname", e.target.value)}
        />
        <input
          type="text"
          placeholder="Lastname"
          className="border border-gray-400 py-1 px-2"
          value={userDetails.lastname}
          onChange={(e) => handleChange("lastname", e.target.value)}
        />
        <input
          type="number"
          placeholder="Phone-Number"
          className="border border-gray-400 py-1 px-2"
          value={userDetails.phoneNumber === 0 ? "" : userDetails.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />
      </div>
      {/* Email and Password inputs */}
      <div className="grid grid-cols-2 gap-5 mt-5">
        <input
          type="text"
          placeholder="Email"
          className="border border-gray-400 py-1 px-2 w-full"
          value={userDetails.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-400 py-1 px-2 w-full"
          value={userDetails.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </div>
      {/* Address Line 1 */}
      <h2 className="text-2xl font-semibold mt-6">Address Line 1</h2>
      <div className="mt-3">
        <input
          type="text"
          placeholder="Street Address"
          className="border border-gray-400 py-1 px-2 w-full"
          value={userDetails.addressLine1}
          onChange={(e) => handleChange("addressLine1", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 mt-3">
        <input
          type="text"
          placeholder="City"
          className="border border-gray-400 py-1 px-2"
          value={userDetails.city1}
          onChange={(e) => handleChange("city1", e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          className="border border-gray-400 py-1 px-2"
          value={userDetails.state1}
          onChange={(e) => handleChange("state1", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 mt-3">
        <input
          type="number"
          placeholder="Pincode"
          className="border border-gray-400 py-1 px-2"
          value={userDetails.pincode1 === 0 ? "" : userDetails.pincode1}
          onChange={(e) => handleChange("pincode1", e.target.value)}
        />
      </div>
      {/* Address Line 2 */}
      <h2 className="text-2xl font-semibold mt-6">Address Line 2</h2>
      <div className="mt-3">
        <input
          type="text"
          placeholder="Street Address"
          className="border border-gray-400 py-1 px-2 w-full"
          value={userDetails.addressLine2}
          onChange={(e) => handleChange("addressLine2", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 mt-3">
        <input
          type="text"
          placeholder="City"
          className="border border-gray-400 py-1 px-2"
          value={userDetails.city2}
          onChange={(e) => handleChange("city2", e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          className="border border-gray-400 py-1 px-2"
          value={userDetails.state2}
          onChange={(e) => handleChange("state2", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 mt-3">
        <input
          type="number"
          placeholder="Pincode"
          className="border border-gray-400 py-1 px-2"
          value={userDetails.pincode2 === 0 ? "" : userDetails.pincode2}
          onChange={(e) => handleChange("pincode2", e.target.value)}
        />
      </div>
      <div className="mt-5 flex justify-between">
        <button
          className="p-3 lg:px-10 hover:opacity-80 text-normal lg:text-lg text-center text-white rounded-lg"
          style={{
            background: "#eb2f06",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
        <button
          className="p-3 lg:px-10 hover:opacity-80 lg:text-lg text-center text-white rounded-lg"
          style={{
            background: "#eb2f06",
          }}
          onClick={handleReset}
        >
          Cancel
        </button>
        <button
          className="p-3 lg:px-10 lg:text-lg hover:opacity-80 text-center text-white rounded-lg"
          style={{
            background: "linear-gradient(to right,#dfa3ff,#b429ff)",
          }}
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default BasicDetails;
