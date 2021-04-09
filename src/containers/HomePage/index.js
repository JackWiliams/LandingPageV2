import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  ThunderboltFilled,
  LayoutFilled,
  FireFilled,
  ArrowRightOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import bootstrap from "./../../styles/pages/homepage/bootstrap-4.5.0.min.css";
import Particles from "react-particles-js";

const HomePage = () => {
  const history = useHistory();
  //   const token = useSelector(({ auth }) => auth.token);
  const myRef = React.useRef();

  const handleScroll = () => {
    const scrollTop = myRef.current.scrollTop;

    let el = document.getElementById("nav-bar");

    if (scrollTop > 150) {
      el.classList.add("sticky");
    } else el.classList.remove("sticky");
  };

  const handleSignIn = () => {
    history.push("/auth/signin");
  };

  return (
    <div id="ld-homepage" onScroll={handleScroll} ref={myRef}>
      {/* header */}
      <header className="header-area">
        <div id="nav-bar" className="navbar-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav className="navbar navbar-expand-lg">
                  <a className="navbar-brand" href="index.html">
                    <img
                      src={require("./../../assets/images/logo.png")}
                      alt="Logo"
                    />
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse sub-menu-bar"
                    id="navbarSupportedContent"
                  >
                    <ul id="nav" className="navbar-nav ml-auto">
                      <li className="nav-item active">
                        <a className="page-scroll" href="#">
                          <b> Home</b>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="page-scroll"
                          onClick={() => history.push("/templates")}
                        >
                          <b>Templates</b>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#">
                          <b> Price</b>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#">
                          <b> About us</b>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#">
                          <b> Support</b>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="navbar-btn d-none d-sm-inline-block">
                    <a
                      className="main-btn"
                      data-scroll-nav="0"
                      rel="nofollow"
                      onClick={handleSignIn}
                    >
                      Sign in
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div id="home" className="header-hero bg_cover ld-bg-banner">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="header-hero-content text-center">
                  <h4
                    className="header-sub-title wow fadeInUp"
                    data-wow-duration="1.3s"
                    data-wow-delay="0.2s"
                  >
                    Hi! We are <b>Civi Landing Page</b>
                  </h4>
                  <h2
                    className="header-title wow fadeInUp"
                    data-wow-duration="1.3s"
                    data-wow-delay="0.5s"
                  >
                    We Help You To Start Your Project
                  </h2>
                  <p
                    className="text wow fadeInUp"
                    style={{ fontSize: 18 }}
                    data-wow-duration="1.3s"
                    data-wow-delay="0.8s"
                  >
                    Discover the platform that gives you the freedom to create,
                    design, manage and develop your web presence exactly the way
                    you want.
                  </p>
                  <a
                    onClick={() => history.push("/templates")}
                    className="main-btn wow fadeInUp "
                    data-wow-duration="1.3s"
                    data-wow-delay="1.1s"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="header-hero-image text-center wow fadeIn"
                  data-wow-duration="1.3s"
                  data-wow-delay="1.4s"
                >
                  <img
                    src={require("./../../assets/images/homepage/header-hero.png")}
                    alt="hero"
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="particles-1" className="particles">
            <Particles
              // className="particles"
              // id="particles-1"
              params={{
                particles: {
                  number: {
                    value: 40,
                    density: {
                      enable: !0,
                      value_area: 4000,
                    },
                  },
                  color: {
                    value: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
                  },
                  shape: {
                    type: "circle",
                    stroke: {
                      width: 0,
                      color: "#fff",
                    },
                    polygon: {
                      nb_sides: 5,
                    },
                    image: {
                      src: "img/github.svg",
                      width: 33,
                      height: 33,
                    },
                  },
                  opacity: {
                    value: 0.15,
                    random: !0,
                    anim: {
                      enable: !0,
                      speed: 0.2,
                      opacity_min: 0.15,
                      sync: !1,
                    },
                  },
                  size: {
                    value: 50,
                    random: !0,
                    anim: {
                      enable: !0,
                      speed: 2,
                      size_min: 5,
                      sync: !1,
                    },
                  },
                  line_linked: {
                    enable: !1,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1,
                  },
                  move: {
                    enable: !0,
                    speed: 1,
                    direction: "top",
                    random: !0,
                    straight: !1,
                    out_mode: "out",
                    bounce: !1,
                    attract: {
                      enable: !1,
                      rotateX: 600,
                      rotateY: 600,
                    },
                  },
                },
                interactivity: {
                  detect_on: "canvas",
                  events: {
                    onhover: {
                      enable: !1,
                      mode: "bubble",
                    },
                    onclick: {
                      enable: !1,
                      mode: "repulse",
                    },
                    resize: !0,
                  },
                  modes: {
                    grab: {
                      distance: 400,
                      line_linked: {
                        opacity: 1,
                      },
                    },
                    bubble: {
                      distance: 250,
                      size: 0,
                      duration: 2,
                      opacity: 0,
                      speed: 3,
                    },
                    repulse: {
                      distance: 400,
                      duration: 0.4,
                    },
                    push: {
                      particles_nb: 4,
                    },
                    remove: {
                      particles_nb: 2,
                    },
                  },
                },
                retina_detect: !0,
              }}
            />
          </div>
        </div>
      </header>

      <div className="brand-area pt-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <b>
                  {" "}
                  Trusted by the world’s most innovative businesses – big and
                  small
                </b>
              </div>
              <div className="brand-logo d-flex align-items-center justify-content-center justify-content-md-between">
                <div
                  className="single-logo mt-30 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.2s"
                >
                  <img
                    src={require("./../../assets/images/homepage/brand-1.png")}
                    alt="brand"
                  />
                </div>
                <div
                  className="single-logo mt-30 wow fadeIn"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.2s"
                >
                  <img
                    src={require("./../../assets/images/homepage/brand-2.png")}
                    alt="brand"
                  />
                </div>
                <div
                  className="single-logo mt-30 wow fadeIn"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.3s"
                >
                  <img
                    src={require("./../../assets/images/homepage/brand-3.png")}
                    alt="brand"
                  />
                </div>
                <div
                  className="single-logo mt-30 wow fadeIn"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.4s"
                >
                  <img
                    src={require("./../../assets/images/homepage/brand-4.png")}
                    alt="brand"
                  />
                </div>
                <div
                  className="single-logo mt-30 wow fadeIn"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.5s"
                >
                  <img
                    src={require("./../../assets/images/homepage/brand-5.png")}
                    alt="brand"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="features" className="services-area pt-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 d-flex justify-content-center">
              <div className="section-title text-center pb-40">
                <div className="line m-auto"></div>
                <h3 className="title">
                  Create A Beautiful Landing Page In Minute Not Weeks
                </h3>
                <span>
                  This should be used to tell a story and let your users know a
                  little more about your product or service
                </span>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-7 col-sm-8">
              <div
                className="single-services text-center mt-30 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.2s"
              >
                <div className="services-icon">
                  <img
                    className="shape"
                    src={require("./../../assets/images/homepage/services-shape.svg")}
                    alt="shape"
                  />
                  <img
                    className="shape-1"
                    src={require("./../../assets/images/homepage/services-shape-1.svg")}
                    alt="shape"
                  />
                  <LayoutFilled />
                </div>
                <div className="services-content mt-30">
                  <h4 className="services-title">
                    <a href="#">Simple</a>
                  </h4>
                  <p className="text">
                    Anyone can easily create a beautiful Landing Page quickly,
                    with no programming required.
                  </p>
                  {/* <a className="more" href="#">
                    Learn More <i className="lni lni-chevron-right"></i>
                  </a> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-7 col-sm-8">
              <div
                className="single-services text-center mt-30 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <div className="services-icon">
                  <img
                    className="shape"
                    src={require("./../../assets/images/homepage/services-shape.svg")}
                    alt="shape"
                  />
                  <img
                    className="shape-1"
                    src={require("./../../assets/images/homepage/services-shape-2.svg")}
                    alt="shape"
                  />
                  <FireFilled />
                </div>
                <div className="services-content mt-30">
                  <h4 className="services-title">
                    <a href="#">Powerful</a>
                  </h4>
                  <p className="text">
                    Flexible drag-and-drop technology gives you unlimited
                    creativity when designing Landing Page content.
                  </p>
                  {/* <a className="more" href="#">
                    Learn More <i className="lni lni-chevron-right"></i>
                  </a> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-7 col-sm-8">
              <div
                className="single-services text-center mt-30 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.8s"
              >
                <div className="services-icon">
                  <img
                    className="shape"
                    src={require("./../../assets/images/homepage/services-shape.svg")}
                    alt="shape"
                  />
                  <img
                    className="shape-1"
                    src={require("./../../assets/images/homepage/services-shape-3.svg")}
                    alt="shape"
                  />
                  {/* <i className="icon icon-fast-forward" /> */}
                  <ThunderboltFilled />
                </div>
                <div className="services-content mt-30">
                  <h4 className="services-title">
                    <a href="#">Fast</a>
                  </h4>
                  <p className="text">
                    You just need 5 minutes to create a wonderful landing page
                    with full features.
                  </p>
                  {/* <a className="more" href="#">
                    Learn More <i className="lni lni-chevron-right"></i>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" className="footer-area pt-120">
        <div className="container ">
          <div
            className="subscribe-area wow fadeIn five-minutes"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <div className="five-min-title">Just 5 minutes editing</div>
            <div className="five-min-text">
              You'll have a beautiful landing page.
            </div>
            <button
              className="main-btn getting-started-btn five-min-btn"
              onClick={() => history.push("/templates")}
            >
              Get started <ArrowRightOutlined className="icon-arrow" />
            </button>
            {/* <div className="row">
              <div className="col-lg-12">
                <div className="subscribe-content mt-45">
                  <h2 className="subscribe-title">
                    Subscribe Our Newsletter <span>get reguler updates</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="subscribe-form mt-50">
                  <form action="#">
                    <input type="text" placeholder="Enter eamil" />
                    <button className="main-btn">Subscribe</button>
                  </form>
                </div>
              </div>
            </div> */}
          </div>
          <div id="about-us" className="footer-widget pb-100">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-8">
                <div
                  className="footer-about mt-50 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.2s"
                >
                  <a className="logo" href="#">
                    <img
                      src={require("./../../assets/images/logo.png")}
                      alt="logo"
                    />
                  </a>
                  <p className="text">
                    Lorem ipsum dolor sit amet consetetur sadipscing elitr,
                    sederfs diam nonumy eirmod tempor invidunt ut labore et
                    dolore magna aliquyam.
                  </p>
                  <ul className="social">
                    <li>
                      <a href="#">
                        <i className="lni lni-facebook-filled"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="lni lni-twitter-filled"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="lni lni-instagram-filled"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="lni lni-linkedin-original"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-5 col-md-7 col-sm-7">
                <div className="footer-link d-flex mt-50 justify-content-md-between">
                  <div
                    className="link-wrapper wow fadeIn"
                    data-wow-duration="1s"
                    data-wow-delay="0.4s"
                  >
                    <div className="footer-title">
                      <h4 className="title">Quick Link</h4>
                    </div>
                    <ul className="link">
                      <li>
                        <a href="#">Road Map</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#">Refund Policy</a>
                      </li>
                      <li>
                        <a href="#">Terms of Service</a>
                      </li>
                      <li>
                        <a href="#">Pricing</a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="link-wrapper wow fadeIn"
                    data-wow-duration="1s"
                    data-wow-delay="0.6s"
                  >
                    <div className="footer-title">
                      <h4 className="title">Resources</h4>
                    </div>
                    <ul className="link">
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">Page</a>
                      </li>
                      <li>
                        <a href="#">Portfolio</a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-5 col-sm-5">
                <div
                  className="footer-contact mt-50 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.8s"
                >
                  <div className="footer-title">
                    <h4 className="title">Contact Us</h4>
                  </div>
                  <ul className="contact">
                    <li>+809272561823</li>
                    <li>info@gmail.com</li>
                    <li>www.yourweb.com</li>
                    <li>
                      123 Stree New York City , United <br />
                      States Of America 750.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a href="#" className="back-to-top">
        <i className="lni lni-chevron-up"></i>
      </a>
    </div>
  );
};

export default HomePage;
