import React, { useContext, useEffect, useState } from "react";
import NavComponent from "../Components/NavComponent";
import { Button, Container, Modal } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Stats from "../Components/Stats";
import StatsName from "../Components/StatsName";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addNames,
  closeModal,
  concatList,
  createTournament,
} from "../store/tournamentSlice";

const ProfilePage = (props, { concatList, createTournament, closeModal }) => {
  useEffect(() => {
    const data = localStorage.getItem("players");
    const data1 = localStorage.getItem("tournament");

    if (data && data1) {
      concatList(JSON.parse(data));
      createTournament(JSON.parse(data1));
      closeModal();
    }
  }, []);

  const { auth, firestore, storage } = useContext(Context);
  const [user] = useAuthState(auth);
  const [stats] = useCollectionData(
    firestore.collection(`stats-${user.uid}`).orderBy("uid")
  );

  const [avatar, setAvatar] = useState(null);
  const uploadImage = async (e) => {
    if (avatar === null) return;
    else {
      const imgRef = ref(storage, `avatar-${user.uid}/avatar`);
      await uploadBytes(imgRef, avatar).then(() => console.log("Uploaded"));
      getDownloadURL(imgRef).then((url) => {
        firestore.collection(`stats-${user.uid}`).doc("statistic").update({
          avatar: url,
        });
      });
      handleClose();
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavComponent />
      <Container>
        <div className="d-flex justify-content-start mt-5 bg-profileBg rounded-3">
          <div className="d-flex justify-content-center align-items-center">
            {stats?.map((st) => {
              return (
                <img
                  src={st.avatar}
                  key={st.uid}
                  className="profileImage mx-2"
                  alt=""
                />
              );
            })}
          </div>
          <div>
            <div className="d-flex flex-column py-3 mx-3">
              <Link to="/edit" className="text-decoration-none">
                <span className="fs-4" style={{ cursor: "pointer" }}>
                  ✎
                </span>
              </Link>
              {stats?.map((st) => {
                return <StatsName stats={st} key={st.uid}></StatsName>;
              })}
            </div>
          </div>
        </div>
        <>
          <Button
            variant="outline-dark"
            className="mx-5 my-2"
            onClick={handleShow}
          >
            Change avatar
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Change avatar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <Button onClick={uploadImage} variant="success">
                Confirm image
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <h6 className="text-center text-danger">
                After pressing button image will update
              </h6>
            </Modal.Footer>
          </Modal>
        </>
        {stats?.map((st) => {
          return <Stats stats={st} key={st.uid}></Stats>;
        })}
      </Container>
    </>
  );
};

const mapDispatchToProps = {
  addNames,
  concatList,
  createTournament,
  closeModal,
};

export default connect(null, mapDispatchToProps)(ProfilePage);
