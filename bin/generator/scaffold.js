function generate(preheader, content, title){
    
    let s =  
    `<body style="background-color: #F8F8F8;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center"
        style="max-width: 620px; background-color: white; padding: 12px; border:1px solid #F2F2F2; border-radius: 0.25rem; margin: 32px auto 12px;">
            <tbody>
                <tr>
                    <td style="display:none!important;
        visibility:hidden;
        mso-hide:all;
        font-size:1px;
        color:#ffffff;
        line-height:1px;
        max-height:0px;
        max-width:0px;
        overflow:hidden;">
                        ${preheader}
                    </td>
                </tr>
                <tr>
                    <td style="padding:4px 32px; border-bottom: 1px solid #dddddd;">
                        <h2>${title}</h2>
                    </td>
                </tr>
            ${content}
            </tbody>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center"
                    style="max-width: 620px; padding: 12px; font-size: 0.7rem; line-height: 1rem; color: #777;">
                <tbody>
                    <tr>
                        <td width="80%" style="vertical-align: top; padding-top:12px;">
                            <span style="margin: 0; display: block;">
                                Smartpaddle Technology Pvt. Ltd., Saki Naka, Andheri East, Mumbai, Maharashtra 400072, India
                            </span>
                            <span style="display: block;">You received this notification because you are subscribed to notifications from Bizongo&apos;s
                                Procure Live. You can <a href="#">change which notifications you receive.</a> You can not reply
                                to this mail. In case of any issues, you can <a href="#">check our support resources.</a></span>
                        </td>
                        <td width="17%" align="right" style="vertical-align: top; padding-top: 12px;">
                            <img 
                            height=80
                            width=64
                            style="background-color: black;"
                            src="https://global-uploads.webflow.com/5fad195767bb5f0163efac7f/5fb62c989051fe737eef847a_Bizongo-logo.png">
                        </td>
                    </tr>
                </tbody>
        </table>
    </body>
    `;

    return s;

}

module.exports = {
    generate: generate
};