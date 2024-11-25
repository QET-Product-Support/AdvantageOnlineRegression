const fs = require('fs');
const { JSDOM } = require('jsdom');

const xmlFilePath = 'output/results.xml'; // Path to your JUnit result file
const updatedFilePath = 'output/results_with_gherkin.xml'; // Path to save the updated XML

fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
    if (err) throw err;

    const dom = new JSDOM(data, { contentType: 'text/xml' });
    const doc = dom.window.document;

    // Find all <testcase> nodes
    const testcases = doc.querySelectorAll('testcase');

    testcases.forEach((testcase) => {
        // Add Gherkin metadata as new child elements
        const feature = doc.createElement('feature');
        feature.textContent = 'features/UserBuysSpeaker.feature'; // Path to the feature file
        testcase.appendChild(feature);

        const steps = doc.createElement('steps');
        ['Given I log into AdvantageDemo', 'And I select the "Speakers" option', 'Then I am able to checkout the selected speaker'].forEach((stepText) => {
            const step = doc.createElement('step');
            step.textContent = stepText;
            steps.appendChild(step);
        });
        testcase.appendChild(steps);
    });

    // Serialize and save the updated XML
    fs.writeFile(updatedFilePath, dom.serialize(), (err) => {
        if (err) throw err;
        console.log(`Updated JUnit XML saved to ${updatedFilePath}`);
    });
});