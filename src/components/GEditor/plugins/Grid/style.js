export default `
.ctrwow-row {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: nowrap;
  padding: 10px;
  min-height: 75px;
  flex-direction:row
}

.ctrwow-row .cell {
  flex-grow: 1;
  flex-basis: 100%;
  padding:5px
}

@media (max-width: 768px) {
  .ctrwow-row {
      flex-wrap:wrap
  }
}
`;
