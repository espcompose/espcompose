// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { lcd_base_LCDDisplay, lcd_menu_LCDCharacterMenuComponent } from "../markers";
export interface LcdMenuProps {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the LCD display.
     * @yamlKey display_id
     */
    displayId?: RefProp<lcd_base_LCDDisplay>;
    /**
     * 0-255: Code of the character used to mark menu item selected. Defaults to `0x3e` (`>` ).
     * @yamlKey mark_selected
     */
    markSelected?: number | EmbedValue<number>;
    /**
     * 0-255: Code of the character used to mark menu item editing mode. Defaults to `0x2a` (`*` ).
     * @yamlKey mark_editing
     */
    markEditing?: number | EmbedValue<number>;
    /**
     * 0-255: Code of the character used to mark menu item leading to a submenu. Defaults to `0x7e` (a right arrow).
     * @yamlKey mark_submenu
     */
    markSubmenu?: number | EmbedValue<number>;
    /**
     * 0-255: Code of the character used to mark menu items going back one level. As the character set lacks a good looking ...
     * @yamlKey mark_back
     */
    markBack?: number | EmbedValue<number>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            lcd_menu: LcdMenuProps & ComponentProps<lcd_menu_LCDCharacterMenuComponent>;
        }
    }
}
