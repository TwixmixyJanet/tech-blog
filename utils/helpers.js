// The whole thing is an export
module.exports = {
    // For all the date formatting throughout the handlebars
    format_date: (date) => {
        return date.toLocaleDateString();
    },

    // Found no use for this
    // format_amount: (amount) => {
    //     return parseInt(amount).toLocaleString();
    // },

    // Trying to use this for things to display, but it isn't quite working
    is_my_page: (pageUser, userId) => {
        return pageUser === userId;
    },
};