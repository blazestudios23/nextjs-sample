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
        <Link href={`repo/${TypeName.single}/${node.name}/0-root-repo`}>
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
