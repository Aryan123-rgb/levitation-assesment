import { Link, useNavigate } from "react-router-dom";
import Images from "../../public/Register-Background.png";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message,setMessage] = useState<string>("Welcome back, you've been missed");
  const [error,setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response?.ok) {
        setError(false)
        setMessage("Welcome back, you've been missed")
        const data = await response.json();
        console.log(data);
        navigate(`/form/${data._id}`)
      }
      else {
        setMessage('Invalid email or password');
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div
        className="min-h-screen py-52"
        style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full lg:w-1/2 hidden lg:block p-12 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(${Images})`,
              }}
            ></div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Hello Again!</h2>
              <p className={`mb-4 ${error ? 'text-red-600' : ''}`}> {message} </p>
              <form>
                <div className="mt-5">
                  <input
                    type="text"
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
                      Don't have an account?{" "}
                      <Link to={"/"}>
                        {" "}
                        <span className="text-purple-500 font-semibold">
                          Sign Up
                        </span>
                      </Link>
                    </span>
                  </label>
                </div>
                <div className="mt-5">
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-purple-500 py-3 text-center text-white"
                    >
                      Login
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

export default Login;
