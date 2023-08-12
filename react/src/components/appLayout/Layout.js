import HeaderBar from "./HeaderBar";
import Footer from "./Footer";
import Routing from "./Routing";

function Layout() {

  return (
    <div className="layout-main">
      <HeaderBar />
      <Routing />
    </div>
  )
}

export default Layout;