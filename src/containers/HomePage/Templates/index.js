import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Button, message } from "antd";
import {
  ArrowRightOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import bootstrap from "./../../../styles/pages/homepage/bootstrap-4.5.0.min.css";
import { statusCode } from "../../../constants/StatusCode";
import { getAllLandingTemplate } from "../../../appRedux/actions/LandingTemplate";

const Templates = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(({ auth }) => auth.token);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [isPreview, setIsPreview] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState(null);
  const [titlePreview, setTitlePreview] = useState("Preview");
  const [listTemplates, setListTemplates] = useState([]);

  const onClickUseTemplate = (item) => {
    if (token === null) {
      history.push("/auth/signin");
    } else {
      history.push("landing-pages/templates");
    }
  };

  const onClickPreview = (item) => {
    setIsPreview(true);
    setHtmlPreview(item.html_preview);
    setTitlePreview(item.template_name);
  };

  const content = listTemplates.map((item) => (
    <Col key={item._id} xxl={8} xl={8} lg={8} md={14} sm={16} xs={24}>
      <div className="gx-card ld-templates-item">
        <div className="ld-templates-item-img">
          <img id="img-wrap" src={item.imgSrc} />
          <div id="btn-group" className="ld-templates-item-action">
            <Button
              className="ld-btn-fill"
              onClick={() => onClickUseTemplate(item)}
            >
              <EditOutlined /> Use
            </Button>
            <Button
              className="ld-btn-fill"
              onClick={() => onClickPreview(item)}
            >
              <EyeOutlined />
              Preview
            </Button>
          </div>
        </div>
        <div className="ld-templates-item-name">{item.template_name}</div>
      </div>
    </Col>
  ));

  useEffect(() => {
    dispatch(
      getAllLandingTemplate("", "", page, size, (status, data) => {
        if (status === statusCode.Success) {
          setListTemplates(data);
        } else {
          message.error("Error when getting landing templates list !");
        }
      })
    );
  }, [size, page]);

  return (
    <div id="ld-homepage">
      {/* header */}
      <header className="header-area">
        <div id="nav-bar" className="navbar-area sticky">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav className="navbar navbar-expand-lg">
                  <a className="navbar-brand" href="index.html">
                    <img
                      src={require("./../../../assets/images/logo.png")}
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
                      <li className="nav-item">
                        <a
                          className="page-scroll"
                          onClick={() => history.push("/homepage")}
                        >
                          <b> Home</b>
                        </a>
                      </li>
                      <li className="nav-item active">
                        <a className="page-scroll" href="#">
                          <b>Templates</b>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#">
                          <b> Price</b>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#about-us">
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
                      onClick={() => history.push("/auth/signin")}
                    >
                      Sign in
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="#" className="services-area pt-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 d-flex justify-content-center">
              <div className="section-title text-center pb-40">
                {/* <div className="line m-auto"></div> */}
                <h3 className="title">Pick your starting point.</h3>
                <span>
                  Get started with any of our best-in-class website templates
                  and customize it to fit your needs, whether it's contact forms
                  or color palettes. Making a beautiful website has never been
                  faster.
                </span>
              </div>
            </div>
          </div>
          <div className="row justify-content-center ld-templates-list">
            {content}
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
            <button className="main-btn getting-started-btn five-min-btn">
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
                      src={require("./../../../assets/images/logo.png")}
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

      {isPreview && (
        <div className="ld-preview-section ">
          <div className="ld-preview-header">
            <div className="ld-preview-title">Preview: {titlePreview}</div>
            <i
              title="Close preview"
              className="icon icon-close-circle ld-preview-close"
              onClick={() => setIsPreview(false)}
            ></i>
          </div>
          <iframe srcDoc={htmlPreview} className="ld-iframe-preview"></iframe>
        </div>
      )}
    </div>
  );
};

export default Templates;
