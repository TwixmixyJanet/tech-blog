module.exports = {
    format_date: (date) => {
        return data.toLocaleDateString();
    },

    format_amount: (amount) => {
        return parseInt(amount).toLocaleString();
    },

    is_my_page: (pageUser, userId) => {
        return pageUser === userId;
    },
};