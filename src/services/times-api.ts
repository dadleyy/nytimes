import axios from "axios";
import environment from "news/config/environment";
import { format as formatDate } from "news/services/date-utils";

const QUERY_DELIMETER = " AND ";

export interface SearchPagination {
  begin_date? : Date;
  end_date? : Date;
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

export interface MultiMediaObject {
  url : string;
  type : string;
  subtype: string;
}

export interface ArticleByline {
  original : string;
}

export interface ArticleResult {
  pub_date : string;
  headline : ArticleHeadline;
  multimedia : Array<MultiMediaObject>;
  snippet : string;
  byline : ArticleByline;
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

export function normalizeMedia(item : MultiMediaObject) : MultiMediaObject {
  const { times: times_config } = environment;
  const normalized_url = `${times_config.apis["images"]}/${item.url}`;
  item.url = normalized_url;
  return item;
}

export default {

  async search(blueprint : ArticleSearchBlueprint, paging? : SearchPagination) : Promise<TimesResponse> {
    const { times: times_config } = environment;

    const url = times_config.apis["search"];

    const params = new URLSearchParams();
    params.set("api-key", times_config.key);
    params.set("fq", blueprint.toString());

    if(paging && paging.end_date) {
      const formatted = formatDate(paging.end_date);
      params.set("end_date", formatted);
    }

    const { data } = await axios.get(`${url}?${params.toString()}`);
    const response : TimesResponse = data.response;

    for(let i = 0, c = response.docs.length; i < c; i++) {
      const item = response.docs[i];
      const parsed_media = item.multimedia.map(normalizeMedia);
      item.multimedia = parsed_media;
    }

    return response;
  }

};
