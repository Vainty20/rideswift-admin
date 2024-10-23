import { Link } from "react-router-dom";
import { Button } from "react-daisyui";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold tracking-light text-primary">404</h1>
        <p className="text-3xl mt-4 font-semibold text-secondary">
          Oops! The page you&apos;e looking for doesn&apos;t exist.
        </p>
        <p className="mt-2 text-lg text-secondary">
          It looks like you took a wrong turn, but don&apos;t worry, you can get
          back on track.
        </p>
        <Link to="/">
          <Button color="primary" className="mt-6 text-white">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
