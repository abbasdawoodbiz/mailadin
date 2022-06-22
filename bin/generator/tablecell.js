function cell(content, isHeader) {
    let element = isHeader ? 'th' : 'td';
    return `
        <${element}>
            ${content}
        </${element}>
    `;
};

export default cell;