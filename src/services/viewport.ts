import uuid from "news/services/uuid";

export type ViewportListenerId = string;

export enum EVENT_TYPES {
  SCROLL = "scroll"
}

export type ViewportEventListener<T> = (e : T) => void;

interface ViewportListener {
  id : ViewportListenerId;
  event_type : string;
  handler : ViewportEventListener<any>;
  context? : any;
}

interface Position {
  x : number;
  y : number;
}

export type ScrollPositions = [Position, Position];

interface ScrollState {
  active : boolean;
  timeout? : number;
  positions : ScrollPositions;
}

class InternalState {
  listeners : Array<ViewportListener> = [];
  mounted : boolean = false;
  scrolling : ScrollState = { active: false, positions: [{x: 0, y: 0}, {x: 0, y: 0}] };
}

const state = new InternalState();

function scrollEnd() : void {
  state.scrolling.active = false;
}

function scrollStart() : void {
  if(!state.scrolling.active) {
    return;
  }

  const { listeners, scrolling } = state;
  const [ last ] = scrolling.positions;
  const current : Position = { x: window.scrollX, y: window.scrollY };

  for(let i = 0, c = listeners.length; i < c; i++) {
    const listener = listeners[i];

    if(listener.event_type !== EVENT_TYPES.SCROLL) {
      continue;
    }

    const { handler, context } = listener;

    handler.call(context, [current, last]);
  }

  scrolling.positions = [current, last];

  requestAnimationFrame(scrollStart);
}

const doc_events : { [key : string] : EventListener } = {
  scroll() : void {
    if(!state.scrolling.active) {
      state.scrolling.active = true;
      scrollStart();
    }

    clearTimeout(state.scrolling.timeout);
    state.scrolling.timeout = setTimeout(scrollEnd, 10);
  }
};

export default {

  get height() : number {
    return window.outerHeight;
  },

  on<T>(event_type : string, handler : ViewportEventListener<T>, context? : any ) : ViewportListenerId {
    const id = uuid();
    state.listeners.push({ event_type, id, handler, context });

    return id;
  },

  off(targetId : ViewportListenerId) : boolean {
    const { listeners } = state;
    const { length } = listeners;
    const newList : Array<ViewportListener> = [];

    for(let i = 0; i < length; i++) {
      const listener = listeners[i];

      if(listener.id === targetId) {
        continue;
      }

      newList.push(listener);
    }

    listeners.splice(0, length, ...newList);

    return newList.length !== length;
  },

  unmount() : void {
    if(state.mounted !== true) {
      return;
    }

    state.listeners.length = 0;

    for(const key in doc_events) {
      const handler = doc_events[key];
      window.removeEventListener(key, handler);
    }

    state.mounted = false;
  },

  mount() : void {
    if(state.mounted === true) {
      return;
    }

    for(const key in doc_events) {
      const handler = doc_events[key];
      window.addEventListener(key, handler);
    }

    state.mounted = true;
  }

};
