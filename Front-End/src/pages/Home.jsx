import WeatherForecast from "../components/WeatherForcast.jsx";
import AuthorizeView from "../components/AuthorizeView.jsx";
import LogoutLink from "../components/LogoutLink.jsx";

function Home() {
  return (
    <AuthorizeView>
      <LogoutLink />
      <WeatherForecast />
    </AuthorizeView>
  );
}

export default Home;
