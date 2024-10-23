export const SORT_ORDER = ['asc', 'desc'];
export const sortFields = ['_id', 'name', 'phoneNumber', 'email', 'isFavourite', 'contactType', 'createdAt', 'updatedAt'];

export const parseSortParams = ({ sortBy, sortFields, sortOrder }) => {
    const parsedSortBy = sortFields.includes(sortBy) ? sortBy : "_id";
    const parsedSortOrder = SORT_ORDER.includes(sortOrder) ? sortOrder : SORT_ORDER[0];

    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
};

