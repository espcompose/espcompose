// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { __marker_Color, __marker_font_Font, __marker_graph_Graph, __marker_sensor_Sensor } from "../markers";
export interface GraphLegendProps {
    border?: boolean;
    direction?: "AUTO" | "HORIZONTAL" | "VERTICAL";
    height?: number;
    /** @yamlKey name_font */
    nameFont: RefProp<__marker_font_Font>;
    /** @yamlKey show_lines */
    showLines?: boolean;
    /** @yamlKey show_units */
    showUnits?: boolean;
    /** @yamlKey show_values */
    showValues?: "AUTO" | "BELOW" | "BESIDE" | "NONE";
    /** @yamlKey value_font */
    valueFont?: RefProp<__marker_font_Font>;
    width?: number;
}
export interface GraphTracesProps {
    color?: RefProp<__marker_Color>;
    continuous?: boolean;
    /** @yamlKey line_thickness */
    lineThickness?: number;
    /** @yamlKey line_type */
    lineType?: "DASHED" | "DOTTED" | "SOLID";
    name?: string;
    sensor: RefProp<__marker_sensor_Sensor>;
}
export interface GraphProps {
    /** boolean: Draw a border around the legend. Defaults to `true`. */
    border?: boolean;
    /** Sets the color of the sensor trace. */
    color?: RefProp<__marker_Color>;
    /** [Time](https://esphome.io/guides/configuration-types#time): The total graph history duration. */
    duration: TimePeriod;
    /** int: Legend height in pixels. If not specified, height is automatically calculated. */
    height?: number;
    /** Configures a legend for the graph traces. See [Legend Options](https://esphome.io/components/graph#legend-options). */
    legend?: GraphLegendProps;
    /**
     * Defaults to 3
     * @yamlKey line_thickness
     */
    lineThickness?: number;
    /**
     * Specifies the plot line-type. Can be one of the following: `SOLID`, `DOTTED`, `DASHED`. Defaults to `SOLID`.
     * @yamlKey line_type
     */
    lineType?: "DASHED" | "DOTTED" | "SOLID";
    /**
     * Specifies the maximum Y-axis range.
     * @yamlKey max_range
     */
    maxRange?: unknown;
    /**
     * Specifies the maximum Y-axis value.
     * @yamlKey max_value
     */
    maxValue?: unknown;
    /**
     * Specifies the minimum Y-axis range.
     * @yamlKey min_range
     */
    minRange?: unknown;
    /**
     * Specifies the minimum Y-axis value.
     * @yamlKey min_value
     */
    minValue?: unknown;
    /** [ID](https://esphome.io/guides/configuration-types#id): The sensor value to plot */
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** Use this to specify more than a single trace. */
    traces?: Array<GraphTracesProps>;
    /** int: Legend width in pixels. If not specified, width is automatically calculated. */
    width?: number;
    /**
     * Specifies the time per division. If not specified, no vertical grid will be drawn.
     * @yamlKey x_grid
     */
    xGrid?: TimePeriod;
    /**
     * float: Specifies the number of units per division. If not specified, no horizontal grid will be drawn.
     * @yamlKey y_grid
     */
    yGrid?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            graph: GraphProps & ComponentProps<__marker_graph_Graph>;
        }
    }
}
