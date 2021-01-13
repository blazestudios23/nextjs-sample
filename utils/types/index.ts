export enum TypeName {
    single= "single",
    list= "list",
}

export enum Node {
  fork = "fork",
  forks = "forks",
  repository = "repository",
  issues = "issues",
  issue = "issue",
  owner = "owner",
  stargazers= "stargazers",
  stargazer= "stargazer",
  watcher= "watcher",
  watchers= "watchers",
}

export const NodeArraySingle = [
  Node.owner,
  Node.fork,
  Node.issue,
  Node.stargazer,
  Node.watcher
]

export const NodeArrayList = [
  Node.forks,
  Node.issues,
  Node.stargazers,
  Node.watchers 
  ]