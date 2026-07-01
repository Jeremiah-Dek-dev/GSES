import { useUserAuth } from "../../context/UserAuthContext";

function UserProfile() {
  const { user } = useUserAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <img src={user.picture} alt="User Profile Picture" />
    </div>
  );
}

export default UserProfile;
