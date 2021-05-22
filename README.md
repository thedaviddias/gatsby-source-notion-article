# Gatsby Source Notion Articles
[![CI](https://github.com/thedaviddias/gatsby-source-notion-article/actions/workflows/production.yml/badge.svg)](https://github.com/thedaviddias/gatsby-source-notion-article/actions/workflows/production.yml)
[![codecov](https://codecov.io/gh/thedaviddias/gatsby-source-notion-article/branch/main/graph/badge.svg?token=v51j0wzBSl)](https://codecov.io/gh/thedaviddias/gatsby-source-notion-article)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors-)<!-- ALL-CONTRIBUTORS-BADGE:END -->

> A Gatsby source plugin for importing articles made in Notion into your Gatsby application using Notion API.

⚠️ The Notion API being still in beta, some limitations may exist. Feel free to open a [discussion][discussion] or ask for a [new feature][newissue].

## Install

```sh
# using npm
npm install gatsby-source-notion-article

# using yarn
yarn add gatsby-source-notion-article
```

## How to configure

### 1. Create your integration

Create a [new integration][notionIntegration]. It will give you access to a token that will be used in Gatsby Source Notion Article.
Once it's created, copy your token and keep it for the next step.
### 2. Duplicate Notion database

Duplicate this [article database template][databaseTemplate] to ensure your articles follows the same format as this plugin. Don't forget to share this new database with the integration you just created.
### 3. Set your environment variables in a .env file

Create an .env file at the root of your Gatsby project. You can copy-paste the `.env.example` from this Github repository.

```sh
https://www.notion.so/myworkspace/a8aec43384f447ed84390e8e42c2e089?v=...
                                  |--------- Database ID --------|
```

```sh
NOTION_KEY=<your-notion-token>
NOTION_DATABASE_ID=<your-notion-database-id>
```

### 4. Add plugin to your gatsby config

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-notion-article`,
      options: {
        // Learn about environment variables: https://gatsby.dev/env-vars
        token: process.env.NOTION_KEY, // required
        databaseId: process.env.NOTION_DATABASE_ID, // required
        params: {
          page_size: 3, // optional, default is 100
          filter: {} // optional
          sort: {

          } // optional
        }
      }
    },
  ],
}
```

## Options


| Name               | Type    | Default | Description                                                                                                      |
|--------------------|---------|---------|------------------------------------------------------------------------------------------------------------------|
| `token`            | string  |         | [required] The `token` from Notion could be find on your integration                                             |
| `databaseId`       | string  |         | [required] The `databaseId` is the alphanumerical value following the name of your workspace in the sharing URL. |
| `params`           | object  |         | The `params` object                                                                                              |
| `params.page_size` | number  | 100     | How many articles you want Notion to query                                                                       |
| `params.filter`    | object  |         | An object with filters passed to Notion                                                                          |
| `params.sort`      | object  |         | An option with sort options passed to Notion                                                                     |
| `debug`            | boolean | false   | Enable the debug mode for Notion                                                                                 |
| `unsupported`      | boolean | false   | Shows in the body a message if the block is not supported. This can be enable only in development mode.          |

## Type of blocks currently supported

The Notion API being in beta, only some block elements are currently supported:

- Headings (1, 2, 3)
- Paragraphs
- Bullet and numbered list
- To do
- Toggle
- Child page

## How to query

## Get all articles from your notion database

```graphql
{
  allNotionArticles {
    edges {
      node {
        id
        title
        body
        createdAt
        updatedAt
      }
    }
  }
}
```

## Get an article from your notion database

```graphql
{
  notionArticles {
    id
    title
    body
    createdAt
    updatedAt
  }
}
```

## Examples

Check our [example project][sample] of the Gatsby plugin implementation.

```jsx
// Quick example
const Component = {
  const data = useStaticQuery(graphql`
    query Notion {
      notionArticles {
        body
      }
    }
  `);

  return (
    <div dangerouslySetInnerHTML={{ __html: data.notionArticles.body }} />
  );
};
```

## Contributing
If you've ever wanted to contribute to open source, and a great cause, now is your chance!

See the [contributing docs](./CONTRIBUTING.md) for more information.

Feel free to open a [discussion][discussion] if you have any question or suggestion in regards to this plugin.

## Contributors

Thanks goes to these wonderful people
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://thedaviddias.dev"><img src="https://avatars.githubusercontent.com/u/237229?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Dias</b></sub></a><br /><a href="https://github.com/thedaviddias/gatsby-source-notion-article/commits?author=thedaviddias" title="Code">💻</a> <a href="https://github.com/thedaviddias/gatsby-source-notion-article/commits?author=thedaviddias" title="Documentation">📖</a> <a href="#infra-thedaviddias" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/thedaviddias/gatsby-source-notion-article/commits?author=thedaviddias" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->


<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
## License

See [MIT Licence, 2021 David Dias](./LICENSE)

[notionDeveloper]: https://developers.notion.com/
[databaseTemplate]: https://www.notion.so/gatsbysourcenotionarticles/f105a175e01b437d85a7b433d637bf14
[notionIntegration]: https://www.notion.so/my-integrations
[notionIntegrationDoc]: https://developers.notion.com/docs/getting-started#create-a-new-integration
[discussion]: https://github.com/thedaviddias/gatsby-source-notion-article/discussions
[newissue]: https://github.com/thedaviddias/gatsby-source-notion-article/issues/new
[sample]: https://github.com/thedaviddias/gatsby-source-notion-article-sample
