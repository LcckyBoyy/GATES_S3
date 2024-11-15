import WeatherForecast from "../components/WeatherForcast.jsx";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView.jsx";
import LogoutLink from "../components/LogoutLink.jsx";

function Home() {
  return (
    <AuthorizeView>
      <LogoutLink />
      <AuthorizedUser value="email" />
      <WeatherForecast />
    </AuthorizeView>
  );
}

export default Home;
