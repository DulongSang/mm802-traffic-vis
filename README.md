# MM802 Winter2024 Final Project

## Group members
- Dulong Sang: dulong
- Mingwei Lu: mlu1


## Front-end
Please refer to [`frontend/README.md`](frontend/README.md).


## Back-end
Please refer to [`backend/README.md`](backend/README.md).


## Contribution Guidelines

### Commit

We use [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) as the project commit specification.

The commit message should be structured as follows:
```
<type>[optional scope]: <description>

[optional body]
```

The following *type*s are generally used: `feat`, `fix`, `chore`, `docs`, `test`

An example of the commit message would be:
```
feat: allow provided config object to extend other configs
```

### Pull Request (PR)

- All changes should be merged via a PR, please use the 'squash and merge' or 'rebase and merge' to keep a linear history.

- When creating a PR, please ensure that the branch name is descriptive and easy to understand, e.g. `user-input-validaton`.

```bash
git checkout -b '<new-branch-name>'
git commit ...
git push -u origin '<new-branch-name>'
```

- When updating a PR, make sure it is rebased on top of most recent `main`.

```bash
git fetch
git rebase origin/main
git push -f
```

# Reference

## Packages

- [typescript](https://github.com/microsoft/TypeScript)
- [react](https://github.com/facebook/react)
- [react-scripts](https://github.com/facebook/create-react-app)
- [d3](https://github.com/d3/d3)
- [material-ui](https://github.com/mui/material-ui)
- [creativetimofficial/material-dashboard-react](https://github.com/creativetimofficial/material-dashboard-react?tab=readme-ov-file)
