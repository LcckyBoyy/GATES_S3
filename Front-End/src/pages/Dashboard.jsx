import AuthorizeView from "../components/AuthorizeView.jsx";
import Tes from "../components/Tes.jsx";

function Dashboard() {
  return (
    <AuthorizeView>
      <Tes />
    </AuthorizeView>
  );
}

export default Dashboard;
