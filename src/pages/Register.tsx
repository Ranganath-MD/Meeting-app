import React, { useState, Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { EuiFieldText, EuiButton, EuiText, EuiCallOut } from "@elastic/eui";
import { ErrorMessage } from "components/ErrorMessage";
import { RouteComponentProps, useLocation } from "@reach/router";
import { useAuth } from "context";

export const Register: React.FC<RouteComponentProps> = () => {
  const { register, navigateToDashBoard } = useAuth();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await register(data);
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      setError(error?.message);
      setTimeout(() => setError(""), 4000);
    }
  };


  const {pathname} = useLocation();

  useEffect(() => {
    navigateToDashBoard(pathname);
  }, [pathname, navigateToDashBoard]);

  return (
    <Fragment>
      <div style={style.container}>
        <EuiText textAlign="center">
          <h1>Register</h1>
        </EuiText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "This field is required", maxLength: 64 }}
            render={({ field: { onChange, value } }) => (
              <>
                <EuiFieldText
                  placeholder="Enter Name"
                  value={value}
                  onChange={onChange}
                  aria-label="name"
                  isInvalid={!!errors.name?.message}
                />
                <ErrorMessage message={errors.name?.message} />
              </>
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <EuiFieldText
                  placeholder="Enter Email"
                  value={value}
                  onChange={onChange}
                  aria-label="email"
                  isInvalid={!!errors.email?.message}
                />
                <ErrorMessage message={errors.email?.message} />
              </>
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is Required",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i,
                message:
                  "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, and one special character",
              },
            }}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <>
                <EuiFieldText
                  type="password"
                  placeholder="Enter password"
                  value={value}
                  onChange={onChange}
                  aria-label="password"
                  isInvalid={!!errors.password?.message}
                />
                {!!errors.password?.message && (
                  <ErrorMessage message={errors.password?.message} />
                )}
              </>
            )}
          />
          <EuiButton
            type="submit"
            color="primary"
            fullWidth
            isLoading={loading}
            style={style.btn}>
            Register
          </EuiButton>
        </form>

        {error && (
          <EuiCallOut
            title={ error ? error : "Sorry, there was an error" }
            color="danger"
            size="s"
            iconType="alert"
            style={style.callout}
          />
        )}
      </div>
    </Fragment>
  );
};

const style = {
  container: {
    width: 300,
    margin: "0 auto",
  },
  btn: {
    marginTop: "2rem",
  },
  callout: {
    width: 300,
    marginTop: "2rem",
  }
}
