// Script to update all HTML files with responsive meta tags
const fs = require('fs');
const path = require('path');

const collectionPages = [
    'accessories.html', 'bags.html', 'bottoms.html', 'dresses.html',
    'hair.html', 'hats.html', 'jerseys.html', 'jewellery.html',
    'jumpsuits.html', 'shoes.html', 'shorts.html', 'shrugs.html',
    'skirts.html', 'tops.html', 'two-piece.html', 'customization.html',
    'vote.html', 'creator-profile.html'
];

const responsiveMeta = `    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
    <meta name="theme-color" content="#000000">`;

const responsiveCSS = `    <link rel="stylesheet" href="responsive-utilities.css">`;

collectionPages.forEach(filename => {
    const filepath = path.join(__dirname, filename);
    
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        
        // Update viewport meta tag
        content = content.replace(
            /<meta name="viewport" content="width=device-width, initial-scale=1\.0">/,
            responsiveMeta
        );
        
        // Add responsive utilities CSS if not present
        if (!content.includes('responsive-utilities.css')) {
            content = content.replace(
                /(<link rel="stylesheet" href="styles\.css">)/,
                '$1\n' + responsiveCSS
            );
        }
        
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Updated: ${filename}`);
    }
});

console.log('All files updated successfully!');