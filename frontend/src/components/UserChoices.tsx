import { useState } from "react";
import { useDispatch } from "react-redux";
import { storeSelectedOptions } from "../redux/userChoiceSilce";
import { setCurrentSection } from "../redux/activeSection";
import { useSelector } from "react-redux";
import { selectUploadedFiles, selectUserDetails } from "../redux/selectors";
import { useParams } from "react-router-dom";

const UserChoices = () => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userDetails = useSelector(selectUserDetails);
  const uploadedFiles = useSelector(selectUploadedFiles);
  const {id} = useParams();
  const options = [
    "Search Engine Optimization (SEO)",
    "Social Media Marketing",
    "Content Marketing",
    "Email Marketing",
    "Pay-Per-Click Advertising (PPC)",
    "Web Analytics",
    "Photography",
    "Photo Editing",
    "Portrait Photography",
    "Landscape Photography",
    "Product Photography",
    "Interior Design",
    "Home Renovation",
    "Gardening Tips",
    "DIY Home Projects",
    "Smart Home Technology",
    "Artificial Intelligence (AI)",
    "Machine Learning",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Cybersecurity",
    "Data Science",
    "Virtual Reality (VR)",
    "Augmented Reality (AR)",
  ];
  

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = async(event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(storeSelectedOptions(selectedOptions));
    dispatch(setCurrentSection('SubmittedForm'));
    console.log('test');
    
    const formData = new FormData();
    formData.append("userDetails", JSON.stringify(userDetails));
    formData.append("selectedOptions", JSON.stringify(selectedOptions));
    formData.append("userId", id as string);
    formData.append("file", JSON.stringify(uploadedFiles));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/form/submit`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log("fetch failed");
      }
    } catch (error) {
      console.log(error);
    }

  }

  const goBack = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setCurrentSection('DropZone'))
  }

  const handleCancel = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to cancel? All progress will be lost."
    );
    if(confirmed){
      setSelectedOptions([]);
      setIsDropdownOpen(false);
    }
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h2 className="lg:text-xl font-semibold mb-4">
        {selectedOptions.length === 0
          ? "Select your choices :"
          : "Your Choices"}
      </h2>
      <div className="mt-4 mb-4">
        {selectedOptions.map((option) => (
          <button
            key={option}
            className="bg-blue-500 text-white rounded-full lg:px-2 lg:py-1 p-1 m-1"
            onClick={() => toggleOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="relative inline-block w-full">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-white border rounded-md lg:px-4 lg:py-2 p-1 text-gray-700 flex justify-between items-center"
        >
          <span className={`${"text-gray-500"}`}>Select Options</span>
          <svg
            className={`h-4 w-4 ${
              selectedOptions.length === 0 ? "text-gray-500" : "text-green-500"
            } transform transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
          <ul className="w-full mt-2 bg-white border rounded-md shadow-md">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => toggleOption(option)}
                className={`lg:px-4 lg:py-2 p-1 cursor-pointer ${
                  selectedOptions.includes(option) ? "bg-gray-100" : ""
                } hover:bg-gray-100`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-10 flex justify-between w-[100%]">
        <button
          className="p-3 lg:px-10 hover:opacity-80 lg:text-lg text-center text-white rounded-lg"
          style={{
            background: "#eb2f06",
          }}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="p-3 lg:px-10 hover:opacity-80 lg:text-lg text-center text-black rounded-lg"
          style={{
            background: "#dfe6e9",
          }}
          onClick={goBack}
        >
          Back
        </button>
        <button
          className="p-3 lg:px-10 lg:text-lg hover:opacity-80 text-center text-white rounded-lg"
          style={{
            background: "linear-gradient(to right,#dfa3ff,#b429ff)",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserChoices;
