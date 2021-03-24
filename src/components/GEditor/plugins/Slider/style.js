export default `
.slide-home .shop-link {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  padding: 0 15px;
  height: 45px;
  -webkit-transform: perspective(1px) translateZ(0);
  -moz-transform: perspective(1px) translateZ(0);
  -ms-transform: perspective(1px) translateZ(0);
  -o-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  font-family: Raleway;
  border: none;
  font-weight: 500;
  overflow: hidden;
  color: white;
}

.slide-home .shop-link:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transform: scaleX(0);
  -moz-transform: scaleX(0);
  -ms-transform: scaleX(0);
  -o-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 50%;
  -moz-transform-origin: 50%;
  -ms-transform-origin: 50%;
  -o-transform-origin: 50%;
  transform-origin: 50%;
  background-color: #8528A3;
  -webkit-transition: transform .3s ease-out;
  -moz-transition: transform .3s ease-out;
  -ms-transition: transform .3s ease-out;
  -o-transition: transform .3s ease-out;
  transition: transform .3s ease-out;
  z-index: -1
}

.slide-home .shop-link:hover {
  color: #fff;
  border-color: #8528A3
}

.slide-home .shop-link:hover:before {
  -webkit-transform: scaleX(1);
  -moz-transform: scaleX(1);
  -ms-transform: scaleX(1);
  -o-transform: scaleX(1);
  transform: scaleX(1)
}

@media (min-width: 992px) and (max-width:1024px) {
  .slide-home {
      
  }

  .slide-home .caption {
      padding-left: 80px
  }
}

@media (min-width: 992px) {
  .slide-home {
      position: relative;
      background-color: #eee;
  }

  .slide-home {
      padding-left: 0
  }

  .slide-home:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 55px;
      background-color: #f3f3f3
  }
}

.slick-dots {
  margin: 0;
  list-style: none;
  padding: 0
}

.slick-dots li {
  position: relative;
  display: inline-block;
  margin: 0 6px;
  zoom:1;vertical-align: middle
}

.slick-dots li.slick-active button {
  width: 15px;
  height: 15px;
  border: 2px solid #8528A3;
  background: 0 0
}

.slick-dots button {
  display: block;
  padding: 0;
  width: 6px;
  height: 6px;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  text-indent: -1000em;
  overflow: hidden;
  -webkit-backface-visibility: visible;
  background-color: #aaa
}

.slide-home {
  position: relative;
  overflow: hidden
}

.slide-home:hover .slick-arrow {
  opacity: 1;
  visibility: visible
}

.slide-home img {
  width: 100%;
  display: inline-block
}

.slide-home .slick-arrow {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 10;
  font-size: 30px;
  color: #777;
  opacity: 0;
  visibility: hidden
}

.slide-home .slick-arrow:hover {
  color: #823993
}

.slide-home .content-inner {
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
  max-width: 1280px;
  text-align: left
}

.slide-home .caption {
  padding: 20px 0 30px;
  font-family: Raleway,sans-serif;
  font-weight: 500
}

.slide-home .caption i {
  display: none
}

.slide-home .caption p {
  line-height: 1.5
}

.slide-home h2 {
  font-weight: 600
}

.slide-home .shop-link {
  margin-top: 25px;
  background-color: #FF770D;
  font-size: 2.4rem;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
  -webkit-border-radius: 30px;
  border-radius: 30px;
  color: #fff!important
}

.slide-home h4 {
  display: block;
  margin-bottom: 20px
}

.slide-home h4 span {
  padding: 5px 20px;
  background-color: #F9E538;
  font-size: 18px;
  color: #000;
  font-weight: 800;
  line-height: 26px
}

@media (min-width: 992px) {
  .slide-home .slick-prev {
      
  }

  .slide-home .slick-next {
      right: 10px
  }

  .slide-home .slick-dots {
      padding: 0 15px;
      position: absolute;
      right: 20px;
      bottom: 20px;
      z-index: 10;
      text-align: right
  }

  .slide-home .slide-item {
      position: relative
  }

  .slide-home .content-inner {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1
  }

  .slide-home .caption {
      padding-left: 40px;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      z-index: 1;
      font-size: 1.6rem
  }

  .slide-home h2 {
      font-size: 2.1rem
  }

  .slide-home .shop-link {
      max-width: 184px;
      font-size: 1.7rem
  }
}

@media (max-width: 991px) {
  .slide-home .caption br,.slide-home .slick-controls {
      display:none
  }

  .slide-home .slick-controls button {
      margin-top: -60px
  }

  .slide-home .slick-dots {
      margin: 0 15px;
      padding: 10px 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      text-align: center
  }

  .slide-home .caption * {
      color: #000!important
  }

  .slide-home .caption p {
      line-height: 1.4;
      font-size: 1.6rem
  }

  .slide-home h2 {
      font-size: 2.4rem
  }

  .slide-home .shop-link {
      height: 60px;
      color: #fff!important
  }
}
`;
