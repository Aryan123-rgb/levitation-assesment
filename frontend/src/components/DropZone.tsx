import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { uploadFiles } from "../redux/dropZoneSlice";
import { setCurrentSection } from "../redux/activeSection";

interface CustomFile extends File {
  preview?: string;
  path?: string;
}

const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="20"
    height="20"
    viewBox="0 0 50 50"
  >
    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
  </svg>
);

function DropZone() {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [fetchingLocation, setFetchingLocation] = useState<boolean>(true);
  const [linkArray, setLinkArray] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("Fetching user location...");

  const fetchUserLocation = async () => {
    const IPResponse = await fetch("https://api.ipify.org?format=json");
    const IPdata = await IPResponse.json();
    const locationResponse = await fetch(
      `https://ipinfo.io/${IPdata?.ip}?token=4cd5eb08effaf4`
    );
    const locationData = await locationResponse.json();
    setTimeout(() => {
      setMessage(
        `Your country is ${locationData?.city} and your city is ${locationData?.country}`
      );
      setFetchingLocation(false);
    });
  };

  useEffect(()=>{
    fetchUserLocation();
  },[]);

  const onDrop = useCallback((acceptedFiles: CustomFile[]) => {
    if (acceptedFiles?.length > 0) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "application/pdf": [],
    },
    maxFiles: 3,
  });

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setCurrentSection("UserChoices"));

    if (!files?.length) return;

    const uploadURL = "https://api.cloudinary.com/v1_1/dgc95jwgz/image/upload";
    const apiKey = "678795439385584";
    const uploadPreset = "friendsbook";

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("api_key", apiKey);

      const response = await fetch(uploadURL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data?.secure_url);
      linkArray.unshift(data.secure_url);
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      console.log(linkArray);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
    dispatch(uploadFiles(linkArray));
  };

  const goBack = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setCurrentSection("BasicDetails"));
  };

  const handleCancel = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to cancel? All progress will be lost."
    );
    if (confirmed) {
      setFiles([]);
      setLinkArray([]);
      setMessage("Fetching user location...");
    }
  };
  

  return (
    <>
      <div className="mb-4 flex items-center">
        {fetchingLocation ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-purple-500 border-b-2 border-r-2"></div>
            <p className="text-gray-500">{message}</p>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-green-500 ml-2">{message}</p>
          </div>
        )}
      </div>
      <div {...getRootProps({ className: "cursor-pointer mt-10" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-2xl font-bold">Drop the files here ...</p>
        ) : (
          <p className="text-2xl font-bold">
            Drag 'n' drop some files here, or click to select files (only pdf
            and png)
          </p>
        )}
      </div>
      <div className={`mt-8 ${files.length > 0 ? "" : "hidden"}`}>
        <h3 className="text-lg font-semibold mb-4">Accepted Files</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
          {files.map((file) => (
            <div
              key={file.name}
              className={`bg-white rounded-lg p-4 shadow-md relative`}
            >
              <button
                className="absolute top-2 right-2 p-1 rounded-full bg-red-400 hover:bg-transparent transition duration-300"
                onClick={() => removeFile(file.name)}
              >
                {CloseIcon}
              </button>
              <div className="mb-2">
                <img
                  src={file.preview}
                  alt=""
                  width={150}
                  height={150}
                  className={`mb-2 ${
                    file.type === "image/png" ? "block" : "hidden"
                  }`}
                />
                <p className="text-sm truncate">{file.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-between">
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
          Next
        </button>
      </div>
    </>
  );
}

export default DropZone;
