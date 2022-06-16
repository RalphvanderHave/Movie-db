import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  min-height: calc(82vh - 100px);
  margin-top: 10vh;  
  .basicInfo,
  .collections {
    margin: auto;
    margin-bottom: 100px;
    width: 90%;
    // border: 5px solid black;
    padding: 10px;
  }
  .basicInfo {
    margin-bottom: 50px;
  }
  .collectionItem {
    font-size: 30px;
    border-bottom: 5px solid lightGrey;
  }
  .collectionCreatedDate {
    font-size: 20px;
  }
  .calendarLogo {
      height: 20px;
      vertical-align: middle;
      margin-right: 10px;
      margin-bottom: 5px;
  }
  h1 {
      background-color: lightGrey
    color: var(--darkGrey) l;
    border-bottom: 5px solid darkGrey;
  }
`;
