export enum TypeName {
    single= "single",
    list= "list",
}

export enum Node {
    repository = "repository",
      issues = "issues",
      issue = "issue",
      stargazers= "stargazers",
      stargazer= "stargazer",
      watcher= "watcher",
      watchers= "watchers",
}

export const NodeArraySingle = [
      "issue",
      "stargazer",
      "watcher"
    ]

export const NodeArrayList = [
      "issues",
     "stargazers",
      "watchers" 
    ]