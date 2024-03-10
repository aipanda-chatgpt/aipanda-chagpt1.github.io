const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(process.cwd(), 'public');
const filesToCopy = [
    'googlead9e245093668003.html',
    'BingSiteAuth.xml'
];

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

filesToCopy.forEach(file => {
    const sourcePath = path.resolve(process.cwd(), file);
    const destPath = path.join(publicDir, path.basename(file));
    fs.copyFileSync(sourcePath, destPath);
});
