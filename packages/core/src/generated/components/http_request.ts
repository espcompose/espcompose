// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_http_request_HttpRequestComponent } from "../markers";
export interface HttpRequestProps extends _CoreComponent {
    /**
     * integer: Change HTTP receive buffer size. Defaults to `512`.
     * @yamlKey buffer_size_rx
     */
    bufferSizeRx?: number;
    /**
     * integer: Change HTTP transmit buffer size. Defaults to `512`.
     * @yamlKey buffer_size_tx
     */
    bufferSizeTx?: number;
    /**
     * file path: Path to a CA certificate bundle. Not required on MacOS (the inbuilt CA bundle is used and SSL enabled by d...
     * @yamlKey ca_certificate_path
     */
    caCertificatePath?: string;
    /**
     * boolean: Determines whether to include HTTPS/SSL support in the firmware binary. Excluding the SSL libraries from you...
     * @yamlKey esp8266_disable_ssl_support
     */
    esp8266DisableSslSupport?: boolean;
    /**
     * boolean: Enable following HTTP redirects. Defaults to `true`.
     * @yamlKey follow_redirects
     */
    followRedirects?: boolean;
    /**
     * integer: Maximum amount of redirects to follow when enabled. Defaults to `3`.
     * @yamlKey redirect_limit
     */
    redirectLimit?: number;
    /** [Time](https://esphome.io/guides/configuration-types#time): Timeout for request. Defaults to `4.5s`. */
    timeout?: TimePeriod;
    /**
     * integer: Change TLS receive buffer size. Should be set to `16384` to fit the TLS record size of modern HTTP servers. ...
     * @yamlKey tls_buffer_size_rx
     */
    tlsBufferSizeRx?: number;
    /**
     * integer: Change TLS transmit buffer size. Defaults to `512`.
     * @yamlKey tls_buffer_size_tx
     */
    tlsBufferSizeTx?: number;
    /** string: User-Agent header for requests. Defaults to `ESPHome/<version> (https://esphome.io)` where `<version>` is the... */
    useragent?: string;
    /**
     * boolean: When set to `true` (default), SSL/TLS certificates will be validated upon connection; if invalid, the connec...
     * @yamlKey verify_ssl
     */
    verifySsl?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Change the watchdog timeout during connection/data transf...
     * @yamlKey watchdog_timeout
     */
    watchdogTimeout?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            http_request: HttpRequestProps & ComponentProps<__marker_http_request_HttpRequestComponent>;
        }
    }
}
