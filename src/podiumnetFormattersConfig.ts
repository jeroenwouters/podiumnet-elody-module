// @ts-ignore
import { type FormattersConfig } from '../types';
import { CustomFormatterTypes } from '../generated-types/type-defs';

export const podiumnetFormattersConfig: FormattersConfig = {
    [CustomFormatterTypes.Pill]: {
        concept: {
            "background": "#e6e6e6",
            "text": "#4a4a4a",
        },
        verwacht: {
            "background": "#ecdada",
            "text": "#ac1113",
        },
        finaal: {
            "background": "#daecdd",
            "text": "#0b8319",
        },
        gepubliceerd: {
            "background": "#daecdd",
            "text": "#0b8319",
        },
        gearchiveerd: {
            "background": "#faeecd",
            "text": "#916807",
        },

    }
};