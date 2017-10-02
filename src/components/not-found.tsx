import * as React from "react";
import { Link } from "react-router-dom";
import t from "news/services/i18n";

const NotFound : React.SFC = function() : JSX.Element {
  return (
    <section className="width-page padding-tb-2 margin-auto">
      <h3 className="fs-10 margin-bottom-1 block">{t("404_title")}</h3>
      <p>{t("404_text")} <Link to="/news/home">{t("404_link")}</Link></p>
    </section>
  );
};

export default NotFound;
