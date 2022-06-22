#! /usr/bin/env node
const _ = require('lodash');
let fs = require('fs');
const yargs = require("yargs");
const chalk = require('chalk');

/** Internal Imports */
const scaffold = require('./bin/generator/scaffold');
const button = require('./bin/generator/button');
const text = require('./bin/generator/text');
const elements = require('./bin/constants');

/** Initialise mailadin object for prototyping */
let mailadin = {};

let promises = []

const boxenOptions = {
    backgroundColor: "black"
};

let sections = {
    transactional: {
        header: 'header_txnal',
        footer: 'footer_txnal'
    },
    marketing: {
        header: 'header_marketing',
        footer: 'footer_marketing'
    },
    table: {
        vertical: 'table_v',
        horizontal: 'table_h'
    },
    text: {
        block: 'text_block',
        warning: 'text_warning',
        image_left: 'text_image_left',
        image_top: 'text_image_top'
    },
    divider: {
        line: 'divider',
        no_line: 'divider_invisible'
    },
    button: {
        center: 'button_block_center',
        left: 'button_block_left',
        right: 'button_block_right'
    },
    head: 'head'
}

// mailadin.prototype.defaults = {
//     template: 'transactional',
//     body: 'text,button',
//     name: 'email-output'
// }

const options = yargs
    .usage('Usage: -t <template type>')
    .option('t', { alias: 'template', describe: "Which template to use, one of marketing or transactional, default is transactional", type: 'string', demandOption: false })
    .option('b', { alias: 'body', describe: "Comma separated values from this list: text(:block|:warning|:image_left|:image_top),button(:left|:center|:right),table (:vertical|:horizontal).", type: 'string', demandOption: false })
    .option('p', { alias: 'path', describe: "Absolute path where the files have to be generated, default is current working directory", type: 'string', demandOption: false })
    .option('n', { alias: 'name', describe: "Filename that you want, don't write the .html part. For e.g. if you want the output as myfile.html, enter myfile", type: 'string', demandOption: false })
    .argv;

/**
 * Function to build the final template based on inputs given by devs
 */
function main() {
    console.log(chalk.green.bold('💡 Rubbing the lamp..'));

    let customisation = {}

    // customisation.template = options.template || mailadin.defaults.template
    // customisation.body = options.body || mailadin.defaults.body
    // customisation.cwd = options.path || '.'
    // customisation.fileName = options.name || mailadin.defaults.name

    // createMarkup(customisation);

    console.log(mailadin.generate([button.button('Hi', 'https://google.com'), text.text('Something goes here')], 'Pre header').value);
}

function createMarkup(options, subject, preheader) {

    let header = sections[options.template].header
    let footer = sections[options.template].footer

    console.log(chalk.white.bold('📝 Writing head..'));

    promises.push(fs.readFileAsync(options.cwd, sections.head))

    console.log(chalk.white.bold(`📝 Building ${options.template} template..`));

    promises.push(fs.readFileAsync(options.cwd, header))

    console.log(chalk.white.bold('🍼 Adding body...'));

    /**
     * Sample in options body = text:block,button:block_center => [text:block, button:block_center] => [[text, block],[button, block_center]]
     */
    _.forEach(options.body.split(','), partial => {
        let s = partial.split(':')
        if (s.length > 1) {
            promises.push(fs.readFileAsync(options.cwd, sections[s[0]][s[1]]))
        } else {
            let keys = _.keys(sections[s[0]])
            promises.push(fs.readFileAsync(options.cwd, sections[s[0]][keys[0]]))
        }
    })


    promises.push(fs.readFileAsync(options.cwd, footer))

    Promise.all(promises).then(data => {
        console.log(chalk.white.bold('✅ Finishing up..'));
        writeTemplate(options.cwd, data.join('\n'), options.fileName, 'html')
    })
}

function writeTemplate(wd, content, filename, format) {
    let file = wd + `/${filename}.${format}`
    fs.writeFile(file, content, 'utf-8', (err) => {
        if (err) {
            console.error(err);
        }
        console.log('📧 Output generated at: ' + chalk.green(file));
    });
}

fs.readFileAsync = (cwd, partialName) => {
    return new Promise((resolve, reject) => {
        // TODO: allow override of partials
        let path = __dirname + `/partials/${partialName}.txt`
        fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    });
}

mailadin = {
    value: '',
    generate: (sections, preheader) => {
        // console.log(sections, preheader)
        let self = this;
        let s = [];
        if(!_.isArray(sections)) s.push(sections); else s = sections;
    
        _.each(s, (section, index) => {
            if(_.isUndefined(self.value))
                self.value = section;
            else
                self.value += section;
        });

        self.value = scaffold.generate(preheader, self.value);
    
        return self;
    }
}

module.exports = {
    mailadin: mailadin,
    main: main
}

// main();