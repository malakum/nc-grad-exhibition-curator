//import Error from "next/error";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MuseumObjectCard from "../src/components/MuseumObjectCard";
//import ArtworkCard from "../components/ArtworkCard";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";

export default function Favourites() {
  //use Atom
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if(!favouritesList) return null;

  if (favouritesList) {
    if (favouritesList?.length == 0) {
      //if favourite List is Empty
      return (
        <>
          <Row className="gy-4">
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                <br />
                Try searching for something else
              </Card.Body>
            </Card>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Row className="gy-4">
            {favouritesList?.map((currentObjectID, index) => (
              <Col lg={3} key={currentObjectID}>
                {/* <ArtworkCard objectID={currentObjectID} /> */}
               < MuseumObjectCard objectID={currentObjectID} />
              </Col>
            ))}
          </Row>
        </>
      );
    }
  } else {
    return (
      <>
      <p> error </p>
        {/* <Error statusCode={404} /> */}
      </>
    );
  }
}
