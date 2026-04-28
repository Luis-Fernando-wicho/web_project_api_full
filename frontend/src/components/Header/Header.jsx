import logo from "../../assets/Vector.svg";
function Header() {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="around" />
        <div className="header__line"></div>
      </header>
    </>
  );
}
export default Header;
