const EmailTemplate = (code: string) => {
  return `
<div style="background-color: #F1F1F1; padding: 2rem">
  <div style="margin: auto">
    <h1 style="color: #5cdb95">Verify Email</h1>
    <div style="margin-bottom: 4rem">
      <p style="font-size: large; margin-bottom: 4rem">
        You are receiving this email because we received a verify email request for your account.
      </p>
        <div style="margin-bottom: 4rem">
            <p style="font-size: large; margin-bottom: 4rem">
                Your verification code is: <b style="color: #5cdb95">${code}</b>
            </p>
        </div>
      <a
        style="
          margin-bottom: 4rem;
          color: #5cdb95;
          cursor: pointer;
        "
        href="https://hojozet.elmajdoub.live"
        target="_blank"
        >Back to Website
      </a>
    </div>
    <div style="margin-bottom: 2rem">
      <div style="margin-top: 2rem">
        <b>Have a great day!</b>
      </div>
      <small style="color: #5cdb95">Hojozet Team.</small>
    </div>
  </div>
</div>
`;
};
const EmailSubject = "Verify Email";

export { EmailSubject, EmailTemplate };
