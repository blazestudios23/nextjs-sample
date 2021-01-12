import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row,
} from "reactstrap";
import Link from "next/link";
import { Node, TypeName } from "../utils/types";
import { Organization } from "../generated/graphql";

interface Props {
  repos: Organization["repositories"]["edges"];
}

const SearchResults = (props: Props) => (
  <Row>
    {props.repos.map(({ node }) => (
      <Col sm="4" key={node.id}>
        {console.log(
          `/${node.name}/${TypeName.single}/${Node.repository}/${node.name}`
        )}

        <Link
          href={`/${node.name}/${TypeName.single}/${Node.repository}/${node.name}`}
        >
          <Card body>
            <CardImg
              width="100%"
              src={node.owner.avatarUrl}
              alt={node.owner.login}
            />
            <CardBody>
              <CardTitle tag="h5">{node.name}</CardTitle>

              <CardText>{node.description}</CardText>
              <Button>View Repo</Button>
            </CardBody>
          </Card>
        </Link>
      </Col>
    ))}
  </Row>
);

export default SearchResults;
