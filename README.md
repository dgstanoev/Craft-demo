## NodeJS CLI
### Command line interface for creating and updating FreshDesk contacts. 

#### Dependencies: Mongoose, Commander.js, Inquirer.js, dotenv and axios.

Version
1.0.0

### Usage

1. Install the dependencies
`npm install`


2. Create Symlink
`npm link`

3. Create a `.env` file in the base of the project with the following contents:

```
FRESHDESK_TOKEN=
MONGO_URI=
```


4. Make use of the following commands to explore the CLI 

   - Fetch a FreshDesk contact `challenge fetch` or `challenge f`


   - List FreshDesk contacts `challenge list` or `challenge l`


   - Create FreshDesk contact `challenge create` or `challenge c`


   - Update FreshDesk contact `challenge update` or `challenge u`