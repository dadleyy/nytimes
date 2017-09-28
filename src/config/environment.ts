export interface NYTimesConfig {
  key? : string;
  apis? : { [key : string] : string };
}

export interface EnvironmentConfig {
  times : NYTimesConfig;
  placeholder_image_url : string;
}

let cache : EnvironmentConfig | null = null;

function reload() : EnvironmentConfig {
  const meta = document.getElementsByTagName("meta");
  cache = null;

  for (let i = 0, c = meta.length; i < c; i++) {
    const m = meta[i];

    if (m && m.name !== "config/environment") {
      continue;
    }

    try {
      const decoded = atob(m.content);
      cache = JSON.parse(decoded);

      return cache;
    } catch (e) {
      m.setAttribute("data-errors", e);
    }
  }

  return null;
}

export default {

  get placeholder_image_url() : string {
    if(cache) {
      return cache.placeholder_image_url;
    }

    return reload() ? cache.placeholder_image_url : null;
  },

  get times() : NYTimesConfig | null {
    if(cache) {
      return cache.times;
    }

    return reload() ? cache.times : { key: null };
  },

};
