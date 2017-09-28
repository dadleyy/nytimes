import axios from "axios";
import environment from "news/config/environment";
import { format as formatDate } from "news/services/date-utils";

const QUERY_DELIMETER = " AND ";

export interface SearchPagination {
  beginDate? : Date;
  endDate? : Date;
}

export enum SECTION {
  HOME = "Home",
  WORLD = "World",
  US = "U.S.",
  POLITICS = "Politics",
  NY = "New York"
}

const SECTION_FIELD_NAME = "news_desk";

export class ArticleSearchBlueprint {
  sections? : Array<SECTION> = [SECTION.HOME];

  constructor(sections? : Array<SECTION>) {
    this.sections = sections || [SECTION.HOME];
  }

  toString() : string {
    const queries = [];

    if(this.sections && this.sections.length) {
      queries.push(`${SECTION_FIELD_NAME}:(${this.sections.join(" ")})`);
    }

    return queries.join(QUERY_DELIMETER);
  }

}

export interface ArticleHeadline {
  main : string;
}

export interface ArticleResult {
  pub_date : string;
  headline : ArticleHeadline;
}

export interface TimesMeta {
  hits : Number;
  offset : Number;
  times : Number;
}

export interface TimesResponse {
  docs : Array<ArticleResult>;
  meta : TimesMeta;
}

export default {

  async search(blueprint : ArticleSearchBlueprint, paging? : SearchPagination) : Promise<TimesResponse> {
    const { times: timesConfig } = environment;

    const url = timesConfig.apis["search"];

    const params = new URLSearchParams();
    params.set("api-key", timesConfig.key);
    params.set("fq", blueprint.toString());

    if(paging && paging.endDate) {
      const formatted = formatDate(paging.endDate);
      params.set("end_date", formatted);
    }

    const { data } = await axios.get(`${url}?${params.toString()}`);

    return data.response;
  }

};
