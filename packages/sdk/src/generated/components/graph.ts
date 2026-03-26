// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { Color, font_Font, graph_Graph, sensor_Sensor } from "../markers";
export interface GraphTracesProps {
    sensor: RefProp<sensor_Sensor>;
    name?: string;
    /** @yamlKey line_thickness */
    lineThickness?: number;
    /** @yamlKey line_type */
    lineType?: "SOLID" | "DOTTED" | "DASHED";
    color?: RefProp<Color>;
    continuous?: boolean;
}
export interface GraphLegendProps {
    /** @yamlKey name_font */
    nameFont: RefProp<font_Font>;
    /** @yamlKey value_font */
    valueFont?: RefProp<font_Font>;
    width?: number;
    height?: number;
    border?: boolean;
    /** @yamlKey show_lines */
    showLines?: boolean;
    /** @yamlKey show_values */
    showValues?: "NONE" | "AUTO" | "BESIDE" | "BELOW";
    /** @yamlKey show_units */
    showUnits?: boolean;
    direction?: "AUTO" | "HORIZONTAL" | "VERTICAL";
}
export interface GraphProps {
    /** [Time](/guides/configuration-types#time): The total graph history duration. */
    duration: TimePeriod;
    /** int: Legend width in pixels. If not specified, width is automatically calculated. */
    width: number;
    /** int: Legend height in pixels. If not specified, height is automatically calculated. */
    height: number;
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
    /** boolean: Draw a border around the legend. Defaults to `true`. */
    border?: boolean;
    /** [ID](/guides/configuration-types#id): The sensor value to plot */
    sensor?: RefProp<sensor_Sensor>;
    /**
     * Defaults to 3
     * @yamlKey line_thickness
     */
    lineThickness?: number;
    /**
     * Specifies the plot line-type. Can be one of the following: `SOLID`, `DOTTED`, `DASHED`. Defaults to `SOLID`.
     * @yamlKey line_type
     */
    lineType?: "SOLID" | "DOTTED" | "DASHED";
    /** Sets the color of the sensor trace. */
    color?: RefProp<Color>;
    /**
     * Specifies the minimum Y-axis value.
     * @yamlKey min_value
     */
    minValue?: unknown;
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
     * Specifies the maximum Y-axis range.
     * @yamlKey max_range
     */
    maxRange?: unknown;
    /** Use this to specify more than a single trace. */
    traces?: Array<GraphTracesProps>;
    /** Configures a legend for the graph traces. See [Legend Options](https://esphome.io/components/graph#legend-options). */
    legend?: Array<GraphLegendProps>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            graph: GraphProps & ComponentProps<graph_Graph>;
        }
    }
}
