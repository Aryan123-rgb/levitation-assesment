import { useSelector } from "react-redux";
import BasicDetails from "../components/BasicDetails";
import DropZone from "../components/DropZone";
import SubmittedForm from "../components/SubmittedForm";
import UserChoices from "../components/UserChoices";
import { selectedActiveSection } from "../redux/selectors";

function FormPage() {
  const activeSection = useSelector(selectedActiveSection);
  return (
    <>
      <div className="min-h-screen py-[10rem] bg-gradient-to-b from-purple-400 to-pink-300">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="flex flex-col w-[100%]">
              <div
                className={`${
                  activeSection === "BasicDetails" ? "w-[25%]" : ""
                } ${activeSection === "DropZone" ? "w-[55%]" : ""} ${
                  activeSection === "UserChoices" ? "w-[100%]" : ""
                } ${
                  activeSection === "SubmittedForm" ? "w-[110%]" : ""
                } px-2 py-2 bg-blue-700 text-white flex justify-between `}
              >
                {activeSection === "BasicDetails" && <p>Enter Personal Info</p>}
                {activeSection === "DropZone" && (
                  <>
                    <p>Enter Personal Info</p>
                    <p>Upload max 3 Files</p>
                  </>
                )}
                {activeSection === "UserChoices" && (
                  <>
                    <p>Enter Personal Info</p>
                    <p>Upload max 3 Files</p>
                    <p>Choose at least 3</p>
                  </>
                )}
              </div>
              <div className="w-full py-12 px-12">
                {activeSection === "BasicDetails" && <BasicDetails />}
                {activeSection === "DropZone" && <DropZone />}
                {activeSection === "UserChoices" && <UserChoices />}
                {activeSection === "SubmittedForm" && <SubmittedForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPage;
