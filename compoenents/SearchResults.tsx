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

interface Props {
  repos: [
    {
      id: number;
      name: string;
      owner: { login: string; avatar_url: string };
      description: string;
      url: string;
      created_at: string;
      updated_at: string;
      pushed_at: string;
      stargazers_count: string;
      watchers_count: string;
      has_issues: boolean;
    }
  ];
}

const SearchResults = (props: Props) => (
  <Row>
    {props.repos.map(i => (
      <Col sm="4" key={i.id}>
        <Link href={`repo/${i.name}`}>
          <Card body>
            <CardImg
              left
              width="100%"
              src={i.owner.avatar_url}
              alt={i.owner.login}
            />
            <CardBody>
              <CardTitle tag="h5">{i.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle>
              <CardText>{i.description}</CardText>
              <Button>View</Button>
            </CardBody>
          </Card>
        </Link>
      </Col>
    ))}
  </Row>
);

export default SearchResults;
