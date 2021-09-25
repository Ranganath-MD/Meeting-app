import React, { useState, Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { EuiFieldText, EuiButton, EuiText, EuiCallOut } from "@elastic/eui";
import { ErrorMessage } from "components/ErrorMessage";
import { RouteComponentProps, useLocation } from "@reach/router";
import { useAuth } from "context";

export const Login: React.FC<RouteComponentProps> = () => {
  const [loading, setLoading] = useState(false)
  const { login, navigateToDashBoard } = useAuth();
  const [error, setError] = useState<string>("");

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();

  const {pathname} = useLocation();

  useEffect(() => {
    navigateToDashBoard(pathname);
  }, [pathname, navigateToDashBoard]);

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await login(data);
      setLoading(false)
    } catch (error: any) {
      setError(error?.message);
      setLoading(false)
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <Fragment>
      <div style={style.container}>
        <EuiText textAlign="center">
          <h1>Login</h1>
        </EuiText>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              minLength: {
                value: 6,
                message: "The password is of min 6 charaters",
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
            style={style.btn}
          >
            Login
          </EuiButton>
        </form>
        {error && (
          <EuiCallOut
            title={error ? error : "Sorry, there was an error"}
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
