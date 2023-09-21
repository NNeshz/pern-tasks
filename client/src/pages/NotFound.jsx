import { Link } from "react-router-dom";
import { Card } from "../components/ui";

function NotFound() {
  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <Card>
        <h1 className="text-3xl font-bold my-2 text-center">
          Oops! Something went wrong
        </h1>
        <h3>404</h3>

        <Link to="/">Go to Home</Link>
      </Card>
    </div>
  );
}

export default NotFound;
