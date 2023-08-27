import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentSection } from "../redux/activeSection";

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

interface FormData {
  _id: string;
  userDetails: UserDetails;
  createdAt: string; // Change ths type to match the actual data type
  updatedAt?: string; // Change ths type to match the actual data type
  Files: string[]; // An array of image links
  selectedOptions: string[];
}

function SubmittedForm() {
  const { id } = useParams<{ id?: string }>();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownOptions = ["3 Days Ago", "5 Days Ago", "7 Days Ago"];

  const [formDataList, setFormDataList] = useState<FormData[]>([]);
  const [selectedData, setSelectedData] = useState<FormData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();

  // GET ALL FORMS
  const getAllFormofUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/form/getData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: id }),
        }
      );
      const data = await response.json();
      console.log(data);
      setFormDataList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFormofUser();
  }, []);

  const openPopup = (data: FormData) => {
    setSelectedData(data);
    setIsPopupOpen(true);
    console.log(data);
  };

  const closePopup = () => {
    setSelectedData(null);
    setIsPopupOpen(false);
  };

  const goBack = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setCurrentSection('UserChoices'))
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Submitted Form</h2>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            Select Time
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg">
              <ul>
                {dropdownOptions.map((option, index) => (
                  <li
                    key={index}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Submitted Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Replace the following rows with actual data */}
          {formDataList.length > 0 &&
            formDataList.map((formData, index) => (
              <tr
                key={formData?._id}
                onClick={() => openPopup(formData)}
                className="cursor-pointer"
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">Submitted Form {index + 1}</td>
                <td className="border px-4 py-2">{formData.createdAt}</td>
              </tr>
            ))}
          {/* Add more rows as needed */}
        </tbody>
      </table>
      <button onClick={goBack} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Back
      </button>
      {isPopupOpen && selectedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-[100%] h-[100%]">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Information : {selectedData.userDetails.firstname}{" "}
              {selectedData.userDetails.lastname}
            </h3>
            <p className="text-xl">
              <span className="font-bold">Email</span>:{" "}
              {selectedData.userDetails.email}{" "}
            </p>
            <div className="my-4">
              <h4 className="font-semibold text-xl mb-3">Address</h4>
              <p>
                <span className="font-bold mr-1">Address</span>:{" "}
                {selectedData.userDetails.addressLine1}
              </p>
              <p>
                <span className="font-bold mr-1">City</span>:{" "}
                {selectedData.userDetails.city1}
              </p>
              <p>
                <span className="font-bold mr-1">State</span>:{" "}
                {selectedData.userDetails.state1}
              </p>
              <p>
                <span className="font-bold mr-1">Pincode</span>:{" "}
                {selectedData.userDetails.pincode1}
              </p>
            </div>
            <p>
              <span className="font-bold mr-1">Phone Number</span>:{" "}
              {selectedData.userDetails.phoneNumber}{" "}
            </p>
            <div className="mt-4 flex gap-7 flex-wrap">
              {selectedData.Files.map((file) => (
                <a href={file} target="_blank" className="w-[200] h-[200]"><img src={file} width={200} height={200}  alt="" /></a>
              ))}
            </div>
            <p className="mt-4">
              <span className="text-xl font-bold mb-3">Selected Options:</span>
              <div className="flex gap-4 mt-2">
                {selectedData.selectedOptions.map((option, index) => (
                  <p key={index}>{option}</p>
                ))}
              </div>{" "}
            </p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmittedForm;
