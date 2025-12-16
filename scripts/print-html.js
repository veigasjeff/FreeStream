// scripts/print-html.js
const fs = require('fs');
const path = require('path');

// The path where Next.js stores the built HTML files
const PAGES_DIR = path.join(process.cwd(), '.next', 'server', 'pages');

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.html')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
};

const printHtml = () => {
  console.log('\n==================================================');
  console.log('STARTING HTML VERIFICATION');
  console.log('Checking for Pre-rendered HTML content...');
  console.log('==================================================\n');

  if (!fs.existsSync(PAGES_DIR)) {
    console.error('❌ Build folder not found. Please run "npm run build" first.');
    return;
  }

  const htmlFiles = getAllFiles(PAGES_DIR);

  if (htmlFiles.length === 0) {
    console.error('❌ No HTML files found. Your pages might be rendering Client-Side only!');
    console.error('   Ensure you are using getStaticProps or getServerSideProps.');
    return;
  }

  htmlFiles.forEach((filePath) => {
    // Get relative path for display (e.g., /index.html)
    const relativePath = filePath.replace(PAGES_DIR, '');
    const content = fs.readFileSync(filePath, 'utf8');

    console.log(`\n\n📄 PAGE: ${relativePath}`);
    console.log('--------------------------------------------------');
    
    // Check if critical SEO tags exist
    const hasTitle = content.includes('<title>');
    const hasMetaDesc = content.includes('name="description"');
    const hasSchema = content.includes('application/ld+json');
    const hasH1 = content.includes('<h1');

    if(hasTitle && hasMetaDesc && hasSchema) {
        console.log('✅ SEO CHECK: Title, Description, and Schema found.');
    } else {
        console.log('⚠️ SEO WARNING: Missing standard SEO tags in this file.');
    }
    
    console.log('--------------------------------------------------');
    console.log(content); // <--- THIS PRINTS THE RAW HTML TO CONSOLE
    console.log('--------------------------------------------------');
  });
};

printHtml();