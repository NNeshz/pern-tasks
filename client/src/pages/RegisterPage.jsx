import { Card, Button, Input } from "../components/ui";
import { useForm } from "react-hook-form";
import axios from 'axios'

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit( async (data) => {
    const response = await axios.post("http://localhost:3000/api/signup", data, {
      withCredentials: true
    })
    console.log(response)
  });

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <Card>
        <h3 className="text-2xl font-bold">Register Page</h3>

        <form onSubmit={onSubmit}>
          <Input
            placeholder="Enter your fullname"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
          <Input
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && <p className="text-red-500">Name is required</p>}
          <Input
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && <p className="text-red-500">Name is required</p>}

          <Button>Register</Button>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
