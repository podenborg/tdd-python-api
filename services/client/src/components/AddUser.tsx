import React from "react";

interface AddUserProps {
  username: string;
  email: string;
  addUser: (event: React.FormEvent) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AddUser({
  username,
  email,
  addUser,
  handleChange,
}: AddUserProps) {
  return (
    <form onSubmit={(event) => addUser(event)}>
      <div className="field">
        <label htmlFor="input-username" className="label is-large">
          Username
        </label>
        <input
          required
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          id="input-username"
          className="input is-large"
          placeholder="Enter a username"
        />
      </div>
      <div className="field">
        <label htmlFor="input-email" className="label is-large">
          Email
        </label>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          id="input-email"
          className="input is-large"
          placeholder="Enter an email address"
        />
      </div>
      <input
        type="submit"
        value="Submit"
        className="button is-primary is-large is-fullwidth"
      />
    </form>
  );
}
