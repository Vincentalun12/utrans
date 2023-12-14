export const TitleCase = (str) => {
    return str
        .replace(/(?:^|\_)\w/g, function (char) {
            return char.toUpperCase();
        })
        .replace(/_/g, " ");
};
