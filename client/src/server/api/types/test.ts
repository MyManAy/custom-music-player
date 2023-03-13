export type RouteHas =
  | {
      type: "header" | "query" | "cookie";
      key: string;
      value?: string;
    }
  | {
      type: "host";
      key?: undefined;
      value: string;
    };
export interface MiddlewareMatcher {
  regexp: string;
  locale?: false;
  has?: RouteHas[];
  missing?: RouteHas[];
}

interface _Function {
  /**
   * Returns the name of the function. Function names are read-only and can not be changed.
   */
  readonly name: string;
}

export interface Window {
  __BUILD_MANIFEST?: Record<string, string[]>;
  __BUILD_MANIFEST_CB?: _Function;
  __MIDDLEWARE_MATCHERS?: MiddlewareMatcher[];
  __MIDDLEWARE_MANIFEST_CB?: _Function;
}
