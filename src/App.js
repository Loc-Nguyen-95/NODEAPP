import './App.css';

import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: "onBlur"
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label htmlFor="firstName">First Name</label>
          <input 
            placeholder="Type your first name"
            {...register("firstName", {required: true, maxLength: 2})}
          />
          {errors.firstName && <p>This is required !</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
          placeholder="Type your last name"
          {...register("lastName", {required: true})}
           />
           {errors.lastName && <p>This is required !</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input 
          placeholder="Type your email"
          {...register("email", {required: true})}
           />
          {errors.email && <p>This is required !!!!!!!</p>}

        </div>

        <input type="submit" />

      </form>
    </div>
  );
}

export default App;
