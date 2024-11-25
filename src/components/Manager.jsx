import { useEffect, useRef, useState } from "react";

const Manager = () => {
  // const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let passwords = localStorage.getItem("password");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showpassword = () => {
    setShowPassword(!showPassword);
    passwordRef.current.type = showPassword ? "password" : "text";
  };

  const savepassword = (e) => {
    console.log(e);
    console.log(form);
    setpasswordArray([...passwordArray, form]);
    localStorage.setItem("password", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" });
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="mx-auto bg bg-slate-50 mycontainer ">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>
        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handlechange}
            placeholder="Enter Website url"
            className="rounded-full border  border-green-500 
        w-full p-4 py-1"
            type="text"
            name="site"
            id="1"
          />

          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handlechange}
              placeholder="Enter user name"
              className="rounded-full border  border-green-500 
        w-full p-4 py-1"
              type="text"
              name="username"
              id="2"
            />
            <div className="relative">
              <input
                value={form.password}
                ref={passwordRef}
                onChange={handlechange}
                placeholder="Enter password"
                className="rounded-full border  border-green-500 
              w-full p-4 py-1"
                type="password"
                name="password"
                id="3"
              />
              <span
                className="absolute right-1 top-1 cursor-pointer"
                onClick={showpassword}
              >
                {showPassword ? "hide" : "show"}
              </span>
            </div>
          </div>

          <button
            onClick={savepassword}
            className="flex justify-center items-center bg-green-600 hover:bg-green-500
          rounded-full px-4 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-2xl py-4 ">Your Password</h2>
          {passwordArray.length === 0 && <div>No password</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center w-32">
                        {" "}
                        <a href={item.site} target="_blank">
                          {" "}
                          {item.site}
                        </a>
                      </td>
                      <td className=" py-2 border border-white text-center w-32">
                        {item.username}
                      </td>
                      <td className=" py-2 border border-white text-center w-32">
                        {item.password}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
