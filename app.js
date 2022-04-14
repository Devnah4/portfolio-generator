
const inquirer = require("inquirer");
const generatePage = require("./src/page-template");
const { writeFile, copyFile } = require('./utils/generate-site.js');

// User Info Questions
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please Enter a Name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter GitHub Username",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please Enter a Username");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message: "Would you like to write something about yourself?",
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some info about yourself:",
      when: ({ confirmAbout }) => confirmAbout
    },
  ]);
};

// Project Questions
const promptProject = (portfolioData) => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please Enter a name for the Project");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required)",
        validate: (descriptionInput) => {
          if (descriptionInput) {
            return true;
          } else {
            console.log("Please Enter a Description for the Project");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "Enter the GitHub link to your project. (Required)",
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("Please Enter a link to the repository");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

// Actual Use Code
promptUser()

  .then(promptProject)
  .then((portfolioData) => {
    return generatePage(portfolioData);
  })
  .then (pageHTML => {
    return writeFile(pageHTML);
  })
  .then (writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then (copyFileResponse => {
    console.log (copyFileResponse);
  })
  .catch (err => {
    console.log(err);
  });