import React, { useContext, useState } from "react";
import NavComponent from "./NavComponent";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import userImage from "../assets/user.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Stats from "./Stats";
import StatsName from "./StatsName";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfilePage = () => {
  const { auth, firestore, firebase, storage } = useContext(Context);
  const [user] = useAuthState(auth);
  const [stats] = useCollectionData(
    firestore.collection(`stats-${user.uid}`).orderBy("uid")
  );

  const createCollection = async () => {
    firestore.collection(`stats-${user.uid}`).doc("statistic").set({
      uid: user.uid,
      matches: 0,
      win: 0,
      loss: 0,
      winRate: 0,
      age: 0,
      name: "",
      nickname: "",
      avatar: userImage,
    });
  };
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
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavComponent />
      <Container>
        <div className="d-flex justify-content-start mt-5 bg-profileBg">
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
              {stats?.map((st) => {
                return <StatsName stats={st} key={st.uid}></StatsName>;
              })}
            </div>
            <button onClick={createCollection}></button>
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

export default ProfilePage;
