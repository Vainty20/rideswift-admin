import UserList from "../features/users/UserList";

export default function UsersPage() {
  return (
    <>
      <div>
        <h1>Users</h1>
        <p className="text-xl mb-4">Manage and view all of your users.</p>
      </div>
      <UserList />
    </>
  );
}
