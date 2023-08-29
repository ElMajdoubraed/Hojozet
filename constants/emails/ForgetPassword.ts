const EmailTemplate = (link: string) => {
  return `
<div style="background-color: #F1F1F1; padding: 2rem">
  <div style="margin: auto">
    <h1 style="color: #5cdb95">Reset Password Request</h1>
    <div style="margin-bottom: 4rem">
      <p style="font-size: large; margin-bottom: 4rem">
        You are receiving this email because we received a password reset request for your account.
      </p>
        <div style="margin-bottom: 4rem">
            <a
                style="
                margin-bottom: 4rem;
                text-decoration: none;
                padding: 0.75rem 1.2rem;
                background: #5cdb95;
                color: #010b13;
                cursor: pointer;
                border: 1px solid #5cdb95;
                border-radius: 0.4rem;
                "
                href=${link}
                target="_blank"
                >Reset Password
            </a>
        </div>
      <div>
        <img
          style="margin-bottom: 4rem; color: #d3af37"
          src="https://raed.elmajdoub.live/favicon.ico"
          width="80"
          height="80"
        />
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
const EmailSubject = "Hojozet - Reset Password Request";

export { EmailSubject, EmailTemplate };
