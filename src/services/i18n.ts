import axios from "axios";
import config from "news/config/i18n";

type Cache = {
  active : string;
  [key : string] : any;
};

const cache : Cache = { active: "" };

export class MissingDefinitionsError extends Error {
}

export async function load(locale : string) : Promise<boolean> {
  const definition_url = `${config.definition_url}/${locale}.json`;
  const r = await axios.get(definition_url);

  if (r.status !== 200 || typeof(r.data) !== "object") {
    throw new MissingDefinitionsError();
  }

  cache[locale] = r.data;
  cache.active = locale;

  return true;
}

function translate(lookup : string) : string {
  const parts = lookup.split(".");
  let d = cache[cache.active];

  while(parts.length) {
    const step = parts.shift();

    if (false === d.hasOwnProperty(step)) {
      return lookup;
    }

    d = d[step];
  }

  return d;
}

export default translate;
