export default `
  .sticky-bar {
    position: fixed;
    z-index: 10;
    text-align: center;
    background: gray;
  }
  .sticky-bar.hidden {
    display: none;
  }
  .sticky-top {
    top: 0;
    width: 100%;
    min-height: 50px;
  }
  .sticky-bottom {
    bottom: 0;
    width: 100%;
    min-height: 50px;
  }
  .sticky-right {
    right: 0;
    height: 100%;
    min-width: 50px;
  }
  .sticky-left {
    left: 0;
    height: 100%;
    min-width: 50px;
  }
`;
