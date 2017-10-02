import axios from "axios";
import environment from "news/config/environment";
import { format as formatDate } from "news/services/date-utils";

const QUERY_DELIMETER = " AND ";

export interface SearchPagination {
  begin_date? : Date;
  end_date? : Date;
}

export enum SECTION {
  AUTOMOBILES = "Automobiles",
  HOME = "Home",
  WORLD = "World",
  US = "U.S.",
  POLITICS = "Politics",
  NY = "New York"
}

const SECTION_FIELD_NAME = "news_desk";
const ID_FIELD_NAME = "_id";

export interface ArticleSearchBlueprintParams {
  sections? : Array<SECTION>;
  article_id? : string;
  query? : string;
}

export class ArticleSearchBlueprint {
  sections? : Array<SECTION>;
  article_id? : string;
  query? : string;

  constructor(opts? : ArticleSearchBlueprintParams) {
    if(opts && opts.sections) {
      this.sections = opts.sections;
    }

    if(opts && opts.article_id) {
      this.article_id = opts.article_id;
    }

    if(opts && opts.query) {
      this.query = opts.query;
    }
  }

  toString() : string {
    const queries = [];

    if(this.sections && this.sections.length) {
      queries.push(`${SECTION_FIELD_NAME}:(${this.sections.join(" ")})`);
    }

    if(this.article_id) {
      queries.push(`${ID_FIELD_NAME}:(${this.article_id})`);
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
  subtype : string;
}

export interface ArticleByline {
  original : string;
}

export interface ArticleResult {
  pub_date : string;
  headline : ArticleHeadline;
  multimedia : Array<MultiMediaObject>;
  new_desk : string;
  snippet : string;
  byline : ArticleByline;
  id : string;
}

export interface TimesMeta {
  hits? : Number;
  offset? : Number;
  times? : Number;
}

export interface TimesResponse {
  docs : Array<ArticleResult>;
  meta : TimesMeta;
}

export interface TimesJSONResponse {
  docs : Array<ArticleJSON>;
  meta : TimesMeta;
}

interface ArticleJSON {
  pub_date : string;
  headline : ArticleHeadline;
  multimedia : Array<MultiMediaObject>;
  snippet : string;
  new_desk : string;
  byline : ArticleByline;
  _id : string;
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

    if(blueprint.query) {
      params.set("q", blueprint.query);
    }

    if(paging && paging.end_date) {
      const formatted = formatDate(paging.end_date);
      params.set("end_date", formatted);
    }

    const { data } = await axios.get(`${url}?${params.toString()}`);
    const response : TimesJSONResponse = data.response;
    const result : TimesResponse = { docs: [], meta: {} };

    for(let i = 0, c = response.docs.length; i < c; i++) {
      const item = response.docs[i];
      const { _id, multimedia, ...rest } = item;
      const parsed_media = multimedia.map(normalizeMedia);
      const parsed_doc : ArticleResult = { ...rest, id: _id, multimedia: parsed_media };
      result.docs.push(parsed_doc);
    }

    return result;
  }

};
