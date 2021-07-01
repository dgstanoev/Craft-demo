#!/usr/bin/env node

import program from 'commander';
import inquirer from 'inquirer';
import {
  getUser,
  createContact,
  updateContact,
  getContact,
  getContacts,
} from '../index.js';

const usernameQuestion = [
  {
    type: 'input',
    name: 'username',
    message: 'GitHub user login (username)',
  },
];

const updateContactQuestions = [
  {
    type: 'input',
    name: 'subdomain',
    message: 'FreshDesk subdomain',
  },
  {
    type: 'input',
    name: 'id',
    message: 'Contact id',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Contact name',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Contact email',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Contact description',
  },
  {
    type: 'input',
    name: 'address',
    message: 'Contact address',
  },
];

const getContactQuestions = [
  {
    type: 'input',
    name: 'subdomain',
    message: 'FreshDesk subdomain',
  },
  {
    type: 'input',
    name: 'id',
    message: 'Contact id',
  },
];

const subdomainQuestion = [
  {
    type: 'input',
    name: 'subdomain',
    message: 'FreshDesk subdomain',
  },
];

program
  .version('1.0.0')
  .description('Quickbase pre-technical interview assignment');

// Fetch FreshDesk contact
program
  .command('fetch')
  .alias('f')
  .description('Fetch a FreshDesk contact')
  .action(async () => {
    const { subdomain, id } = await inquirer.prompt(getContactQuestions);
    await getContact(subdomain, id);
  });

// List all FreshDesk contacts
program
  .command('list')
  .alias('l')
  .description('List FreshDesk contacts')
  .action(async () => {
    const { subdomain } = await inquirer.prompt(subdomainQuestion);
    await getContacts(subdomain);
  });

// Create FreshDesk contact
program
  .command('create')
  .alias('c')
  .description('Create FreshDesk contact')
  .action(async () => {
    const { username } = await inquirer.prompt(usernameQuestion);
    const { name, email, location, bio, login } = await getUser(username);
    const { subdomain } = await inquirer.prompt(subdomainQuestion);
    await createContact(subdomain, {
      name,
      email: email ? email : `${login}@freshdesk.com`,
      address: location,
      description: bio,
    });
  });

// Update FreshDesk contact
program
  .command('update')
  .alias('u')
  .description('Update FreshDesk contact')
  .action(async () => {
    const answers = await inquirer.prompt(updateContactQuestions);
    const contactData = {};
    Object.entries(answers).forEach(acc, (el) => {
      if (entry[1] !== '' && entry[0] !== 'subdomain' && entry[0] !== 'id')
        contactData[entry[0]] = entry[1];
    });
    await updateContact(answers.subdomain, answers.id, contactData);
  });

// function mappingFn(arr, cb) {
//   let mappedArr = [];
//   arr.forEach((el) => {
//     mappedArr.push(cb(el));
//   });

//   return mappedArr;
// }

// { 1: { id: 1, name: Rado} , 2: { id: 2, name: ‘Mitko’}
// let array = [
//   { id: 1, name: 'Rado' },
//   { id: 2, name: 'Mitko' },
// ];

array.reduce((acc, el) => ({ ...acc, [el.id]: el }), {});

answers.reduce((acc, entry) => {
  if (entry[1] !== '' && entry[0] !== 'subdomain' && entry[0] !== 'id') {
    acc[entry[0]] = entry[1];
  }

  return acc;
}, {});

program.parse(process.argv);

// Get GitHub user
// program
//   .command('retrieve')
//   .alias('r')
//   .description('Retrieve a GitHub user')
//   .action(async () => {
//     const { username } = await inquirer.prompt(githubQuestions);
//     await getUser(username);
//   });
