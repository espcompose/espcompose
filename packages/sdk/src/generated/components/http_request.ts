// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { http_request_HttpRequestComponent } from "../markers";
export interface HttpRequestProps extends _CoreComponent {
    /** string: User-Agent header for requests. Defaults to `ESPHome/<version> (https://esphome.io)` where `<version>` is the... */
    useragent?: string | EmbedValue<string>;
    /**
     * boolean: Enable following HTTP redirects. Defaults to `true`.
     * @yamlKey follow_redirects
     */
    followRedirects?: boolean | EmbedValue<boolean>;
    /**
     * integer: Maximum amount of redirects to follow when enabled. Defaults to `3`.
     * @yamlKey redirect_limit
     */
    redirectLimit?: number | EmbedValue<number>;
    /** [Time](/guides/configuration-types#time): Timeout for request. Defaults to `4.5s`. */
    timeout?: TimePeriod;
    /**
     * boolean: Determines whether to include HTTPS/SSL support in the firmware binary. Excluding the SSL libraries from you...
     * @yamlKey esp8266_disable_ssl_support
     */
    esp8266DisableSslSupport?: boolean | EmbedValue<boolean>;
    /**
     * boolean: When set to `true` (default), SSL/TLS certificates will be validated upon connection; if invalid, the connec...
     * @yamlKey verify_ssl
     */
    verifySsl?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): Change the watchdog timeout during connection/data transfer. May be useful ...
     * @yamlKey watchdog_timeout
     */
    watchdogTimeout?: TimePeriod;
    /**
     * integer: Change HTTP receive buffer size. Defaults to `512`.
     * @yamlKey buffer_size_rx
     */
    bufferSizeRx?: number | EmbedValue<number>;
    /**
     * integer: Change HTTP transmit buffer size. Defaults to `512`.
     * @yamlKey buffer_size_tx
     */
    bufferSizeTx?: number | EmbedValue<number>;
    /**
     * integer: Change TLS receive buffer size. Should be set to `16384` to fit the TLS record size of modern HTTP servers. ...
     * @yamlKey tls_buffer_size_rx
     */
    tlsBufferSizeRx?: number | EmbedValue<number>;
    /**
     * integer: Change TLS transmit buffer size. Defaults to `512`.
     * @yamlKey tls_buffer_size_tx
     */
    tlsBufferSizeTx?: number | EmbedValue<number>;
    /**
     * file path: Path to a CA certificate bundle. Not required on MacOS (the inbuilt CA bundle is used and SSL enabled by d...
     * @yamlKey ca_certificate_path
     */
    caCertificatePath?: string;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            http_request: HttpRequestProps & ComponentProps<http_request_HttpRequestComponent>;
        }
    }
}
