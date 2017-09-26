import { NavLink } from "react-router-dom";
import * as React from "react";
import t from "news/services/i18n";

const Header : React.SFC<any> = function(props) : JSX.Element {
  return (
    <section className="clearfix width-page margin-auto">
      <main className="padding-tb-3 bg-02 fg-01">
        <div className="title text-center">
          <h3 className="fg-01 fs-8 upper">
            {t("the_times")}
          </h3>
        </div>
      </main>
      <nav className="clearfix bg-01 flex shadow-1 flex-row flex-stretch-items">
        <NavLink to="/news/home" className="nav-link" activeClassName="active-nav">{t("nav.home")}</NavLink>
        <NavLink to="/news/world" className="nav-link" activeClassName="active-nav">{t("nav.world")}</NavLink>
        <NavLink to="/news/us" className="nav-link" activeClassName="active-nav">{t("nav.us")}</NavLink>
        <NavLink to="/news/politics" className="nav-link" activeClassName="active-nav">{t("nav.politics")}</NavLink>
        <NavLink to="/news/ny" className="nav-link" activeClassName="active-nav">{t("nav.ny")}</NavLink>
        <NavLink to="/news/more" className="nav-link" activeClassName="active-nav">{t("nav.more")}</NavLink>
      </nav>
    </section>
  );
};

export default Header;
