// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { font_Glyph } from "../markers";
export interface FontExtrasProps {
    /** string: The path of the font file with the extra glyphs. */
    file: unknown;
    /** list: A list of glyphs you want to include. Can't repeat the same glyph codepoint if it was declared in the level above. */
    glyphs: Array<string>;
}
export interface FontProps {
    /** string: The path (relative to where the .yaml file is) of the font file. You can also use the `gfonts://` short form ... */
    file: unknown;
    /** list: A list of characters you plan to use, in addition to the characters defined by the glyphsets option above. Adju... */
    glyphs?: Array<string>;
    /** list: A list of glyphsets you plan to use. Defaults to `GF_Latin_Kernel`, which contains the basic characters and nec... */
    glyphsets?: Array<"GF_Arabic_Core" | "GF_Arabic_Plus" | "GF_Cyrillic_Core" | "GF_Cyrillic_Historical" | "GF_Cyrillic_Plus" | "GF_Cyrillic_Pro" | "GF_Greek_AncientMusicalSymbols" | "GF_Greek_Archaic" | "GF_Greek_Coptic" | "GF_Greek_Core" | "GF_Greek_Expert" | "GF_Greek_Plus" | "GF_Greek_Pro" | "GF_Latin_African" | "GF_Latin_Beyond" | "GF_Latin_Core" | "GF_Latin_Kernel" | "GF_Latin_Plus" | "GF_Latin_PriAfrican" | "GF_Latin_Vietnamese" | "GF_Phonetics_APA" | "GF_Phonetics_DisorderedSpeech" | "GF_Phonetics_IPAHistorical" | "GF_Phonetics_IPAStandard" | "GF_Phonetics_SinoExt" | "GF_TransLatin_Arabic" | "GF_TransLatin_Pinyin">;
    /**
     * boolean: By default, warnings are generated for any glyph that is included in the defined glyphsets but not present i...
     * @yamlKey ignore_missing_glyphs
     */
    ignoreMissingGlyphs?: boolean;
    /** int: The desired size of the font. This will be the size (height) of the font in pixels when rendered. If you want to... */
    size?: number;
    /** int: The bit depth of the rendered font from OpenType/TrueType, for anti-aliasing. Can be `1`, `2`, `4`, `8`. Default... */
    bpp?: "1" | "2" | "4" | "8";
    /** enum: A list of font glyph configurations you'd like to include within this font, from other OpenType/TrueType files ... */
    extras?: Array<FontExtrasProps>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            font: FontProps & ComponentProps<font_Glyph>;
        }
    }
}
