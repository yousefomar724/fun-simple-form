import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [formErrors, setFormErrors] = useState();
  const [isSubmited, setIsSubmited] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  const emailOnchange = (event) => {
    const userEmail = event.target.value;
    if (!userEmail) {
      setFormErrors((prev) => ({ ...prev, email: 'Email is required' }));
    }
    if (!emailRegex.test(userEmail)) {
      setFormErrors((prev) => ({ ...prev, email: 'Email is Invalid' }));
    } else {
      setFormErrors((prev) => ({ ...prev, email: '' }));
    }
    setEmail(userEmail);
  };
  const passwordOnchange = (event) => {
    const userPassword = event.target.value;
    if (!userPassword) {
      setFormErrors((prev) => ({ ...prev, password: 'Email is required' }));
    } else if (!passwordRegex.test(userPassword)) {
      setFormErrors((prev) => ({ ...prev, password: 'Email is Invalid' }));
    } else {
      setFormErrors((prev) => ({ ...prev, password: '' }));
    }
    setPassword(userPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmited(true);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Ex: Example@example.com"
            style={formErrors?.email ? { border: '2px solid red' } : {}}
            onChange={emailOnchange}
            value={email}
          />
          {formErrors?.email && (
            <small style={{ color: 'red' }}>{formErrors.email}</small>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            style={formErrors?.password ? { border: '2px solid red' } : {}}
            onChange={passwordOnchange}
            value={password}
          />
          {formErrors?.password && (
            <small style={{ color: 'red' }}>{formErrors.password}</small>
          )}
        </div>
        <button
          className="button left-right"
          id="submit"
          style={
            formErrors?.email === '' && formErrors?.password === ''
              ? { backgroundColor: 'lightblue', color: 'black' }
              : { backgroundColor: 'red', color: 'white', transition: '.5s' }
          }
          onMouseEnter={() =>
            !(formErrors?.email === '' && formErrors?.password === '')
              ? document.getElementById('submit').classList.toggle('left-right')
              : (document.getElementById('submit').style.alignSelf = 'center')
          }
        >
          Submit
        </button>
      </form>

      {isSubmited && (
        <div className="result">
          <h1>{email}</h1>
          <h1>{password}</h1>
        </div>
      )}
    </>
  );
}
