import {normalize, schema} from 'normalizr';

// Flatten API response includes and store by ID
const normalizeIncludes = (data) => {
    if(data.includes) {
        const {Entry: entries, Asset: assets} = data.includes;

        let normalizedEntries = {};
        let normalizedAssets = {};

        if(entries) {
            const entrySchema = new schema.Entity('entries', {}, {
                idAttribute: (value) => value.sys.id
            });
            const entryListSchema = [entrySchema];
            normalizedEntries = normalize(entries, entryListSchema).entities.entries;
        }

        if(assets) {
            const assetSchema = new schema.Entity('assets', {}, {
                idAttribute: (value) => value.sys.id
            });
            const assetListSchema = [assetSchema];
            normalizedAssets = normalize(assets, assetListSchema).entities.assets;
        }

        return Object.assign({}, normalizedEntries, normalizedAssets);
    }
};

// Check if field is an API link
const isLink = (value) => (
    typeof value === 'object' &&
    value.sys &&
    (value.sys.linkType === 'Asset' || value.sys.linkType === 'Entry')
);

// Check if field is an API link array
const isLinkArray = (value) => (
    Array.isArray(value) &&
    value[0].sys &&
    (value[0].sys.linkType === 'Asset' || value[0].sys.linkType === 'Entry')
);

// Parse an API content model
export const parseModel = (data, limit) => {
    const includes = normalizeIncludes(data) || {};

    // Memoize includes that have already been parsed to avoid unnecessary parses
    const parsedIncludes = {};
    const parseId = (id) => {
        if(!parsedIncludes[id]) {
            // Weak map to prevent infinite recursion with cyclic references
            parsedIncludes[id] = {...includes[id].fields};

            parsedIncludes[id] = {
                _id: id,
                ...parseFields(includes[id].fields) // eslint-disable-line
            };
        }

        return parsedIncludes[id];
    };

    // Recursively parse the fields of an entry
    const parseFields = (obj) => {
        const fields = {};

        Object.entries(obj).forEach(([key, value]) => {
            if(isLinkArray(value)) {
                fields[key] = value
                    .map((val) => val.sys.id)
                    .filter((id) => includes[id])
                    .map((id) => parseId(id));
            } else if(isLink(value)) {
                if(includes[value.sys.id])
                    fields[key] = parseId(value.sys.id);
            } else {
                fields[key] = value;
            }
        });

        return fields;
    };

    const items = [];

    for (let i = 0, count = limit || data.items.length; i < count; i++) {
        const item = data.items[i];

        items.push({
            type: item.sys.contentType.sys.id,
            fields: {
                _id: item.sys.id,
                ...parseFields(item.fields)
            }
        });
    }

    return items;
};
