import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {getAllPortfolios} from '../modules/Portfolio/_redux/portfolios/portfoliosCrud';
import { Image, Transformation } from 'cloudinary-react';
import { Button, Modal } from 'react-bootstrap';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.tag}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Image
              cloudName="tobilasinde"
              publicId={props.data.public_id}
              className="thumbnail inline"
              width="100%"
          >
              <Transformation quality="auto" fetchFormat="auto" />
          </Image>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function DashboardPage() {
  const classes = useStyles();
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [tileData, setTileData] = useState([]);
  useEffect(() => {
    // server call for getting Portfolio by id
    getAllPortfolios().then(res => {
      setTileData(res.data.data)
    })
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} spacing={1} className={classes.gridList}>
        {tileData.map(tile => (
          <GridListTile key={tile.id} cols={tile.featured ? 3 : 1} rows={tile.featured ? 3 : 1}>
          <span variant="primary" onClick={() => {
            setModalData(tile);
            setModalShow(true);
          }}>
          <Image
              cloudName="tobilasinde"
              publicId={tile.public_id}
              className="thumbnail inline"
          >
              <Transformation quality="auto" fetchFormat="auto" />
          </Image>
            {/* <img src={tile.img} alt={tile.title} /> */}
            <GridListTileBar
              title={tile.tag}
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={`star ${tile.tag}`} className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
            </span>
          </GridListTile>
        ))}
      </GridList>
      <MyVerticallyCenteredModal
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
