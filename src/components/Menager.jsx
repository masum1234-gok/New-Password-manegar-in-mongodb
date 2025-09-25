import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
function Manager() {
  const passwordRef = useRef();
  const eyeIconRef = useRef();
  const btnTextRef = useRef();
  const [form, setForm] = useState({ side: "", username: "", password: "" });
  const [passwordsArray, setPasswordsArray] = useState([]);

  // Fetch passwords from backend
  const getPasswords = async () => {
    try {
      const res = await fetch("http://192.168.0.105:3000/");
      const data = await res.json();
      setPasswordsArray(data);
    } catch (err) {
      console.error("Error fetching passwords:", err);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // Toggle password visibility
  const togglePassword = () => {
    const input = passwordRef.current;
    const eyeIcon = eyeIconRef.current;
    if (input.type === "password") {
      input.type = "text";
      eyeIcon.src = "/icons/eye.png";
    } else {
      input.type = "password";
      eyeIcon.src = "/icons/eye-off.png";
    }
  };

  // Copy text to clipboard
  const copyText = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        toast(`${text} copied!`, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      });
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast(`${text} copied!`, { position: "top-right", autoClose: 3000 });
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save or update password
  const savePassword = async () => {
    if (!form.side || !form.username || !form.password) {
      toast.error("Please fill all the fields !!!");
      return;
    }

    try {
      if (form.id) {
        // Update existing: delete then add
        await fetch("http://192.168.0.105:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
        toast.success("Edit Successfully!");
      }
      // Add new password
      else {
        toast.success("Add Successfully!");
      }
      const newPassword = { ...form, id: uuidv4() };
      await fetch("http://192.168.0.105:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });

      // Update local state
      // toast.success('Added Successfully')
      setPasswordsArray((prev) => {
        if (form.id) {
          return prev.map((item) => (item.id === form.id ? newPassword : item));
        }
        return [...prev, newPassword];
      });

      btnTextRef.current.innerText = "Add Password";
      setForm({ side: "", username: "", password: "" });

      getPasswords();
    } catch (err) {
      console.error("Error saving/updating password:", err);
    }
  };

  // Delete password
  const deletePassword = async (id) => {
    const item = passwordsArray.find((item) => item.id === id);
    if (!item) return;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "btn btn-success bg-green-600 hover:bg-green-700 text-white outline-none font-medium py-2 px-4 rounded mx-2",
        cancelButton:
          "btn btn-danger bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded mx-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `Do you really want to delete ${item.side}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await fetch("http://192.168.0.105:3000/", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id }),
            });

            setPasswordsArray(passwordsArray.filter((item) => item.id !== id));

            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your password has been deleted.",
              icon: "success",
            });
          } catch (err) {
            console.error("Error deleting password:", err);
            swalWithBootstrapButtons.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your password is safe 👍",
            icon: "error",
          });
        }
      });
  };

  // Edit password
  const editPassword = (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // স্ক্রল হবে স্মুথলি
    });

    setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
    const item = passwordsArray.find((item) => item.id === id);
    setForm(item);
    btnTextRef.current.innerText = "Edit Password";
  };

  // const editPassword = (id) => {
  //   a.innerText = "Edit Password";
  //   setform({ ...passwordsArray.filter((item) => item.id === id)[0], id: id });
  //   setpasswordsArray(passwordsArray.filter((item) => item.id !== id));
  // };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-900 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto rounded-md p-4">
        <div className="select-none text-black flex flex-col items-center">
          <h1 className="text-4xl font-bold">
            <span className="text-green-500">&lt;</span>Pass
            <span className="text-green-500">OP&gt;</span>
          </h1>
          <p className="text-green-900 text-lg font-bold">
            Your Password Manager
          </p>

          <input
            value={form.side}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="border-green-700 border-2 border-opacity-50 rounded-full pl-4 w-full m-2.5 p-1.5 text-black focus:outline-none focus:border-opacity-100"
            type="text"
            name="side"
          />

          <div className="flex gap-2 min-w-full">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="border-green-700 border-2 border-opacity-50 rounded-full pl-4 p-1.5 w-full text-black focus:outline-none focus:border-opacity-100"
              type="text"
              name="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="border-green-700 border-2 border-opacity-50 rounded-full pl-4 p-1.5 w-full text-black focus:outline-none focus:border-opacity-100"
                type="password"
                name="password"
              />
              <span
                onClick={togglePassword}
                className="absolute right-0 mr-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <img
                  ref={eyeIconRef}
                  src="/icons/eye-off.png"
                  className="w-6 m-2"
                  alt="toggle"
                />
              </span>
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={savePassword}
              className="bg-green-500 border-green-700 border-2 hover:bg-green-600 transition-colors duration-300 text-[#121331] font-bold py-2 px-4 rounded-full flex items-center gap-2"
            >
              <span ref={btnTextRef}>Add Password</span>
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="loop-on-hover"
                delay="250"
                style={{ width: "25px", height: "25px" }}
              ></lord-icon>
            </button>
          </div>
        </div>

        <h2 className="font-bold text-xl mt-4">Your Passwords</h2>

        {passwordsArray.length === 0 ? (
          <div className="text-center text-gray-500">No Passwords Saved</div>
        ) : (
          <div className="overflow-y-auto mt-2">
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th>Side</th>
                  <th className="border-l border-gray-500">Username</th>
                  <th className="border-l border-gray-500">Password</th>
                  <th className="border-l border-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200">
                {passwordsArray.map((item, index) => (
                  <tr
                    className="overflow-hidden rounded-md bg-green-400 even:bg-green-200"
                    key={item.id}
                  >
                    <td className="py-1 p-5">
                      <div className="flex justify-between">
                        <span>
                          <span className="pr-1.5">{index + 1}.</span>
                          <a
                            href={
                              item.side.startsWith("http")
                                ? item.side
                                : `https://${item.side}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.side}
                          </a>
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => copyText(item.side)}
                        >
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="click"
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td className="py-1 p-5 border-l border-gray-500">
                      <div className="flex justify-between">
                        <span>{item.username}</span>
                        <span
                          className="cursor-pointer"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="click"
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td className="py-1 p-5 border-l border-gray-500">
                      <div className="flex justify-between">
                        <span>{"•".repeat(item.password.length)}</span>
                        <span
                          className="cursor-pointer"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="click"
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td className="py-1 p-5 border-l border-gray-500">
                      <div className="flex gap-2 justify-end">
                        <div
                          onClick={() =>
                            copyText(
                              `${item.side}\n${item.username}\n${item.password}`
                            )
                          }
                        >
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="click"
                          ></lord-icon>
                        </div>
                        <div onClick={() => editPassword(item.id)}>
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="click"
                          ></lord-icon>
                        </div>
                        <div onClick={() => deletePassword(item.id)}>
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="click"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Manager;
