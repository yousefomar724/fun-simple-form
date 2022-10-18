import Head from "next/head"
import { useState } from "react"

export default function Home() {
  const [formErrors, setFormErrors] = useState({})
  const [isSubmited, setIsSubmited] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [run, setRun] = useState(true)
  const [isLeft, setIsLeft] = useState(true)

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  const emailRegex = /^\S+@\S+\.\S+$/

  const onChange = (name, value, regex, setState) => {
    if (!value) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: `${name} is required`,
      }))
    } else if (!regex.test(value)) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: `${name} is invalid`,
      }))
    } else {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
    setState(value)
  }

  const onMouseEnter = () => {
    if (formErrors?.email === "" && formErrors?.password === "") {
      setRun(false)
    } else {
      setRun(true)
      setIsLeft(!isLeft)
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setIsSubmited(true)
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center text-center h-screen">
      <Head>
        <title>Create Next App</title>
      </Head>
      <form
        className="flex flex-col gap-4 items-center justify-center"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Ex: Example@example.com"
            className={`border-2 ${
              formErrors?.email ? "border-red-600" : "border-green-500"
            } p-2 outline-none`}
            onChange={(e) =>
              onChange("email", e.target.value, emailRegex, setEmail)
            }
            value={email}
          />
          {formErrors?.email && (
            <small className="text-xs text-red-600">{formErrors.email}</small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            className={`border-2 ${
              formErrors?.password ? "border-red-600" : "border-green-500"
            } p-2 outline-none`}
            onChange={(e) =>
              onChange("password", e.target.value, passwordRegex, setPassword)
            }
            value={password}
          />
          {formErrors?.password && (
            <small className="text-xs text-red-600">
              {formErrors.password}
            </small>
          )}
        </div>
        <button
          className={`${
            formErrors?.email === "" && formErrors?.password === ""
              ? "bg-green-500 text-gray-800"
              : "bg-red-600 text-white"
          } px-5 py-2 rounded-xl ${
            run
              ? isLeft
                ? "self-end"
                : "self-start"
              : isLeft
              ? "self-end"
              : "self-start"
          }`}
          onMouseEnter={onMouseEnter}
        >
          Submit
        </button>
      </form>

      {isSubmited && formErrors?.email === "" && formErrors?.password === "" && (
        <div>
          <h1 className="text-2xl">{email}</h1>
          <h1 className="text-2xl">{password}</h1>
        </div>
      )}
    </div>
  )
}
