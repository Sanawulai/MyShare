import React, { useEffect, useState } from "react";
import TopNav from "../utils/pagenav";
import ProfileNav from "../utils/ProfileBar";
import LoaderView from "../utils/loaderView";
import { useDispatch, useSelector } from "react-redux";
import CatTemplete from "./categTemplete";
import { Checkhover } from "../utils/responsehover";
import { Avatar, IconButton, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PushSpinner } from "react-spinners-kit";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CheckTopp } from "../utils/reuseable";
import { UpdatePass, updateAccount } from "../../store/actions/adminActions";
import MobileNav from "../utils/mobileNav";
import { List, XLg } from "react-bootstrap-icons";
import { getCourses } from "../../store/actions/datacollection";

const UserNotification = () => {
  const dispatch = useDispatch();
  const Checkuser = useSelector((item) => item.authuser);
  const navigate = useNavigate();

  const [myid, setmyid] = useState("");
  const [fn, setfn] = useState("");
  const [ln, setln] = useState("");
  const [email, setemail] = useState("");

  useEffect(() => {

    if (Checkuser) {
      if (Checkuser.account) {
        setmyid(Checkuser.account._id);
        setfn(Checkuser.account.firstname);
        setln(Checkuser.account.lastname);
        setemail(Checkuser.account.email)
      }
    }
  
  });
  const notifications = useSelector((value) => value.notification);
  useEffect(() => {
    if (notifications && notifications.notice) {
      setloadbtn(false);
    }
  });
  useEffect(() => {
    CheckTopp();
  });

  
  useEffect(()=>{
    dispatch(
      getCourses()
    )
  },[dispatch])


  const Formik = useFormik({
    initialValues: {
      oldpass: "",
      newpass: "",
      comfirmpass: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      oldpass: Yup.string().required("field required"),
      newpass: Yup.string().required("field required"),
      comfirmpass: Yup.string().required("field required"),
    }),
    onSubmit: (value) => {
      setloadbtn(true);
      dispatch(UpdatePass(value, myid));
    },
  });

  const [loading, setload] = useState(true);
  const [loadingbtn, setloadbtn] = useState(false);

  const [alertProfile, setprofile] = useState(false);
  const [cat, setcat] = useState(false);
  const [catsub, setsub] = useState(false);
  useEffect(() => {
    if (Checkuser) {
      if (Checkuser.auth !== null) {
        if (!Checkuser.auth) {
          navigate("/");
        }
        setload(false);
      }
    }
  }, [Checkuser]);
  useEffect(() => {
    Checkhover(setcat, setsub);
  });
  const location = useSelector((item) => item.geodetails);
  const [showmennu, setmenu] = useState(false);

  return (
    <>
      {" "}
      {loading ? (
        <LoaderView />
      ) : (
        <>
        {
      showmennu ?
      <div
        className="mainmenu"
        style={{ minHeight: `${window.innerHeight + 100}px` ,width:`${window.innerWidth}px`}}
      >
        <div
          className="menu_left"
          style={{ minHeight: `${window.innerHeight }px` }}
        >
           <div className="profile_cont">
                    <span
                      className="p_span"
                     
                      onClick={() => navigate("/user")}
                    >
                      Profile
                    </span>
                    <span
                      className="p_span"
                      onClick={() => navigate("/user/myaccount/accountsettings")}
                    >
                      Account Settings
                    </span>
                    <span
                      className="p_span"
                      style={{ backgroundColor: "rgb(133, 127, 127)" }}
                      onClick={() => navigate("/user/myaccount/notifications")}
                    >
                      My Notifications
                    </span>
                   
                    {
                      location &&   location.GEOD.blockrate >0 ? 
                  
                      <>
                      <span className="p_span">My Following</span>
                      <span className="p_span" >My Purchases</span>
                    <span className="p_span">My Wishlist</span>
                    <span className="p_span"   onClick={() => navigate("/user/myaccount/cart")}>My Cart</span>

                      </>
:null
                      
                    }
                    
                  </div>
   
         
      
        </div>
        <div
          className="menu_right"
          style={{ minHeight: `${window.innerHeight }px` }}
        >
     
            <span  className="menu_right_span"><IconButton
            onClick={()=>{
              setmenu(false)
            
            }}><XLg color="white" size={25}/> </IconButton></span>
        </div>
      </div> 
      :null
    }


          {cat ? <CatTemplete catsub={catsub} /> : null}
          {alertProfile ? <ProfileNav /> : null}
          <div
            className="profilecontainer"
            style={{ minHeight: `${window.innerHeight}px` }}
          >
         <div className="desktopNav">
                        <TopNav setprofile={setprofile} fn={fn ? fn : "NA"}  ln={ln ? ln :"NA" } email={email}/>
            </div>
            <div className="mobiletopNav">    
  <MobileNav   setprofile={setprofile} fn={fn} ln={ln} email={email} /></div>
            <div className="box_layout">
            <div className="mobiletopNav"><IconButton  
            onClick={()=>setmenu(true)}
             >
                <List color="black" size={30}/> 
                </IconButton> 
                </div>
              <div className="profile_box">
                <div className="profile_b_nav">
                  <div className="profile_rev">
                    <Avatar
                      style={{
                        width: "70px",
                        height: "70px",
                        paddingBottom: "5px",
                      }}
                    />
                     <p>{fn} {ln}</p>
                  </div>
                  <div className="profile_cont">
                    <span
                      className="p_span"
                      onClick={() => {
                        navigate("/user");
                      }}
                    >
                      Profile
                    </span>
                    <span
                      className="p_span"
                      onClick={() => navigate("/user/myaccount/accountsettings")}
                      
                    >
                      Account Settings
                    </span>
                    <span className="p_span" style={{ backgroundColor: "rgb(133, 127, 127)" }}>My Notifications</span>
                    {
                      location &&   location.GEOD.blockrate >0 ? 
                  
                      <>
                      <span className="p_span">My Following</span>
                      <span className="p_span" >My Purchases</span>
                    <span className="p_span">My Wishlist</span>
                    <span className="p_span"   onClick={() => navigate("/user/myaccount/cart")}>My Cart</span>

                      </>
:null
                      
                    }  
                  </div>
                </div>

                <div className="profile_box_m">
                  <div className="profile_header">
                    <h1 style={{marginTop:"5px"}}>My Activities and notifications</h1>
                    <p>Monitor your activities</p>
                  </div>
                  <div className="notification_form">
                  <p>No Activities now</p>


                  </div>
                </div>
              </div>
            </div>

            <div className="footer">
              <div className="frontitemhover">
                <p>
                   Powered By Badu Technologies. All rights reserved
                  <span style={{ color: "green" }}> @ </span> 2023
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserNotification;
