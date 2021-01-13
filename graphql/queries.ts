import { gql } from "@apollo/client";

export const GET_REPOS = gql`
query { 
  organization(login:"intuit") { 
		name
    repositories(first:30){
      edges{
        node{
          owner{
              id
            login
            avatarUrl
          }
          id
          name
          description
          forks(first:30){
            edges{
              node{
                  id
                name
              }
            }
          }
          forkCount
          issues(first:30) {
            totalCount
            edges{
              node{
                id
                body
                bodyText

                
              }
            }
          }
          
          stargazers(first:30){
            edges{
              node{
                id
                name
                login
                company
                location
                bio
              }
            }
          }
          stargazerCount
          watchers(first:30){
            edges{
              node{
                  id
                name
                login
                company
                location
                bio
              }
            }
          }
        }
      }
    }
  }
}`