const fs = require("fs");
const inquirer = require("inquirer");
const generatePage = require("./src/page-template");
// const mockData = {
//   name: "MartinCostas",
//   github: "Devnah4",
//   confirmAbout: true,
//   about:
//     "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.",
//   projects: [
//     {
//       name: "Run Buddy",
//       description:
//         "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.",
//       languages: ["HTML", "CSS"],
//       link: "https://github.com/lernantino/run-buddy",
//       feature: true,
//       confirmAddProject: true,
//     },
//     {
//       name: "Taskinator",
//       description:
//         "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.",
//       languages: ["JavaScript", "HTML", "CSS"],
//       link: "https://github.com/lernantino/taskinator",
//       feature: true,
//       confirmAddProject: true,
//     },
//     {
//       name: "Taskmaster Pro",
//       description:
//         "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.",
//       languages: ["JavaScript", "jQuery", "CSS", "HTML", "Bootstrap"],
//       link: "https://github.com/lernantino/taskmaster-pro",
//       feature: false,
//       confirmAddProject: true,
//     },
//     {
//       name: "Robot Gladiators",
//       description:
//         "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.",
//       languages: ["JavaScript"],
//       link: "https://github.com/lernantino/robot-gladiators",
//       feature: false,
//       confirmAddProject: false,
//     },
//   ],
// };

// // Mock Code
// const pageHTML = generatePage(mockData);

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
    const pageHTML = generatePage(portfolioData);

    fs.writeFile("./index.html", pageHTML, (err) => {
      if (err) throw new Error(err);
      console.log(portfolioData)
    });
  });