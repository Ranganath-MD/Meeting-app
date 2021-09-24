import { Layout } from "components/layout";
import { Login, Register, Meetings, Calendar, Teams } from "pages";
import { Router } from "@reach/router";
import { Provider } from "context";

const App = () => {
  return (
    <Provider>
      <Layout>
        <Router>
          <Register path="/" />
          <Login path="/login" />
          <Meetings path="/meetings" />
          <Calendar path="/calendar" />
          <Teams path="/teams" />
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
