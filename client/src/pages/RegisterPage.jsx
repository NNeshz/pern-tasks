import { Card, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    await signup(data)
    navigate('/profile')
  });

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <Card>
        <h3 className="text-2xl font-bold">Register Page</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Name:</Label>
          <Input
            placeholder="Enter your fullname"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
          <Label htmlFor="email">Email:</Label>
          <Input
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && <p className="text-red-500">Name is required</p>}
          <Label htmlFor="password">Password:</Label>
          <Input
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && <p className="text-red-500">Name is required</p>}

          <Button>Register</Button>
          <div>
            <p>
              Already have an account? 
              <Link to="/login" className="font-bold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
