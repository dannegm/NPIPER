#!/usr/bin/env node
/* eslint-disable */

const { exec } = require('child_process');
const { writeFileSync, mkdirSync } = require('fs');
const path = require('path');
const yargs = require('yargs');
const rimraf = require('rimraf');

const { PascalCase, tplComponentIndex, tplComponent, tplComponentStyled } = require('./templates');

const $path = (relativePath) => path.join(__dirname, '../', relativePath);

const makeComponent = ({ dest, override, componentName }) => {
    const $base = $path(`${dest}/${PascalCase(componentName)}`);

    if (override) {
        console.warn('Overriding component');
        rimraf.sync($base);
    }

    mkdirSync($base);
    writeFileSync(`${$base}/index.js`, tplComponentIndex(componentName));
    writeFileSync(`${$base}/${PascalCase(componentName)}.js`, tplComponent(componentName));
    writeFileSync(
        `${$base}/${PascalCase(componentName)}.styled.js`,
        tplComponentStyled(componentName)
    );

    exec(`npx prettier ${$base}/**/*.js --check --write`, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
    });
};

yargs
    .command({
        command: 'make <name>',
        desc: 'Create a componenent boilerplate',
        usage: 'Usage: $0 <name> --dest [dest]',
        builder: (yargs) =>
            yargs
                .option('dest', {
                    alias: 'd',
                    describe: 'provide a path to file',
                    default: './',
                    demandOption: true,
                })
                .option('override', {
                    alias: 'o',
                    describe: "force to override the component's files",
                    default: false,
                    type: 'boolean',
                }),
        handler: ({ name, dest, override }) => {
            makeComponent({ dest, override, componentName: name });
        },
    })
    .demandCommand(2).argv;
