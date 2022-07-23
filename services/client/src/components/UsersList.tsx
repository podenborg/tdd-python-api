import { User } from "../types";

interface UsersListProps {
  users: User[];
}

export function UsersList({ users }: UsersListProps) {
  return (
    <div>
      {users.map((user) => {
        return (
          <p key={user.id} className="box title is-4 username">
            {user.username}
          </p>
        );
      })}
    </div>
  );
}
