import { resolveConfig } from "@latticexyz/store";
import mudConfig from "contracts/mud.config";

// The namespace is not exported from the config so we redefine it here
const NAMESPACE = "League";

type ResolvedTables = ReturnType<typeof resolveConfig<typeof mudConfig>>["tables"];

type ResolvedTablesPrefixed = {
    [TableKey in keyof ResolvedTables as `${typeof NAMESPACE}_${string & TableKey}`]: ResolvedTables[TableKey]
};

export function getTables(): ResolvedTablesPrefixed {
    const { tables } = resolveConfig(mudConfig);

    const tablesPrefixed: {
        [k: `${typeof NAMESPACE}_${string}`]: ResolvedTables[keyof ResolvedTables];
    } = {};

    Object.entries(tables).forEach(([key, value]) => {
        tablesPrefixed[`${NAMESPACE}_${key}`] = value;
    });

    return tablesPrefixed as ResolvedTablesPrefixed;
}