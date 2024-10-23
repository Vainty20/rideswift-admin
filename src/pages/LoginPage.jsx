import { Card } from "react-daisyui";
import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <Card className="bg-white w-full max-w-[400px]">
        <Card.Body>
          <Card.Title tag="h1" className="text-3xl text-primary font-semibold">RideSwift Admin</Card.Title>
          <p className="text-xl text-secondary">Login to continue</p>
          <LoginForm />
        </Card.Body>
      </Card>
    </div>
  );
}
