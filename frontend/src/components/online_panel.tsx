import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import { UserOnline } from "@/lib/store";

interface OnlineUserProps {
  user: UserOnline;
}

const OnlineUser = ({ user }: OnlineUserProps) => {
  return <div>{user.username + (user.self ? " (yourself)" : "")}</div>;
};

const OnlinePanel = () => {
  const users = useSelector((state: RootState) => state.users);
  console.log("Online Panel users", users, typeof users);
  return (
    <div>
      <h1>Online Users</h1>
      {users.map((user) => (
        <OnlineUser key={user.id} user={user} />
      ))}
    </div>
  );
};

export default OnlinePanel;
