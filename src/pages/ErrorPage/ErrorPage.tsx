/** @jsx jsx */ /** @jsxRuntime classic */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from "@emotion/react";
import { Fragment, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import { DEFAULT_ORDER_BOOK_PAGE } from "../../constants";

const top = css({
  margintop: 30,
});

const container = css({
  margin: "0 auto",
  position: "relative",
  width: 250,
  height: 250,
  marginTop: -40,
});

const ghost = css({
  width: "50%",
  height: "53%",
  left: "25%",
  top: "10%",
  position: "absolute",
  borderRadius: "50% 50% 0 0",
  background: "#EDEDED",
  border: "1px solid #BFC0C0",
  borderBottom: "none",
  animation: "$float 2s ease-out infinite",
});

const ghostCopy = css({
  width: "50%",
  height: "53%",
  left: "25%",
  top: "10%",
  position: "absolute",
  borderRadius: "50% 50% 0 0",
  background: "#EDEDED",
  border: "1px solid #BFC0C0",
  borderBottom: "none",
  animation: "$float 2s ease-out infinite",
  zIndex: 0,
});

const face = css({
  position: "absolute",
  width: "100%",
  height: "60%",
  top: "20%",
});
const eyesBase = css({
  position: "absolute",
  background: "#585959",
  width: 13,
  height: 13,
  borderRadius: "50%",
  top: "40%",
});

const eye = css({
  left: "25%",
});

const eyeRight = css({
  right: "25%",
});

const mouth = css({
  position: "absolute",
  top: "50%",
  left: "45%",
  width: 10,
  height: 10,
  border: "3px solid",
  borderRadius: "50%",
  borderColor: "transparent #585959 #585959 transparent",
  transform: "rotate(45deg)",
});

const base = css({
  position: "absolute",
  background: "#EDEDED",
  top: "85%",
  width: "25%",
  height: "23%",
  border: "1px solid #BFC0C0",
  zIndex: 0,
});

const one = css({
  borderRadius: "0 0 100% 30%",
  left: -1,
});

const two = css({
  left: "23%",
  borderRadius: "0 0 50% 50%",
});

const three = css({
  left: "50%",
  borderRadius: "0 0 50% 50%",
});

const four = css({
  left: "74.5%",
  borderRadius: "0 0 30% 100%",
});

const shadow = css({
  position: "absolute",
  width: "30%",
  height: "7%",
  background: "#BFC0C0",
  left: "35%",
  top: "80%",
  borderRadius: "50%",
  animation: "$scale 2s infinite",
});

const bottom = css({
  margintop: 10,
});

const h1 = css({
  fontFamily: "'Abril Fatface', serif",
  color: "#EDEDED",
  textAlign: "center",
  fontSize: "9em",
  margin: 0,
  textShadow: "-1px 0 $gray, 0 1px $gray, 1px 0 $gray, 0 -1px $gray",
});

const h3 = css({
  fontFamily: "'Lato', sans-serif",
  fontSize: "2em",
  textTransform: "uppercase",
  textAlign: "center",
  color: "#BFC0C0",
  marginTop: -20,
  fontWeight: 900,
});

const p = css({
  textAlign: "center",
  fontFamily: "'Lato', sans-serif",
  color: "#585959",
  fontSize: ".6em",
  marginTop: -20,
  textTransform: "uppercase",
});

const buttonContainer = css({
  display: "grid",
  placeItems: "center",
});

export const ErrorPage = (): ReactElement => {
  const navigate = useNavigate();

  const navigateToOrderBook = () =>
    navigate(`../${DEFAULT_ORDER_BOOK_PAGE}`, { replace: true });

  return (
    <Fragment>
      <div css={top}>
        <h1 css={h1}>404</h1>
        <h3 css={h3}>page not found</h3>
      </div>
      <div css={container}>
        <div css={ghostCopy}>
          <div css={[base, one]} />
          <div css={[base, two]} />
          <div css={[base, three]} />
          <div css={[base, four]} />
        </div>
        <div css={ghost}>
          <div css={face}>
            <div css={[eyesBase, eye]} />
            <div css={[eyesBase, eyeRight]} />
            <div css={mouth} />
          </div>
        </div>
        <div css={shadow} />
      </div>
      <div css={bottom}>
        <p css={p}>
          Sorry but the page you are looking for does not exist, have been
          removed, name changed or is temporarily unavailable
        </p>
      </div>
      <div css={buttonContainer}>
        <button type="button" onClick={navigateToOrderBook}>
          Home
        </button>
      </div>
    </Fragment>
  );
};
