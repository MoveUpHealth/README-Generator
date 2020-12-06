const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is the name of your project",
      name: "title",
    },
    {
      type: "input",
      message: "What does your app do? What is it used for?",
      name: "what",
    },
    {
      type: "confirm",
      message: "Do you want to include a screenshot in your description?",
      name: "confirmImg",
    },
    {
      type: "input",
      message: "What is the link to your screenshot file?",
      name: "img",
      when: (answers) => answers.confirmImg === true,
    },
    {
      type: "input",
      message:
        "What was the motivation for making the app? What problem does it solve?",
      name: "why",
    },
    {
      type: "input",
      message: "How does the app work? Please include any key features.",
      name: "how",
    },
    {
      type: "confirm",
      message: "Did you use any technologies for this app?",
      name: "confirmTech",
    },
    {
      type: "input",
      message: "What technologies did you use? (Separate them with commas)",
      name: "tech",
      when: (answers) => answers.confirmTech === true,
    },
    {
      type: "input",
      message: "What challenges did you encounter?",
      name: "challenges",
    },
    {
      type: "input",
      message: "What did you learn?",
      name: "lessons",
    },
    {
      type: "input",
      message: "Describe any plans for future development:",
      name: "future",
    },
    {
      type: "confirm",
      message: "Do you want to include installation instructions?",
      name: "confirmInstall",
    },
    {
      type: "input",
      message: "How would a user install your app?",
      name: "install",
      when: (answers) => answers.confirmInstall === true,
    },
    {
      type: "confirm",
      message: "Are there tests to run on your app?",
      name: "confirmTest",
    },
    {
      type: "input",
      message: "Describe the tests to run on your app:",
      name: "test",
      when: (answers) => answers.confirmTest === true,
    },
    {
      type: "confirm",
      message: "Do you want to include credits?",
      name: "confirmCredit",
    },
    {
      type: "input",
      message: "Describe what was contributed and by whom.",
      name: "credit",
      when: (answers) => answers.confirmCredit === true,
    },
    {
      type: "confirm",
      message: "Do you want to include information about licensing?",
      name: "confirmLicense",
    },
    {
      type: "input",
      message: "How is this app licensed?",
      name: "license",
      when: (answers) => answers.confirmLicense === true,
    },
  ])
  .then((answers) => {
    const tableList = [];
    var techList = [];
    const technologiesUsed = [];
    const table = [];
    const fileName = "README.md";
    //Defines screenshot
    if (answers.confirmImg === true) {
        var screenshot = `[${answers.title.toLowerCase().split(" ").join("")}](${answers.img})`;
    } else {
        screenshot = ""   
    }
    //Defines technologies used
    if (answers.confirmTech === true) {
        var techTitle = `\nTechnologies Used\n\n`;  
        techList = answers.tech.split(", ");
      } else {
        techTitle = "";
      }

    if (techList.length > 0) {
        for (var i = 0; i < techList.length; i++) {
          technologiesUsed.push(`* ${techList[i]}`);
      }
      }
    //Defines the description portion of the README file
    const descriptionInstructions = `## Description\n\n${answers.what} ${screenshot}
       
Purpose: ${answers.why}

${answers.how}
${techTitle}${technologiesUsed.join('\n')}

Challenges: ${answers.challenges}

Lessons Learned: ${answers.lessons}

Future Development: ${answers.future}`;
    
    if (answers.confirmInstall === true) {
      tableList.push("Installation");
      var installInstructions = `## Installation \n \n${answers.install}`;
    } else {
      installInstructions = "";
    }

    if (answers.confirmTest === true) {
      tableList.push("Tests");
      var testInstructions = `## Tests \n\n${answers.test}`;
    } else {
      testInstructions = "";
    }

    if (answers.confirmCredit === true) {
      tableList.push("Credit");
      var credits = `## Credit \n \n${answers.credit}`;
    } else {
      credits = "";
    }

    if (answers.confirmLicense === true) {
      tableList.push("Licensing");
      var licenseInstructions = `## Licensing \n \n${answers.license}`;
    } else {
      licenseInstructions = "";
    }
    
    for (var i = 0; i < tableList.length; i++) {
      table.push(`* [${tableList[i]}](#${tableList[i].toLowerCase()})`);
    }
    
    const content = `
# ${answers.title}

## Table of Contents
* [Description](#description)
${table.join("\n")}

${descriptionInstructions}

${installInstructions}

${credits}

${licenseInstructions}

${testInstructions}


        `;

    fs.writeFile(fileName, content, "utf8", (err) =>
      err
        ? console.error(err)
        : console.log("Your README file has been created!")
    );

  });
