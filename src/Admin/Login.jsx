import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginPath, LoginPost } from "../helper/requestList";
import Logo from "../assets/images/logo.png";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { storePermissionsData } from "../redux/permissions/PermActions";

import { UseAuth } from "../_context/auth";
import { CircularProgress } from "@material-ui/core";
import Services from "../helper/http";

// backgrounds
import BG1 from "../assets/images/login/1.jpg";
import BG2 from "../assets/images/login/2.jpg";
import BG3 from "../assets/images/login/3.jpg";
import BG4 from "../assets/images/login/4.jpg";
import BG5 from "../assets/images/login/5.jpg";
import { LuClipboardSignature } from "react-icons/lu";

const Login = (props) => {
  const bgArray = [BG1, BG2, BG3, BG4, BG5];
  const services = new Services();
  // const token = getAccessToken();
  const { setAuthTokens } = UseAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [wait, setWait] = useState(false);

  const history = useHistory();

  //redux
  const dispatch = useDispatch();
  return (
    <section
      className={`login`}
      style={{
        backgroundImage: `url(${
          bgArray[Math.floor(Math.random() * bgArray.length)]
        })`,
      }}
    >
      {/* <Splash withoutLabel /> */}
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto" style={{ maxWidth: "500px" }}>
            <div className="card" style={{ zIndex: "1" }}>
              <div className="card-body">
                {/* <img src={Logo} alt="logo" width={130} /> */}
                <LuClipboardSignature size={80} color="#FFF" />
                <p className="mt-1 mb-0">سامانه مدیریت تسهیلات</p>
                <div className="">شرکت پارس تکنولوژی سداد</div>
                <hr className="mt-3" />
                <Formik
                  initialValues={{
                    userName: "",
                    password: "",
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    setAuthTokens("");
                    setWait(true);
                    let status = "";
                    services
                      .post(LoginPost, {
                        username: values.userName,
                        password: values.password,
                      })
                      .then((res) => {
                        console.log(res, res.isSuccess);
                        if (res.isSuccess) {
                          // console.log(res);
                          setAuthTokens(res.token);
                          localStorage.setItem(
                            "token",
                            "bearer " + res.data.token
                          );
                          localStorage.setItem(
                            "user",
                            JSON.stringify(res.data.user)
                          );
                          localStorage.setItem(
                            "res",
                            JSON.stringify(res.data.role)
                          );
                          dispatch(storePermissionsData(res.data.role));
                          history.push("/admin/users");
                          setLoggedIn(true);
                        } else {
                          toast.error(res.message, {
                            position: toast.POSITION.TOP_CENTER,
                          });
                          setWait(false);
                          setLoggedIn(false);
                        }
                      })
                      .catch((err) => {
                        setWait(false);
                        toast.error("خطای اتصال به سرور", {
                          position: toast.POSITION.TOP_CENTER,
                        });
                      });
                    // setAuthTokens("dsfsdfsdfsdfwerfz");
                    // // history.push("/admin/foods");
                  }}
                  validationSchema={Yup.object({
                    userName: Yup.string().required(
                      "نام کاربری خود را وارد ننموده‌اید"
                    ),
                    password: Yup.string().required(
                      "کلمه خود را وارد ننموده اید"
                    ),
                  })}
                >
                  {(formik, isSubmitting) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="name">نام کاربری</label>
                        <Field
                          name="userName"
                          className={
                            formik.touched.userName && formik.errors.userName
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          type="text"
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                          <div className="invalid-feedback">
                            {formik.errors.userName}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">کلمه عبور</label>
                        <Field
                          name="password"
                          className={
                            formik.touched.password && formik.errors.password
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          type="password"
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div className="invalid-feedback">
                            {formik.errors.password}
                          </div>
                        ) : null}
                      </div>
                      <button
                        type="submit"
                        // onClick={submitLogin}
                        disabled={wait}
                        className="btn btn-primary pl-2 pr-2 col-md-4 col-6"
                      >
                        {wait ? (
                          <CircularProgress
                            size={20}
                            style={{ color: "#fff" }}
                          />
                        ) : (
                          "ورود"
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              <p
                className="text-center m-0"
                style={{ color: "white", fontSize: "10px", fontWeight: "200" }}
              >
                ‌کلیه‌ی حقوق محفوظ می‌باشد
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
