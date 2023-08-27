import { Link, useNavigate } from "react-router-dom";
import Images from "../../public/Register-Background.png";
import { useState } from "react";

function Signup() {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>(
    "Create your account. It's free and only takes a minute"
  );
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegisterUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
      if (response?.ok) {
        setError(false);
        setMessage("Create your account. It's free and only takes a minute");
        const data = await response.json();
        console.log(data);
        navigate(`/form/${data._id}`);
      } else {
        setMessage("Email already exists");
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
    resetFunction();
  };

  const resetFunction = (): void => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div
        className="min-h-screen py-40"
        style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full lg:w-1/2 p-12 bg-no-repeat bg-cover bg-center hidden lg:block"
              style={{
                backgroundImage: `url(${Images})`,
              }}
            ></div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Register</h2>
              <p className={`mb-4 ${error ? "text-red-600" : ""}`}>
                {message}
              </p>
              <form onSubmit={handleRegisterUser}>
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Firstname"
                    className="border border-gray-400 py-1 px-2"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Lastname"
                    className="border border-gray-400 py-1 px-2"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-400 py-1 px-2 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-400 py-1 px-2 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-5">
                  <label className="flex items-center">
                    <span>
                      Already have an account ?{" "}
                      <Link to={"/login"}>
                        {" "}
                        <span className="text-purple-500 font-semibold">
                          Login
                        </span>
                      </Link>
                    </span>
                  </label>
                </div>
                <div className="mt-5">
                  <button
                    onClick={handleRegisterUser}
                    className="w-full bg-purple-500 py-3 text-center text-white"
                  >
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
