const fs = require('fs');

const writeFile = fileContent => {
    return new promises((resolve, reject) => {
        fs.writeFile ('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve ({
                ok: true,
                message: 'File Created Succesfuly!'
            });
        });
    });
};