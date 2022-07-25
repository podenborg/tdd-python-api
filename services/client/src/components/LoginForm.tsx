import * as Yup from "yup";
import { Formik } from "formik";
import { LoginFormData } from "../types";

import "./form.css";
import { Navigate } from "react-router-dom";

interface LoginFormProps {
  isAuthenticated: () => boolean;
  handleLoginFormSubmit: (data: LoginFormData) => void;
}

export function LoginForm({
  isAuthenticated,
  handleLoginFormSubmit,
}: LoginFormProps) {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="">
      <h1 className="title is-1">Log In</h1>
      <hr />
      <br />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleLoginFormSubmit(values);
          resetForm();
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
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
                  errors.email && touched.email
                    ? "input error"
                    : "input is-large"
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
    </div>
  );
}
