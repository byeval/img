import { nanoid } from "@imgpt/utils";
import { JSXElementConstructor, ReactElement } from "react";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  email,
  subject,
  react,
  marketing,
  test,
}: {
  email: string;
  subject: string;
  react: ReactElement<any, string | JSXElementConstructor<any>>;
  marketing?: boolean;
  test?: boolean;
}) => {
  if (!process.env.RESEND_API_KEY) {
    console.log(
      "Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.",
    );
    return Promise.resolve();
  }
  return resend.emails.send({
    from: marketing
      ? "Steven from img.pt <steven@ship.img.pt>"
      : process.env.NEXT_PUBLIC_IS_DUB
      ? "img.pt <system@img.pt>"
      : `system@${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
    to: test ? "delivered@resend.dev" : email,
    subject,
    react,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
  });
};
