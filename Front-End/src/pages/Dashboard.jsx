import AuthorizeView from "../components/AuthorizeView.jsx";
import MainPage from "../components/MainPage.jsx";

function Dashboard() {
  return (
    <AuthorizeView>
      <MainPage />
    </AuthorizeView>
  );
}

export default Dashboard;
