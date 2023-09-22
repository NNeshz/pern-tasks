import { Card, Label } from "../components/ui";
import { useAuth } from "../context/authContext";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <Card>
        <Label>Name</Label>
        <p className="text-2xl font-bold">{user.name}</p>
        <Label>Email</Label>
        <p className="text-2xl font-bold">{user.email}</p>
        <Label>Your ID:</Label>
        <p className="text-2xl font-bold">{user.id}</p>
      </Card>
    </div>
  );
}

export default ProfilePage;
