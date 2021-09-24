interface ILoginResponse {
  message: string;
  token: string;
  email: string;
  name: string;
}

type User = {
  name?: string;
  email?: string;
}
interface ILogin {
  email: string;
  password: string;
}

interface IRegister extends ILogin {
  name: string;
}
