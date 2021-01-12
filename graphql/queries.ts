import { gql } from "@apollo/client";

export const GET_REPOS = gql`
query { 
  organization(login:"intuit") { 
		name
    repositories(first:30){
      edges{
        node{
          owner{
            login
            avatarUrl
          }
          id
          name
          description
          issues(first:30) {
            edges{
              node{
                id
                body
                bodyText
                author{
                  login
                }
                
              }
            }
          }
        }
      }
    }
  }
}`