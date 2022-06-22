function button(content, href, style) {
    return `<a href="${href}" role="button" style="${style}">${content}</a>`;
};

module.exports.button = button;