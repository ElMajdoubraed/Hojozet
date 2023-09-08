import { Typography, Container } from "@material-ui/core";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

const FooterComponent = styled.footer`
  margin-top: auto;
  bottom: 0;
  background-color: #edf5e1 !important;
  padding: 20px;
  color: #333d51;
`;

export default function Footer() {
  return (
    <FooterComponent>
      <Container maxWidth="sm">
        <Typography component={"span"} variant="body2" align="center">
          <FormattedMessage id="copyright" />{" "}
          <Link href="/" passHref>
            <FormattedMessage id="app.name" />
          </Link>
        </Typography>
      </Container>
    </FooterComponent>
  );
}
