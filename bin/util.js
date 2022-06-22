const validator = require('html-validator');
const _ = require('lodash');

function addRow(content) {
    return `
    <tr style="padding: 24px 32px 12px;">
        ${content}
    </tr>
    `;
}

function addColumn(content, colspan){
    return `
    <td style="padding: 12px 64px;" colspan="${colspan}">
    ${content}
    </td>
    `;
}

async function htmlValidator(string){
    const options = {
        validator: 'WHATWG',
        data: string,
        isFragment: true
    }

    try {
        const result = await validator(options)
        return result;
    } catch (error) {
        console.error(error)
        return error;
    }
}

module.exports = {
    addRow: addRow,
    addColumn: addRow,
    htmlValidator: htmlValidator
}