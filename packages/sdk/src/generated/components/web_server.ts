// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { web_server_WebServer, web_server_base_WebServerBase } from "../markers";
export interface WebServerAuthProps {
    /** string: The username to use for authentication. */
    username: string;
    /** string: The password to check for authentication. */
    password: string;
}
export interface WebServerSortingGroupsProps {
    /** string: A string representing the group name which is displayed as the header of the group */
    name: string;
    /**
     * float: A float representing the weight of the group. A group with a smaller
     * @yamlKey sorting_weight
     */
    sortingWeight?: unknown;
}
export interface WebServerProps extends _CoreComponent {
    /** int: The port the web server should open its socket on. */
    port?: number;
    /** string: `1`, `2` or `3`. Version 1 displays as a table. Version 2 uses web components and has more functionality. Ver... */
    version?: "1" | "2" | "3";
    /**
     * url: The URL that should be used for the CSS stylesheet. Defaults to [https://oi.esphome.io/v1/webserver-v1.min.css](...
     * @yamlKey css_url
     */
    cssUrl?: string;
    /**
     * local file: Path to local file to be included in web server index page. Contents of this file will be served as `/0.c...
     * @yamlKey css_include
     */
    cssInclude?: unknown;
    /**
     * url: The URL that should be used for the JS script. Defaults to [https://oi.esphome.io/v1/webserver-v1.min.js](https:...
     * @yamlKey js_url
     */
    jsUrl?: string;
    /**
     * local file: Path to local file to be included in web server index page. Contents of this file will be served as `/0.j...
     * @yamlKey js_include
     */
    jsInclude?: unknown;
    /**
     * boolean: Enables support for [Private Network Access](https://wicg.github.io/private-network-access) and the [Private...
     * @yamlKey enable_private_network_access
     */
    enablePrivateNetworkAccess?: boolean;
    /** Enables a simple *Digest* authentication with username and password. */
    auth?: WebServerAuthProps;
    /** @yamlKey web_server_base_id */
    webServerBaseId?: RefProp<web_server_base_WebServerBase>;
    /**
     * boolean: Whether `internal` entities should be displayed on the web interface. Defaults to `false`.
     * @yamlKey include_internal
     */
    includeInternal?: boolean;
    /** boolean: Explicitly disable OTA updates through the web server interface. Only accepts `false`. This option is typica... */
    ota?: boolean;
    /** boolean: Turn on or off the log feature inside webserver. Defaults to `true`. */
    log?: boolean;
    /** boolean: Include supporting javascript locally allowing it to work without internet access. Defaults to `false`. */
    local?: boolean;
    /** string: The compression algorithm used for embedded web assets when `local` is enabled. Options are `gzip` or `br` (B... */
    compression?: "gzip" | "br";
    /**
     * list: Available only on `version: 3`. A list of group ID's and names to group the entities. See [Webserver Entity Gro...
     * @yamlKey sorting_groups
     */
    sortingGroups?: Array<WebServerSortingGroupsProps>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            web_server: WebServerProps & ComponentProps<web_server_WebServer>;
        }
    }
}
