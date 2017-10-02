import { NavLink } from "react-router-dom";
import * as React from "react";
import t from "news/services/i18n";
import Search from "news/components/header/search";

const Header : React.SFC<any> = function(props : any) : JSX.Element {

  return (
    <section className="clearfix width-page margin-auto">
      <main className="padding-tb-8 bg-02 fg-01 flex flex-row flex-center-items justify-space-between">
        <div className="title text-center flex-item-1" />
        <div className="title text-center flex-item-1">
          <h3 className="fg-01 fs-8 upper">
            {t("the_times")}
          </h3>
        </div>
        <div className="margin-left-auto margin-right-6 flex-item-1 clearfix">
          <div className="float-right fg-white">
            <Search />
          </div>
        </div>
      </main>
      <nav className="clearfix bg-01 flex shadow-1 flex-row flex-stretch-items">
        <NavLink to="/news/home" className="nav-link" activeClassName="active-nav">{t("nav.home")}</NavLink>
        <NavLink to="/news/world" className="nav-link" activeClassName="active-nav">{t("nav.world")}</NavLink>
        <NavLink to="/news/us" className="nav-link" activeClassName="active-nav">{t("nav.us")}</NavLink>
        <NavLink to="/news/politics" className="nav-link" activeClassName="active-nav">{t("nav.politics")}</NavLink>
        <NavLink to="/news/ny" className="nav-link" activeClassName="active-nav">{t("nav.ny")}</NavLink>
        <NavLink to="/categories" className="nav-link" activeClassName="active-nav">{t("nav.more")}</NavLink>
      </nav>
    </section>
  );
};

export default Header;
