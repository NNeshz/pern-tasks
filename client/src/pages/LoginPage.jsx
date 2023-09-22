import { Card, Input, Button, Label } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { signin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
    navigate("/profile");
  });

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <Card>
        <h1 className="text-2xl font-bold">Sin In Page</h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
          <Button>Sing In</Button>
          <div>
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
