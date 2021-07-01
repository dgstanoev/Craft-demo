import { config } from 'dotenv';
import axios from 'axios';
import { BASE_GITHUB_URL } from './constants/base-url.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDB from './db/db.js';
import Contact from './models/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { parsed: envVariables } = config({ path: __dirname + '/.env' });

connectDB();

export const getUser = async (username) => {
  try {
    const user = await axios.get(`${BASE_GITHUB_URL}/${username}`);
    // console.log(user.data);
    return user.data;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export const getContact = async (subdomain, id) => {
  try {
    const contact = await axios.get(
      `https://${subdomain}.freshdesk.com/api/v2/contacts/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${envVariables.FRESHDESK_TOKEN}`,
        },
      }
    );
    console.log(contact.data);

    const { name, email, address, description } = contact.data;
    await Contact.create({ name, email, address, description });
    mongoose.connection.close();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export const getContacts = async (subdomain) => {
  try {
    const contacts = await axios.get(
      `https://${subdomain}.freshdesk.com/api/v2/contacts/`,
      {
        headers: {
          Authorization: `Basic ${envVariables.FRESHDESK_TOKEN}`,
        },
      }
    );
    contacts.data.forEach(({ id, name, email, address, description }) =>
      console.log({ id, name, email, address, description })
    );
    process.exit(1);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export const createContact = async (subdomain, contactData) => {
  try {
    const newContact = await axios.post(
      `https://${subdomain}.freshdesk.com/api/v2/contacts`,
      contactData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${envVariables.FRESHDESK_TOKEN}`,
        },
      }
    );

    console.log(newContact.data);
    process.exit(1);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export const updateContact = async (subdomain, id, contactData) => {
  try {
    const updatedContact = await axios.put(
      `https://${subdomain}.freshdesk.com/api/v2/contacts/${id}`,
      contactData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${envVariables.FRESHDESK_TOKEN}`,
        },
      }
    );

    console.log(updatedContact.data);
    process.exit(1);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
