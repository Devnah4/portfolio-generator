const inquirer = require('inquirer');

const promptUser = () => {
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'Name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'GitHub',
      message: 'Enter GitHub Username'
    },
    {
      type: 'input',
      name: 'About',
      message: 'Provide some info about yourself:'
    }
  ]);
};

const promptProject = () => {
  console.log(``);
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'Name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'Description',
      message: 'Provide a description of the project (Required)'
    },
    {
      type: 'checkbox',
      name: 'Languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'Link',
      message: 'Enter the GitHub link to your project. (Required)'
    },
    {
      type: 'confirm',
      name: 'Feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ]);
};

promptUser()
.then(answers => console.log(answers))
.then(promptProject)
.then(projectAnswers => console.log(projectAnswers));
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });