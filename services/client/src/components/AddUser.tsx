import "./form.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { AddUserFormData } from "../types";

interface AddUserProps {
  addUser: (data: AddUserFormData) => void;
}

export function AddUser({ addUser }: AddUserProps) {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addUser(values);
        resetForm();
        setSubmitting(false);
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .required("Username is required.")
          .min(6, "Username must be greater than 5 characters."),
        email: Yup.string()
          .email("Enter a valid email.")
          .required("Email is required.")
          .min(6, "Email must be greater than 5 characters."),
        password: Yup.string()
          .required("Password is required.")
          .min(11, "Password must be greater than 10 characters."),
      })}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="input-username" className="label is-large">
              Username
            </label>
            <input
              required
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              id="input-username"
              className={
                errors.username && touched.username
                  ? "input error"
                  : "input is-large"
              }
              placeholder="Enter a username"
            />
            {errors.username && touched.username && (
              <div className="input-feedback">{errors.username}</div>
            )}
          </div>
          <div className="field">
            <label htmlFor="input-email" className="label is-large">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              id="input-email"
              className={
                errors.email && touched.email ? "input error" : "input is-large"
              }
              placeholder="Enter an email address"
            />
            {errors.email && touched.email && (
              <div className="input-feedback">{errors.email}</div>
            )}
          </div>
          <div className="field">
            <label htmlFor="input-password" className="label is-large">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              id="input-password"
              className={
                errors.password && touched.password
                  ? "input error"
                  : "input is-large"
              }
              placeholder="Enter a password"
            />
            {errors.password && touched.password && (
              <div className="input-feedback">{errors.password}</div>
            )}
          </div>
          <input
            type="submit"
            value="Submit"
            disabled={isSubmitting}
            className="button is-primary is-large is-fullwidth"
          />
        </form>
      )}
    </Formik>
  );
}
