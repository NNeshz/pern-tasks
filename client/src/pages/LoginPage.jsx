import { Card, Input, Button, Label } from "../components/ui";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("http://localhost:3000/api/signin", data, {
      withCredentials: true,
    });
    console.log(res);
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
