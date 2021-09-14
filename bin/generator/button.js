function generate(text, href, align, customStyle) {

    let style = customStyle ? customStyle :
        `margin: 12px auto; padding: 8px 12px; background-color: #0486FF; color: white; border-radius: 0.25rem; margin-bottom: 32px;`;

    let template = `
    <tr>
        <td align="${align}" style="padding: 12px 64px;" colspan="2">
            <a href="${href}" role="button"
                style="${style}">
                ${text}}</a>
        </td>
    </tr>
    `;
};

module.exports = {
    generate: generate
}