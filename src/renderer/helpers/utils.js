import { unparse as csvToJson } from 'papaparse';

export const renderTemplate = (template, data) => {
    let renderedTemplate = template;

    Object.entries(data).forEach(([key, value]) => {
        const regex = RegExp(`{${key}}`, 'g');
        renderedTemplate = renderedTemplate.replace(regex, value);
    });
    // renderedTemplate = renderedTemplate.replace(/{\w+}/g, '');
    return renderedTemplate;
};

export const downloadBlob = (buffer, name = 'file') => {
    const jsonBlob = new Blob(buffer);
    const blobUrl = URL.createObjectURL(jsonBlob);

    const link = document.createElement('a');

    link.href = blobUrl;
    link.download = name;

    document.body.appendChild(link);

    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
        })
    );

    document.body.removeChild(link);
};

export const downloadJson = (data, name = 'file.json') => {
    downloadBlob([JSON.stringify(data)], name);
};

export const downloadCsv = (data, name = 'file.csv') => {
    const rawCsv = csvToJson(data, {
        delimiter: ',',
        header: true,
    });
    downloadBlob([rawCsv], name);
};
