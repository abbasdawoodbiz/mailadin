function image(src, style, height, width) {
    return `
        <img src=${src} style=${style} height=${height || auto} width=${width || auto}/>
    `;
};

export default image;