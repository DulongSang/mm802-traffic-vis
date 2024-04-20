# MM802 Winter2024 Final Project

## Group members
- Dulong Sang: dulong
- Mingwei Lu: mlu1
- Jenil Haresh Kanani: jenilhar


## Front-end
Please refer to [`frontend/README.md`](frontend/README.md).


## Back-end
Please refer to [`backend/README.md`](backend/README.md).


## Machine Learning `ml`
Please refer to [`ml/README.md`](ml/README.md).


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

## Dataset
- [Traffic Disruptions - Edmonton's Open Data Portal](https://data.edmonton.ca/Transportation/Traffic-Disruptions/k4tx-5k8p/data_preview)
