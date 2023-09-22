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
  const { signup, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if (user) {
      navigate("/profile");
    }
  });

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <Card>
        {RegisterErrors &&
          RegisterErrors.map((err, i) => (
            <p
              className="bg-red-500 text-white px-3 py-2 text-center rounded-sm"
              key={i}
            >
              {err}
            </p>
          ))}
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
          {errors.email && <p className="text-red-500">Email is required</p>}
          <Label htmlFor="password">Password:</Label>
          <Input
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && <p className="text-red-500">Password is required</p>}

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
