import { User } from "../types";

interface UsersListProps {
  users: User[];
  removeUser: (userId: number) => void;
  isAuthenticated: () => boolean;
}

export function UsersList({
  users,
  removeUser,
  isAuthenticated,
}: UsersListProps) {
  return (
    <div>
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            {isAuthenticated() && <th />}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td className="username">{user.username}</td>
                {isAuthenticated() && (
                  <td>
                    <button
                      className="button is-danger is-small"
                      onClick={() => removeUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
